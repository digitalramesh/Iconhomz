import {
  AEO_FAQS,
  BANGALORE_LOCATIONS,
  BLOG_ARCHIVE_ROUTES,
  BLOG_ARTICLES,
  BlogArticle,
  CORPORATE_CONTACT,
  ICONHOMZ_PROJECTS,
  IconhomzProject,
  LEADERSHIP_TEAM,
  PROJECT_ARCHIVE_ROUTES
} from '../data/iconhomzData';

interface SeoRouteParams {
  currentPath: string;
  matchedProjectDetail?: IconhomzProject;
  isProjectArchive: boolean;
  isBlogArchive: boolean;
  activeArticle: BlogArticle | null;
  isNotFound: boolean;
}

const CANONICAL_HOST = 'https://www.iconhomz.com';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertStructuredData(graph: Record<string, unknown>[]) {
  let script = document.getElementById('iconhomz-structured-data') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'iconhomz-structured-data';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph
    },
    null,
    2
  );
}

function buildOrganizationSchema(origin: string) {
  return {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'ICONHOMZ',
    legalName: 'ICON Infra Shelters India Pvt. Ltd.',
    url: `${origin}/`,
    slogan: 'Building Better Living Experiences',
    email: CORPORATE_CONTACT.email,
    telephone: '+91-8310181484',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '47/9, Jai Plaza Symphony, 9th Main, 14th Cross, Sector 6, HSR Layout',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560102',
      addressCountry: 'IN'
    },
    founder: LEADERSHIP_TEAM.slice(0, 2).map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role
    })),
    description:
      'Bangalore-based real estate developer operating since 2001, known for BDA & RERA approved villa plots, Fluid Homes apartments, and independent gated villas.'
  };
}

function normalizeSeoTitle(rawTitle: string): string {
  const clean = rawTitle.replace(/\s+/g, ' ').trim();
  if (clean.length <= 60) return clean;
  const withoutBrand = clean.replace(/\s*[\-|–]\s*ICONHOMZ(\s+Blog)?$/i, '').trim();
  const suffix = ' | ICONHOMZ';
  const maxBody = 60 - suffix.length;
  if (withoutBrand.length <= maxBody) {
    return `${withoutBrand}${suffix}`;
  }
  const clipped = withoutBrand.slice(0, maxBody - 1).replace(/\s+\S*$/, '').trim();
  return `${clipped}${suffix}`;
}

function normalizeSeoDescription(rawDescription: string): string {
  let clean = rawDescription.replace(/\s+/g, ' ').trim();
  if (clean.length < 120) {
    clean = `${clean.replace(/\.$/, '')}. Schedule a site visit with ICONHOMZ in Bangalore today.`;
  }
  if (clean.length <= 160) return clean;
  const clipped = clean.slice(0, 157).replace(/\s+\S*$/, '').trim();
  return `${clipped}...`;
}

