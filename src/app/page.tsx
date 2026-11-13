import { CompareTable } from "@/components/CompareTable";
import { Closing, Footer } from "@/components/Closing";
import { EnquiryProvider } from "@/components/Enquiry";
import { FloatingContact } from "@/components/FloatingContact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LocationMaps } from "@/components/LocationMaps";
import { ProjectDetails } from "@/components/ProjectDetails";
import { Projects } from "@/components/Projects";
import { VisitBand, WhyUs } from "@/components/WhyUs";
import { CONTACT, PROJECTS } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Inhouse Projects",
  url: "https://inhouseprojects.in",
  telephone: CONTACT.phone,
  email: CONTACT.email,
  foundingDate: "2001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1/333, Kairali Nagar, Maradu P.O",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    postalCode: "682304",
    addressCountry: "IN",
  },
  makesOffer: PROJECTS.map((p) => ({ "@type": "Offer", name: p.name, description: p.headline })),
};

export default function Page() {
  return (
    <EnquiryProvider>
      <Header />
      <main>
        <Hero />
        <Projects />
        <CompareTable />
        <ProjectDetails />
        <VisitBand />
        <WhyUs />
        <LocationMaps />
        <Closing />
      </main>
      <Footer />
      <FloatingContact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </EnquiryProvider>
  );
}
