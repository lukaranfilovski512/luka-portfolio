import { SiteNav } from "@/components/portfolio/site-nav"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Services } from "@/components/portfolio/services"
import { Work } from "@/components/portfolio/work"
import { Process } from "@/components/portfolio/process"
import { Skills } from "@/components/portfolio/skills"
import { Experience } from "@/components/portfolio/experience"
import { Testimonials } from "@/components/portfolio/testimonials"
import { Contact } from "@/components/portfolio/contact"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { PageRestore } from "@/components/portfolio/page-restore"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Subtle grain overlay */}
      <div
        aria-hidden
        className="noise-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
      />
      <PageRestore />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
