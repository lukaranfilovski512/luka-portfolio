"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Mail, MessageSquareText } from "lucide-react"
import { motion } from "framer-motion"

const email = "luka.karanfilovski512@gmail.com"

export default function StartProjectPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    contact: "",
    service: "Branding / Visual Identity",
    budget: "",
    message: "",
  })

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Project inquiry from ${form.name || "website visitor"}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nContact: ${form.contact}\nService: ${form.service}\nBudget / Scope: ${form.budget}\n\nProject details:\n${form.message}`,
    )
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [form])

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-8 text-foreground sm:py-12">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]" />
      <div className="relative mx-auto max-w-5xl">
        <a href="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card/45 px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to portfolio
        </a>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card/55 shadow-[0_30px_130px_-70px_var(--color-primary)]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative border-b border-border p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <img src="/complete-logo.png" alt="Bukaranfilovski logo" className="h-8 w-auto max-w-[240px]" />
              <h1 className="mt-10 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Start a premium visual project.
              </h1>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Fill in the details below and send a prepared email directly to my inbox. This helps me understand the project faster and respond with the right direction.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/35 p-4">
                  <Mail className="size-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm font-medium">{email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/35 p-4">
                  <MessageSquareText className="size-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Response focus</div>
                    <div className="text-sm font-medium">Branding · Social Media · Campaigns · UI/UX</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="p-5 sm:p-8 lg:p-10" onSubmit={(event) => event.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </Field>
                <Field label="Company / brand">
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
                </Field>
                <Field label="Email / phone / Instagram">
                  <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="How can I contact you?" />
                </Field>
                <Field label="Project type">
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option>Branding / Visual Identity</option>
                    <option>Logo Design</option>
                    <option>Social Media Design</option>
                    <option>Marketing Campaign</option>
                    <option>UI/UX / Landing Page</option>
                    <option>Print / Outdoor Design</option>
                  </select>
                </Field>
                <Field label="Budget / scope" className="sm:col-span-2">
                  <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="Example: monthly content, logo package, campaign launch..." />
                </Field>
                <Field label="Project details" className="sm:col-span-2">
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me what you need, your goal, deadline and visual direction." rows={7} />
                </Field>
              </div>

              <motion.a
                href={mailto}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_18px_65px_-22px_var(--color-primary)] sm:w-auto"
              >
                Send Project Email
                <ArrowRight className="size-4" />
              </motion.a>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <div className="[&_input]:h-12 [&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-border [&_input]:bg-background/45 [&_input]:px-4 [&_input]:text-sm [&_input]:outline-none [&_input]:transition [&_input]:focus:border-primary/70 [&_select]:h-12 [&_select]:w-full [&_select]:rounded-2xl [&_select]:border [&_select]:border-border [&_select]:bg-background/45 [&_select]:px-4 [&_select]:text-sm [&_select]:outline-none [&_select]:transition [&_select]:focus:border-primary/70 [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-background/45 [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:focus:border-primary/70">
        {children}
      </div>
    </label>
  )
}
