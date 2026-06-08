import { Instagram, Mail, Linkedin, Phone } from "lucide-react"

const email = "luka.karanfilovski512@gmail.com"
const whatsapp = "https://wa.me/38970264286"

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/by_karanfilovski/", icon: Instagram },
  { label: "Email", href: `mailto:${email}`, icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/luka-karanfilovski-235371244/", icon: Linkedin },
  { label: "WhatsApp", href: whatsapp, icon: Phone },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/complete-logo.png"
            alt="Bukaranfilovski official logo"
            className="h-9 w-auto max-w-[230px] object-contain opacity-95"
          />
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href === "#" ? undefined : "_blank"}
                rel={social.href === "#" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="text-left text-xs leading-relaxed text-muted-foreground sm:text-right">
            <div>Graphic Designer · Branding · Marketing Design · UI/UX</div>
            <div className="mt-1">+389 70 264 286 · {email}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground">
          © 2026 Luka Karanfilovski. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
