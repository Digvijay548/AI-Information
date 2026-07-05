export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base grid */}
      <div className="absolute inset-0 bg-grid-light bg-[size:44px_44px] opacity-70 dark:bg-grid-dark" />
      {/* radial fade over grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,#f6f8fc_75%)] dark:bg-[radial-gradient(ellipse_at_top,transparent_10%,#070a12_72%)]" />
      {/* floating gradient orbs */}
      <div className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-[120px] animate-float dark:bg-brand-600/20" />
      <div
        className="absolute top-10 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-accent-violet/25 blur-[120px] animate-float dark:bg-accent-violet/20"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/20 blur-[120px] animate-float dark:bg-accent-cyan/15"
        style={{ animationDelay: '3s' }}
      />
    </div>
  )
}
