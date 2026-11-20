import { FormEvent, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { CheckCircle2, LogOut, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BANGALORE_LOCATIONS, CORPORATE_CONTACT, ICONHOMZ_PROJECTS } from '../data/iconhomzData';
import {
  ADMIN_EMAIL,
  EnquiryStatus,
  LeadEnquiryRecord,
  saveLeadEnquiry,
  subscribeEnquiries,
  syncUserProfile,
  updateEnquiryStatus
} from '../lib/enquiryStore';
import { auth, googleAuthProvider } from '../lib/firebase';

interface PrivateViewingSectionProps {
  preselectedProjectId?: string;
  preselectedLocation?: string;
}

type EnquiryType = 'Project Enquiry' | 'General Enquiry' | 'Channel Partner Enquiry';

interface FormState {
  enquiryType: EnquiryType;
  name: string;
  phone: string;
  email: string;
  interestedProjectId: string;
  propertyType: string;
  budgetRange: string;
  preferredLocation: string;
  partnerCompany: string;
  message: string;
  consent: boolean;
  botField: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function PrivateViewingSection({
  preselectedProjectId,
  preselectedLocation
}: PrivateViewingSectionProps) {
  const [form, setForm] = useState<FormState>({
    enquiryType: 'Project Enquiry',
    name: '',
    phone: '',
    email: '',
    interestedProjectId: preselectedProjectId || ICONHOMZ_PROJECTS[0].id,
    propertyType: 'Villa Plots',
    budgetRange: 'INR 75 Lakhs – 1.25 Cr',
    preferredLocation: preselectedLocation || BANGALORE_LOCATIONS[0].name,
    partnerCompany: '',
    message: '',
    consent: true,
    botField: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedEnquiries, setSavedEnquiries] = useState<LeadEnquiryRecord[]>([]);
  const [lastSubmittedPayload, setLastSubmittedPayload] = useState<{
    ref: string;
    data: Omit<LeadEnquiryRecord, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>;
    savedToAccount: boolean;
  } | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    enquiryType: EnquiryType;
    projectLabel: string;
    name: string;
    utmSummary: string;
  } | null>(null);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = undefined;
      }

      if (user) {
        void syncUserProfile(user);
        setForm((prev) => ({
          ...prev,
          name: prev.name || user.displayName || '',
          email: prev.email || user.email || ''
        }));

        const isAdminUser =
          Boolean(user.emailVerified) && user.email?.toLowerCase() === ADMIN_EMAIL;

        unsubscribeSnapshot = subscribeEnquiries(
          user.uid,
          isAdminUser,
          (records) => setSavedEnquiries(records),
          () => setSavedEnquiries([])
        );
      } else {
        setSavedEnquiries([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  useEffect(() => {
    if (preselectedProjectId) {
      const matched = ICONHOMZ_PROJECTS.find((p) => p.id === preselectedProjectId);
      setForm((prev) => ({
        ...prev,
        enquiryType: 'Project Enquiry',
        interestedProjectId: preselectedProjectId,
        propertyType: matched?.category || prev.propertyType
      }));
    }
  }, [preselectedProjectId]);

  useEffect(() => {
    if (preselectedLocation) {
      setForm((prev) => ({ ...prev, preferredLocation: preselectedLocation }));
    }
  }, [preselectedLocation]);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const digitsOnly = form.phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.enquiryType === 'Channel Partner Enquiry' && form.partnerCompany.trim().length < 2) {
      nextErrors.partnerCompany = 'Please enter your brokerage or agency name.';
    }
    if (!form.consent) {
      nextErrors.consent = 'Please confirm consent for an ICONHOMZ advisor to contact you.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const projectObj =
      ICONHOMZ_PROJECTS.find((p) => p.id === form.interestedProjectId) ?? ICONHOMZ_PROJECTS[0];

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || 'Direct / Organic';
    const utmCampaign = params.get('utm_campaign') || 'Corporate Website';

    // Push structured GA4 / Meta conversion event into dataLayer if configured
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'iconhomz_lead_submit',
        enquiry_type: form.enquiryType,
        interested_project: projectObj.name,
        property_type: form.propertyType,
        budget_range: form.budgetRange,
        corridor: form.preferredLocation,
        utm_source: utmSource,
        utm_campaign: utmCampaign
      });
    }

    const payload = new URLSearchParams({
      'form-name': 'iconhomz-enquiry',
      'bot-field': form.botField,
      enquiryType: form.enquiryType,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      interestedProject:
        form.enquiryType === 'Channel Partner Enquiry'
          ? 'Channel Partner Onboarding'
          : projectObj.name,
      propertyType: form.propertyType,
      budgetRange: form.budgetRange,
      preferredLocation: form.preferredLocation,
      partnerCompany: form.partnerCompany.trim(),
      message: form.message.trim(),
      utmSource,
      utmCampaign,
      consent: form.consent ? 'Yes' : 'No'
    });

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
      });
    } catch {
      // Non-blocking fallback when tested outside live Netlify hosting
    }

    const ref = `ICN-${Math.floor(100000 + Math.random() * 900000)}`;
    const enquiryInput: Omit<
      LeadEnquiryRecord,
      'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'
    > = {
      enquiryType: form.enquiryType,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      interestedProject:
        form.enquiryType === 'Channel Partner Enquiry'
          ? 'Channel Partner Onboarding'
          : projectObj.name,
      propertyType: form.propertyType,
      budgetRange: form.budgetRange,
      preferredLocation: form.preferredLocation,
      partnerCompany: form.partnerCompany.trim(),
      message: form.message.trim(),
      utmSource,
      utmCampaign
    };

    let savedToAccount = false;
    if (currentUser && currentUser.emailVerified) {
      try {
        await saveLeadEnquiry(ref, currentUser.uid, enquiryInput);
        savedToAccount = true;
      } catch {
        // Error already logged via handleFirestoreError
      }
    }

    setLastSubmittedPayload({ ref, data: enquiryInput, savedToAccount });
    setConfirmation({
      referenceId: ref,
      enquiryType: form.enquiryType,
      projectLabel:
        form.enquiryType === 'Project Enquiry'
          ? `${projectObj.name} · ${form.propertyType} (${form.budgetRange})`
          : form.enquiryType,
      name: form.name.trim(),
      utmSummary: `${utmSource} · ${utmCampaign}`
    });
    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const cred = await signInWithPopup(auth, googleAuthProvider);
      if (cred.user && lastSubmittedPayload && !lastSubmittedPayload.savedToAccount) {
        await saveLeadEnquiry(
          lastSubmittedPayload.ref,
          cred.user.uid,
          lastSubmittedPayload.data
        );
        setLastSubmittedPayload((prev) => (prev ? { ...prev, savedToAccount: true } : prev));
      }
    } catch {
      // Popup dismissed or blocked
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignore sign-out errors
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setForm((prev) => ({
      ...prev,
      name: '',
      phone: '',
      email: '',
      partnerCompany: '',
      message: ''
    }));
    setErrors({});
  };

  return (
    <section
      id="enquiry"
      className="py-20 md:py-24 bg-[#0E3B4C] text-white"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bangalore Corporate Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F3A871]">
                Connect With ICONHOMZ
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-white">
                Enquire or Schedule a Site Visit
              </h2>
              <p className="text-base text-slate-200 leading-relaxed max-w-md">
                Speak directly with our Bangalore residential advisory team for approved cost sheets, RERA registration details, site visits across Gunjur and Bommasandra, or channel partner registration.
              </p>
            </div>

            <div className="pt-6 border-t border-[#1D5368] space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#F3A871] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Corporate Office · HSR Layout, Bengaluru</div>
                  <div className="text-slate-200 mt-0.5 leading-relaxed">
                    {CORPORATE_CONTACT.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#F3A871] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Property &amp; Site Visit Desk</div>
                  <div className="font-mono text-[#F3A871] tabular-nums mt-0.5">
                    {CORPORATE_CONTACT.phone} · {CORPORATE_CONTACT.hours}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#F3A871] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-white">Corporate Enquiries</div>
                  <div className="text-slate-200 mt-0.5">{CORPORATE_CONTACT.email}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={CORPORATE_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-5 bg-[#092834] hover:bg-[#D96B27] border border-[#1D5368] text-xs font-semibold text-white rounded transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#F3A871]" />
                  <span>Message on WhatsApp Advisory</span>
                </a>
                {currentUser ? (
                  <button
                    type="button"
                    onClick={handleGoogleSignOut}
                    className="inline-flex items-center gap-2 h-11 px-4 bg-transparent hover:bg-[#1D5368] border border-[#1D5368] text-xs font-semibold text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#F3A871]" />
                    <span>Sign out ({currentUser.displayName || currentUser.email})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="inline-flex items-center gap-2 h-11 px-4 bg-transparent hover:bg-[#1D5368] border border-[#1D5368] text-xs font-semibold text-slate-200 rounded transition-colors cursor-pointer"
                  >
                    <span>Sign in with Google to track enquiries</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 3-Tab CRM-Ready Lead Form */}
          <div className="lg:col-span-7 bg-[#092834] border border-[#1D5368] rounded p-6 sm:p-10 space-y-6">
            {confirmation ? (
              <div className="py-6 space-y-6">
                <div className="flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Enquiry Logged Successfully
                  </span>
                </div>

                <h3 className="font-display text-3xl font-semibold text-white">
                  Thank you, {confirmation.name}.
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Your <strong className="text-white">{confirmation.enquiryType}</strong> regarding{' '}
                  <strong className="text-white">{confirmation.projectLabel}</strong> has been assigned to our Bangalore advisory desk for callback and site-visit coordination.
                </p>

                <div className="p-5 bg-[#0E3B4C] border border-[#1D5368] rounded flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-300">Lead Reference &amp; Attribution</div>
                    <div className="font-mono text-sm sm:text-base text-[#F3A871] tabular-nums">
                      {confirmation.referenceId} · {confirmation.utmSummary}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {!currentUser && lastSubmittedPayload && !lastSubmittedPayload.savedToAccount && (
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="h-10 px-4 text-xs font-semibold bg-[#D96B27] hover:bg-[#B85418] text-white rounded transition-colors cursor-pointer"
                      >
                        Save Enquiry to Google Account
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="h-10 px-4 text-xs font-semibold border border-[#1D5368] text-white hover:bg-[#1D5368] rounded transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                name="iconhomz-enquiry"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <input type="hidden" name="form-name" value="iconhomz-enquiry" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Leave this empty:{' '}
                    <input
                      name="bot-field"
                      value={form.botField}
                      onChange={(e) => setForm((prev) => ({ ...prev, botField: e.target.value }))}
                    />
                  </label>
                </p>
                {/* Enquiry Category Segmented Tabs */}
                <div className="space-y-2">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Enquiry Category
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(
                      [
                        'Project Enquiry',
                        'General Enquiry',
                        'Channel Partner Enquiry'
                      ] as EnquiryType[]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, enquiryType: type }))}
                        className={`h-11 px-3 text-xs font-semibold rounded border transition-colors whitespace-nowrap cursor-pointer ${
                          form.enquiryType === type
                            ? 'bg-[#D96B27] border-[#D96B27] text-white'
                            : 'bg-[#0E3B4C] border-[#1D5368] text-slate-200 hover:border-[#F3A871]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 1: Full Name + Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D96B27]"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-300 mt-1.5" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98450 00000"
                      className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D96B27] font-mono tabular-nums"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-300 mt-1.5" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email + Interested Project / Firm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D96B27]"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-300 mt-1.5" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {form.enquiryType === 'Channel Partner Enquiry' ? (
                    <div>
                      <label
                        htmlFor="lead-firm"
                        className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                      >
                        Firm / Brokerage Name *
                      </label>
                      <input
                        id="lead-firm"
                        name="partnerCompany"
                        type="text"
                        value={form.partnerCompany}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, partnerCompany: e.target.value }))
                        }
                        placeholder="Registered firm name"
                        className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D96B27]"
                      />
                      {errors.partnerCompany && (
                        <p className="text-xs text-rose-300 mt-1.5" role="alert">
                          {errors.partnerCompany}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="lead-project"
                        className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                      >
                        Interested Project
                      </label>
                      <select
                        id="lead-project"
                        name="interestedProject"
                        value={form.interestedProjectId}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, interestedProjectId: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white focus:outline-none focus:border-[#D96B27]"
                      >
                        {ICONHOMZ_PROJECTS.map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            {proj.name} — {proj.category} ({proj.corridor})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Row 3: Property Type + Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="lead-property-type"
                      className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Property Type
                    </label>
                    <select
                      id="lead-property-type"
                      name="propertyType"
                      value={form.propertyType}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, propertyType: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white focus:outline-none focus:border-[#D96B27]"
                    >
                      <option value="Villa Plots">Villa Plots</option>
                      <option value="Apartments">Apartments (Fluid Homes)</option>
                      <option value="Villas">Independent Villas</option>
                      <option value="Flexible / Exploring Options">Flexible / Exploring Options</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-budget"
                      className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="lead-budget"
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, budgetRange: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white focus:outline-none focus:border-[#D96B27]"
                    >
                      <option value="INR 60 – 85 Lakhs">INR 60 – 85 Lakhs</option>
                      <option value="INR 75 Lakhs – 1.25 Cr">INR 75 Lakhs – 1.25 Cr</option>
                      <option value="INR 1.25 Cr – 2.0 Cr">INR 1.25 Cr – 2.0 Cr</option>
                      <option value="Above INR 2.0 Cr">Above INR 2.0 Cr</option>
                      <option value="Request Approved Cost Sheet">Request Approved Cost Sheet</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Optional Message */}
                <div>
                  <label
                    htmlFor="lead-message"
                    className="block text-xs font-medium uppercase tracking-wider text-slate-200 mb-2"
                  >
                    {form.enquiryType === 'Channel Partner Enquiry'
                      ? 'RERA Channel Partner ID & Message (Optional)'
                      : 'Message (Optional)'}
                  </label>
                  <input
                    id="lead-message"
                    name="message"
                    type="text"
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={
                      form.enquiryType === 'Channel Partner Enquiry'
                        ? 'PRM/KA/RERA/... and preferred project portfolio'
                        : 'e.g., Site visit preference / request cost sheet & floor plan'
                    }
                    className="w-full px-4 py-3 bg-[#0E3B4C] border border-[#1D5368] rounded text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D96B27]"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
                      className="mt-0.5 accent-[#D96B27] cursor-pointer"
                    />
                    <span>
                      I authorize ICONHOMZ to contact me regarding residential projects and site visits via phone, email, or WhatsApp in accordance with the Privacy Policy.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-rose-300" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-300">
                    Direct developer desk · Zero spam guarantee
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-7 bg-[#D96B27] hover:bg-[#B85418] disabled:opacity-60 text-white text-sm font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isSubmitting
                      ? 'Submitting Enquiry...'
                      : form.enquiryType === 'Project Enquiry'
                        ? 'Schedule Site Visit'
                        : form.enquiryType === 'Channel Partner Enquiry'
                          ? 'Register as Channel Partner'
                          : 'Submit General Enquiry'}
                  </button>
                </div>
              </form>
            )}

            {currentUser && savedEnquiries.length > 0 && (
              <div className="pt-6 border-t border-[#1D5368] space-y-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#F3A871] font-semibold">
                  <span>
                    {currentUser.email?.toLowerCase() === ADMIN_EMAIL
                      ? 'Advisor Lead Desk'
                      : 'Your Saved Enquiries'}
                  </span>
                  <span className="font-mono text-slate-300">{savedEnquiries.length}</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {savedEnquiries.map((item) => {
                    const isAdminUser = currentUser.email?.toLowerCase() === ADMIN_EMAIL;
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 bg-[#0E3B4C] border border-[#1D5368] rounded flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-semibold text-white">
                            {item.interestedProject} · {item.name}
                          </div>
                          <div className="text-slate-300 font-mono">
                            {item.id} · {item.phone} · {item.budgetRange}
                          </div>
                        </div>
                        {isAdminUser ? (
                          <select
                            aria-label={`Update status for ${item.id}`}
                            value={item.status}
                            onChange={(e) =>
                              void updateEnquiryStatus(item.id, e.target.value as EnquiryStatus)
                            }
                            className="px-2.5 py-1.5 bg-[#092834] border border-[#1D5368] rounded text-xs text-white focus:outline-none focus:border-[#D96B27]"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="closed">Closed</option>
                          </select>
                        ) : (
                          <span className="px-2.5 py-1 bg-[#092834] border border-[#1D5368] rounded uppercase tracking-wider text-[11px] text-[#F3A871]">
                            {item.status}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
