"use client"

type Variant = "branding" | "social" | "campaign" | "uiux" | "print" | "app"

export function ProjectMock({ variant }: { variant: Variant }) {
  const base = "flex h-full w-full items-center justify-center p-6"

  if (variant === "branding") {
    return (
      <div className={`${base} bg-gradient-to-br from-secondary to-background`}>
        <div className="grid w-full max-w-xs grid-cols-3 gap-3">
          <div className="col-span-2 flex aspect-[2/1] items-center justify-center rounded-xl bg-primary font-mono text-2xl font-bold text-primary-foreground">
            ◷
          </div>
          <div className="aspect-square rounded-xl border border-border bg-card" />
          <div className="aspect-square rounded-xl bg-chart-2/60" />
          <div className="aspect-square rounded-xl bg-foreground/80" />
          <div className="aspect-square rounded-xl bg-primary/40" />
        </div>
      </div>
    )
  }

  if (variant === "social") {
    return (
      <div className={`${base} bg-gradient-to-br from-background to-secondary`}>
        <div className="grid w-full max-w-xs grid-cols-3 gap-2.5">
          {[
            "bg-primary/40",
            "bg-card",
            "bg-chart-2/40",
            "bg-foreground/80",
            "bg-primary",
            "bg-card",
            "bg-chart-2/30",
            "bg-card",
            "bg-primary/30",
          ].map((c, i) => (
            <div key={i} className={`aspect-square rounded-lg ${c}`} />
          ))}
        </div>
      </div>
    )
  }

  if (variant === "campaign") {
    return (
      <div className={`${base} bg-gradient-to-br from-secondary via-background to-secondary`}>
        <div className="w-full max-w-xs space-y-3">
          <div className="h-3 w-1/3 rounded-full bg-primary" />
          <div className="h-7 w-full rounded-lg bg-foreground/80" />
          <div className="h-7 w-4/5 rounded-lg bg-muted-foreground/30" />
          <div className="flex gap-3 pt-2">
            <div className="h-20 flex-1 rounded-xl bg-primary/30" />
            <div className="h-20 flex-1 rounded-xl bg-card" />
            <div className="h-20 flex-1 rounded-xl bg-chart-2/30" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "uiux") {
    return (
      <div className={`${base} bg-gradient-to-br from-background to-secondary`}>
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-16 rounded-full bg-primary" />
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-muted-foreground/40" />
              <div className="size-2 rounded-full bg-muted-foreground/40" />
            </div>
          </div>
          <div className="mt-4 h-16 rounded-lg bg-gradient-to-r from-primary/30 to-chart-2/20" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-10 rounded-md bg-secondary" />
            <div className="h-10 rounded-md bg-secondary" />
            <div className="h-10 rounded-md bg-secondary" />
          </div>
          <div className="mt-3 h-2 w-2/3 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    )
  }

  if (variant === "app") {
    return (
      <div className={`${base} bg-gradient-to-br from-secondary to-background`}>
        <div className="h-full max-h-[180px] w-32 rounded-[1.5rem] border-4 border-card bg-background p-2.5">
          <div className="mx-auto mb-2 h-1.5 w-8 rounded-full bg-muted-foreground/40" />
          <div className="h-12 rounded-xl bg-gradient-to-br from-primary/40 to-chart-2/20" />
          <div className="mt-2 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-secondary" />
            <div className="h-2 w-3/4 rounded-full bg-secondary" />
          </div>
          <div className="mt-3 flex gap-1.5">
            <div className="h-8 flex-1 rounded-lg bg-primary" />
            <div className="h-8 flex-1 rounded-lg bg-secondary" />
          </div>
        </div>
      </div>
    )
  }

  // print
  return (
    <div className={`${base} bg-gradient-to-br from-background via-secondary to-background`}>
      <div className="flex w-full max-w-xs -rotate-3 gap-3">
        <div className="aspect-[3/4] w-1/2 rounded-xl border border-border bg-card p-3">
          <div className="h-2 w-1/2 rounded-full bg-primary" />
          <div className="mt-2 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-chart-2/20" />
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full rounded-full bg-muted-foreground/30" />
            <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
        <div className="mt-6 aspect-[3/4] w-1/2 rotate-6 rounded-xl bg-primary p-3">
          <div className="h-2 w-1/2 rounded-full bg-primary-foreground/70" />
          <div className="mt-2 h-10 rounded-lg bg-primary-foreground/20" />
        </div>
      </div>
    </div>
  )
}