export function applyRouteSeoAndSchema({
  currentPath,
  matchedProjectDetail,
  isProjectArchive,
  isBlogArchive,
  activeArticle,
  isNotFound
}: SeoRouteParams) {
  const runtimeOrigin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : CANONICAL_HOST;
  const canonicalUrl = `${runtimeOrigin}${currentPath}`;

  let title = 'ICONHOMZ – Villa Plots, Flats & Villas in Bangalore';
  let description =
    'Explore BDA & RERA approved villa plots, Fluid Homes apartments, and gated villas in Bangalore by ICONHOMZ. Book a site visit at IVY COUNTY today.';
  let ogType = 'website';
  let ogImage = `${runtimeOrigin}/src/assets/images/ivy_county_villa_plots_1795082010981.jpg`;

  const graph: Record<string, unknown>[] = [];
  const organization = buildOrganizationSchema(runtimeOrigin);

  if (activeArticle) {
    title = activeArticle.seoTitle;
    description = activeArticle.metaDescription;
    ogType = 'article';
    ogImage = `${runtimeOrigin}${activeArticle.image}`;

    graph.push(
      organization,
      {
        '@type': 'Person',
        name: activeArticle.author,
        jobTitle: activeArticle.authorRole,
        worksFor: { '@id': `${runtimeOrigin}/#organization` }
      },
      {
        '@type': 'BlogPosting',
        headline: activeArticle.title,
        description: activeArticle.metaDescription,
        datePublished: activeArticle.publishedDate,
        dateModified: activeArticle.updatedDate,
        author: {
          '@type': 'Person',
          name: activeArticle.author
        },
        publisher: { '@id': `${runtimeOrigin}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${runtimeOrigin}${activeArticle.routeCategoryPath}`
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: activeArticle.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    );
  } else if (isNotFound) {
    title = 'Page Not Found (404) | ICONHOMZ Bangalore Real Estate';
    description =
      'The requested ICONHOMZ page could not be found. Browse our residential projects, ongoing developments, Bangalore corridors, or buying guides.';

    graph.push(organization, {
      '@type': 'WebPage',
      name: '404 – Page Not Found',
      url: canonicalUrl
    });
  } else if (matchedProjectDetail) {
    title = `${matchedProjectDetail.name} – ${matchedProjectDetail.corridor} | ICONHOMZ`;
    description = matchedProjectDetail.summary;
    ogImage = `${runtimeOrigin}${matchedProjectDetail.image}`;

    const propertyType =
      matchedProjectDetail.category === 'Apartments'
        ? 'ApartmentComplex'
        : matchedProjectDetail.category === 'Villas'
          ? 'SingleFamilyResidence'
          : 'RealEstateListing';

    graph.push(
      organization,
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        name: title,
        description,
        url: canonicalUrl,
        isPartOf: { '@id': `${runtimeOrigin}/#website` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${runtimeOrigin}/projects/` },
          { '@type': 'ListItem', position: 3, name: matchedProjectDetail.name, item: canonicalUrl }
        ]
      },
      {
        '@type': propertyType,
        name: matchedProjectDetail.name,
        description: matchedProjectDetail.overview,
        url: canonicalUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: matchedProjectDetail.corridor,
          addressRegion: 'Karnataka',
          addressCountry: 'IN'
        },
        provider: { '@id': `${runtimeOrigin}/#organization` }
      },
      {
        '@type': 'FAQPage',
        mainEntity: matchedProjectDetail.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    );
  } else if (isProjectArchive) {
    const meta = PROJECT_ARCHIVE_ROUTES[currentPath];
    title = meta.seoTitle;
    description = meta.metaDescription;

    const matchedProjects = ICONHOMZ_PROJECTS.filter((proj) => {
      if (meta.filterStatus && proj.status !== meta.filterStatus) return false;
      if (meta.filterCategory && proj.category !== meta.filterCategory) return false;
      if (meta.filterLocation === 'Gunjur') return proj.corridor === 'Gunjur';
      if (meta.filterLocation === 'Sarjapur Road') {
        return proj.corridor === 'Sarjapur Road' || proj.id === 'ivy-county';
      }
      return true;
    });

    graph.push(
      organization,
      {
        '@type': 'CollectionPage',
        '@id': canonicalUrl,
        name: meta.h1,
        description: meta.metaDescription,
        url: canonicalUrl
      },
      {
        '@type': 'ItemList',
        name: meta.h1,
        numberOfItems: matchedProjects.length,
        itemListElement: matchedProjects.map((proj, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${proj.name} – ${proj.category} in ${proj.corridor} (${proj.status})`,
          url: `${runtimeOrigin}/projects/${proj.slug}/`
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: meta.breadcrumbLabel, item: canonicalUrl }
        ]
      }
    );
  } else if (currentPath === '/about-us/') {
    title = 'About ICONHOMZ | Real Estate Developer in Bangalore';
    description =
      'Building Better Living Experiences – Learn about ICONHOMZ (ICON Infra Shelters India Pvt. Ltd.), CEO Rajasekhar Gowrineni, Fluid Homes architecture, and completed Bangalore communities.';

    graph.push(
      organization,
      ...LEADERSHIP_TEAM.map((leader) => ({
        '@type': 'Person',
        name: leader.name,
        jobTitle: leader.role,
        description: leader.bio,
        worksFor: { '@id': `${runtimeOrigin}/#organization` }
      })),
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        name: 'Building Better Living Experiences – The ICONHOMZ Journey',
        description,
        url: canonicalUrl
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: canonicalUrl }
        ]
      }
    );
  } else if (isBlogArchive) {
    const blogMeta = BLOG_ARCHIVE_ROUTES[currentPath];
    title = blogMeta.seoTitle;
    description = blogMeta.metaDescription;

    const matchedArticles =
      currentPath === '/blogs/'
        ? BLOG_ARTICLES
        : BLOG_ARTICLES.filter((art) => art.routeCategoryPath === currentPath);

    graph.push(
      organization,
      {
        '@type': 'Blog',
        '@id': canonicalUrl,
        name: blogMeta.h1,
        description: blogMeta.metaDescription,
        url: canonicalUrl,
        publisher: { '@id': `${runtimeOrigin}/#organization` },
        blogPost: matchedArticles.map((art) => ({
          '@type': 'BlogPosting',
          headline: art.title,
          description: art.metaDescription,
          datePublished: art.publishedDate,
          author: {
            '@type': 'Person',
            name: art.author
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${runtimeOrigin}/blogs/` }
        ]
      }
    );
  } else if (currentPath === '/locations/') {
    title = 'Bangalore Locations – Gunjur, Sarjapur Road & Electronic City | ICONHOMZ';
    description =
      'Explore ICONHOMZ residential corridors across East and South Bangalore including Gunjur, Varthur-Sarjapur Road, and Electronic City / Bommasandra.';

    graph.push(
      organization,
      {
        '@type': 'CollectionPage',
        name: title,
        description,
        url: canonicalUrl
      },
      {
        '@type': 'ItemList',
        name: 'ICONHOMZ Bangalore Micro-Markets',
        itemListElement: BANGALORE_LOCATIONS.map((loc, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Place',
            name: `${loc.name}, ${loc.zone}`,
            description: loc.summary
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: canonicalUrl }
        ]
      }
    );
  } else if (currentPath === '/contact-us/') {
    title = 'Contact ICONHOMZ | Real Estate Developers in Bangalore';
    description =
      'Get in touch with ICONHOMZ HSR Layout corporate office in Bangalore for project site visits, RERA documentation, WhatsApp advisory, or channel partner enquiries.';

    graph.push(
      {
        ...organization,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-8310181484',
            email: CORPORATE_CONTACT.email,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Kannada', 'Telugu', 'Hindi']
          }
        ]
      },
      {
        '@type': 'WebPage',
        name: 'Get in Touch with ICONHOMZ',
        description,
        url: canonicalUrl
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${runtimeOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: canonicalUrl }
        ]
      }
    );
  } else {
    // Homepage (/) -> Organization + WebSite + FAQPage
    graph.push(
      organization,
      {
        '@type': 'WebSite',
        '@id': `${runtimeOrigin}/#website`,
        name: 'ICONHOMZ',
        url: `${runtimeOrigin}/`,
        publisher: { '@id': `${runtimeOrigin}/#organization` }
      },
      {
        '@type': 'FAQPage',
        mainEntity: AEO_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    );
  }

  const finalTitle = normalizeSeoTitle(title);
  const finalDescription = normalizeSeoDescription(description);

  document.title = finalTitle;
  upsertCanonical(canonicalUrl);
  upsertMetaTag('name', 'description', finalDescription);
  upsertMetaTag('name', 'robots', isNotFound ? 'noindex, follow' : 'index, follow');
  upsertMetaTag('property', 'og:type', ogType);
  upsertMetaTag('property', 'og:title', finalTitle);
  upsertMetaTag('property', 'og:description', finalDescription);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', ogImage);
  upsertMetaTag('name', 'twitter:title', finalTitle);
  upsertMetaTag('name', 'twitter:description', finalDescription);
  upsertMetaTag('name', 'twitter:image', ogImage);
  upsertStructuredData(graph);
}
