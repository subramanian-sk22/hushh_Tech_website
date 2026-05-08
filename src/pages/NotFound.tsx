import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(40,116,255,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(0,212,170,0.18),_transparent_28%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="max-w-2xl">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/78 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
            >
              <img
                src="/images/hushh-logo-new.png"
                alt="Hushh"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span>Hushh</span>
            </Link>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              404 Error
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Page not found.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              The page you tried to reach is not available anymore, or the link is incomplete.
              Let&apos;s get you back to a live Hushh experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Back to Home
              </Link>
              <Link
                to="/about/leadership"
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/10"
              >
                Meet the Team
              </Link>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#07111f] p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                    Requested path
                  </p>
                  <p className="mt-3 break-all text-lg font-medium text-white">
                    {location.pathname}
                  </p>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                  Offline route
                </div>
              </div>

              <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-6">
                <p className="text-sm text-slate-400">
                  Try one of these instead:
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/6 hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    to="/community"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/6 hover:text-white"
                  >
                    Community
                  </Link>
                  <Link
                    to="/discover-fund-a"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/6 hover:text-white"
                  >
                    Discover Fund A
                  </Link>
                  <Link
                    to="/faq"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/6 hover:text-white"
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-sm leading-7 text-slate-400">
                If you followed an outdated bookmark or link, heading back home is the fastest way
                to re-enter the main site flow.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
