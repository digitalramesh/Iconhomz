import { User } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export type EnquiryStatus = 'new' | 'contacted' | 'scheduled' | 'closed';
export type EnquiryCategory = 'Project Enquiry' | 'General Enquiry' | 'Channel Partner Enquiry';

export interface LeadEnquiryRecord {
  id: string;
  userId: string;
  enquiryType: EnquiryCategory;
  name: string;
  phone: string;
  email: string;
  interestedProject: string;
  propertyType: string;
  budgetRange: string;
  preferredLocation: string;
  partnerCompany: string;
  message: string;
  utmSource: string;
  utmCampaign: string;
  status: EnquiryStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const ADMIN_EMAIL = 'ramesh@iconhomz.com';

function sanitizeStr(value: string, maxLen: number): string {
  return value.trim().slice(0, maxLen);
}

export async function syncUserProfile(user: User): Promise<void> {
  const path = `users/${user.uid}`;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    const displayName = sanitizeStr(user.displayName || user.email?.split('@')[0] || 'Member', 120);
    const email = sanitizeStr(user.email || 'unknown@iconhomz.com', 160);

    if (snap.exists()) {
      await updateDoc(userRef, {
        displayName,
        email,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, {
        uid: sanitizeStr(user.uid, 128),
        displayName,
        email,
        role: 'member',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveLeadEnquiry(
  enquiryId: string,
  userId: string,
  input: Omit<LeadEnquiryRecord, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  const path = `enquiries/${enquiryId}`;
  try {
    await setDoc(doc(db, 'enquiries', enquiryId), {
      userId: sanitizeStr(userId, 128),
      enquiryType: input.enquiryType,
      name: sanitizeStr(input.name, 120),
      phone: sanitizeStr(input.phone, 24),
      email: sanitizeStr(input.email, 160),
      interestedProject: sanitizeStr(input.interestedProject, 120),
      propertyType: sanitizeStr(input.propertyType, 60),
      budgetRange: sanitizeStr(input.budgetRange, 60),
      preferredLocation: sanitizeStr(input.preferredLocation, 80),
      partnerCompany: sanitizeStr(input.partnerCompany, 120),
      message: sanitizeStr(input.message, 1000),
      utmSource: sanitizeStr(input.utmSource, 80),
      utmCampaign: sanitizeStr(input.utmCampaign, 80),
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribeEnquiries(
  userId: string,
  isAdminUser: boolean,
  onUpdate: (items: LeadEnquiryRecord[]) => void,
  onError: (err: unknown) => void
): () => void {
  const path = 'enquiries';
  const q = isAdminUser
    ? query(collection(db, path), limit(50))
    : query(collection(db, path), where('userId', '==', userId), limit(20));

  return onSnapshot(
    q,
    (snapshot) => {
      const records: LeadEnquiryRecord[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<LeadEnquiryRecord, 'id'>),
      }));
      onUpdate(records);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        onError(wrapped);
      }
    }
  );
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus
): Promise<void> {
  const path = `enquiries/${enquiryId}`;
  try {
    await updateDoc(doc(db, 'enquiries', enquiryId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
