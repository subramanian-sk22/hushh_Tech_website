import { FormEvent, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HushhTechHeader from "../../components/hushh-tech-header/HushhTechHeader";
import HushhTechFooter from "../../components/hushh-tech-footer/HushhTechFooter";
import HushhTechCta, {
  HushhTechCtaVariant,
} from "../../components/hushh-tech-cta/HushhTechCta";

const playfair = { fontFamily: "'Playfair Display', serif" };

const TOPIC_OPTIONS = [
  {
    id: "product-updates",
    label: "Product updates",
    description: "New launches, feature drops, and platform milestones.",
  },
  {
    id: "market-briefs",
    label: "Market briefs",
    description: "Concise commentary on AI, investing, and macro signals.",
  },
  {
    id: "events",
    label: "Events and community",
    description: "Invites to demos, conversations, and hushh community moments.",
  },
] as const;

export default function NewsletterPage() {
  const emailFieldId = useId();
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    TOPIC_OPTIONS[0].id,
  ]);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedCountLabel = useMemo(() => {
    if (selectedTopics.length === 0) {
      return "Select at least one topic.";
    }

    if (selectedTopics.length === 1) {
      return "1 topic selected.";
    }

    return `${selectedTopics.length} topics selected.`;
  }, [selectedTopics.length]);

  const toggleTopic = (topicId: string) => {
    setIsSubmitted(false);
    setError("");
    setSelectedTopics((currentTopics) =>
      currentTopics.includes(topicId)
        ? currentTopics.filter((currentTopic) => currentTopic !== topicId)
        : [...currentTopics, topicId]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setError("Enter a valid email address to subscribe.");
      setIsSubmitted(false);
      return;
    }

    if (selectedTopics.length === 0) {
      setError("Pick at least one topic preference.");
      setIsSubmitted(false);
      return;
    }

    setEmail(trimmedEmail);
    setError("");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white antialiased selection:bg-hushh-blue selection:text-white flex flex-col">
      <HushhTechHeader showTicker={false} className="bg-[#05070d] shadow-[0_1px_0_rgba(255,255,255,0.06)] [&_*]:!text-white [&_button]:!bg-white/10 [&_button]:hover:!bg-white/15 [&_section]:!bg-[#0b1018] [&_section]:!border-white/10" />

      <main className="flex-1 px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(47,128,237,0.28),_transparent_32%),linear-gradient(145deg,_rgba(11,16,24,0.95),_rgba(5,7,13,0.98))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-10">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-hushh-blue/15 blur-3xl" />
            <div className="absolute bottom-0 left-12 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-hushh-blue" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                  hushh newsletter
                </span>
              </div>

              <div className="max-w-2xl">
                <h1
                  className="font-serif text-[2.8rem] font-normal leading-[1.02] tracking-tight text-white sm:text-[3.6rem] lg:text-[4.4rem]"
                  style={playfair}
                >
                  Stay close to the{" "}
                  <span className="font-light italic text-white/55">
                    next signal.
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-sm font-light leading-7 text-white/70 sm:text-base">
                  Subscribe for measured product updates, market intelligence,
                  and the conversations shaping hushh.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    stat: "Weekly",
                    label: "Concise updates without inbox noise.",
                  },
                  {
                    stat: "3 tracks",
                    label: "Choose the topics that matter to you.",
                  },
                  {
                    stat: "Private",
                    label: "Built to feel intentional, not promotional.",
                  },
                ].map((item) => (
                  <div
                    key={item.stat}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hushh-blue">
                      {item.stat}
                    </p>
                    <p className="mt-3 text-sm font-light leading-6 text-white/70">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Subscribe
              </p>
              <h2
                className="mt-3 font-serif text-3xl font-normal tracking-tight text-white"
                style={playfair}
              >
                Build your update stream.
              </h2>
              <p className="mt-3 text-sm font-light leading-6 text-white/65">
                Enter your email, choose your topics, and we will keep the
                signal clean.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label
                  htmlFor={emailFieldId}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
                >
                  Email address
                </label>
                <input
                  id={emailFieldId}
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setIsSubmitted(false);
                  }}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#0a0f17] px-4 py-4 text-sm text-white outline-none transition focus:border-hushh-blue focus:ring-2 focus:ring-hushh-blue/20 placeholder:text-white/30"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                      Topic preferences
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {selectedCountLabel}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {TOPIC_OPTIONS.map((topic) => {
                    const isChecked = selectedTopics.includes(topic.id);

                    return (
                      <label
                        key={topic.id}
                        className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-4 py-4 transition ${
                          isChecked
                            ? "border-hushh-blue/60 bg-hushh-blue/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTopic(topic.id)}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-hushh-blue focus:ring-hushh-blue/30"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {topic.label}
                          </p>
                          <p className="mt-1 text-sm font-light leading-6 text-white/55">
                            {topic.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              ) : null}

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  You are subscribed. We will send hushh updates to{" "}
                  <span className="font-medium text-white">{email}</span>.
                </div>
              ) : null}

              <HushhTechCta
                variant={HushhTechCtaVariant.BLACK}
                type="submit"
                className="!h-14 !rounded-2xl !bg-white !text-[#05070d] hover:!bg-white/90"
              >
                <span>Subscribe to hushh</span>
                <span className="material-symbols-outlined thin-icon text-lg">
                  north_east
                </span>
              </HushhTechCta>
            </form>

            <p className="mt-6 text-xs font-light leading-6 text-white/45">
              No subscription API route is defined in this repository yet, so
              this page currently confirms the form state locally.
              {" "}
              <Link
                to="/contact"
                className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
              >
                Contact us
              </Link>
              {" "}
              if you want a backend subscription flow added next.
            </p>
          </section>
        </div>
      </main>

      <HushhTechFooter />
    </div>
  );
}
