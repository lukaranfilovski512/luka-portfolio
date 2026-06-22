import { IntroGate } from "@/components/site/Intro"
import { CaseViewerProvider } from "@/components/site/CaseViewer"
import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { Signal } from "@/components/site/Signal"
import { FeaturedCase } from "@/components/site/FeaturedCase"
import { WorkUniverse } from "@/components/site/WorkUniverse"
import { ExperienceSignal } from "@/components/site/ExperienceSignal"
import { CertificationSpotlight } from "@/components/site/CertificationSpotlight"
import { SkillsDock } from "@/components/site/SkillsDock"
import { AboutStudio } from "@/components/site/AboutStudio"
import { ContactCTA } from "@/components/site/ContactCTA"
import { Footer } from "@/components/site/Footer"
import { PageRestore, ScrollProgress } from "@/components/ui/Overlays"

export default function Page() {
  return (
    <IntroGate>
      <CaseViewerProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-[#060608]">
          <PageRestore />
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <Signal />
            <FeaturedCase />
            <WorkUniverse />
            <ExperienceSignal />
            <CertificationSpotlight />
            <SkillsDock />
            <AboutStudio />
            <ContactCTA />
          </main>
          <Footer />
        </div>
      </CaseViewerProvider>
    </IntroGate>
  )
}
