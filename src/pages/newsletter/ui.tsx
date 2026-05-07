import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type TopicKey =
  | "productUpdates"
  | "fundNews"
  | "ai-insights"
  | "events";

const topicOptions: Array<{ key: TopicKey; label: string; description: string }> = [
  {
    key: "productUpdates",
    label: "Product updates",
    description: "New features, launches, and customer experience improvements.",
  },
  {
    key: "fundNews",
    label: "Fund news",
    description: "Portfolio commentary, investor notes, and market perspectives.",
  },
  {
    key: "ai-insights",
    label: "AI insights",
    description: "Fresh thinking from Hushh on intelligence, data, and automation.",
  },
  {
    key: "events",
    label: "Events and announcements",
    description: "Invites to community sessions, demos, and special announcements.",
  },
];

const playfair = { fontFamily: "'Playfair Display', serif" };

const initialTopics: Record<TopicKey, boolean> = {
  productUpdates: true,
  fundNews: false,
  "ai-insights": false,
  events: false,
};

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState(initialTopics);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTopics = useMemo(
    () => topicOptions.filter((option) => topics[option.key]).map((option) => option.label),
    [topics],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail || !isValidEmail) {
      setSuccessMessage("");
      setError("Enter a valid email address to subscribe.");
      return;
    }

    if (selectedTopics.length === 0) {
      setSuccessMessage("");
      setError("Choose at least one topic so we know what to send you.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          topics: selectedTopics,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          typeof payload?.error === "string" && payload.error.trim().length > 0
            ? payload.error
            : "We couldn't complete your subscription right now. Please try again.",
        );
        return;
      }

      setSuccessMessage(
        typeof payload?.message === "string" && payload.message.trim().length > 0
          ? payload.message
          : `You're subscribed for ${selectedTopics.join(", ")} updates. We'll send the next issue to ${trimmedEmail}.`,
      );
      setEmail("");
      setTopics(initialTopics);
    } catch {
      setError("We couldn't complete your subscription right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTopic = (key: TopicKey) => {
    setTopics((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-gray-900 selection:bg-hushh-blue selection:text-white">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-[#0f172a] via-[#13213b] to-[#1d4ed8] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] lg:p-12">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Hushh Newsletter
            </div>
            <h1
              className="max-w-xl text-[2.8rem] leading-[1.05] tracking-tight text-white font-serif"
              style={playfair}
            >
              Stay close to the stories shaping{" "}
              <span className="text-blue-200 italic font-light">Hushh.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-blue-50/85">
              Subscribe for thoughtful updates across product launches, fund news,
              AI insights, and community events. We keep it selective, relevant,
              and easy to leave at any time.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Monthly editorial updates",
                "Priority access to launches",
                "Focused topics you choose",
                "No secrets or payment required",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/12 bg-white/8 px-4 py-4 text-sm text-white/90 backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 text-sm text-blue-100/80">
              Looking for the main site?{" "}
              <Link className="font-medium text-white underline underline-offset-4" to="/">
                Return home
              </Link>
            </div>
          </section>

          <section className="rounded-[2rem] border border-gray-200/80 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-10">
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-hushh-blue">
                Subscribe
              </p>
              <h2
                className="mt-3 text-3xl tracking-tight text-gray-950 font-serif"
                style={playfair}
              >
                Join the list.
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Choose what you want to hear about, then we will keep the next
                update ready for your inbox.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-hushh-blue focus:bg-white focus:ring-4 focus:ring-hushh-blue/10"
                />
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-gray-800">
                  Topic preferences
                </legend>
                <div className="mt-3 space-y-3">
                  {topicOptions.map((option) => (
                    <label
                      key={option.key}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-[#fafafa] px-4 py-4 transition hover:border-hushh-blue/40 hover:bg-white"
                    >
                      <input
                        type="checkbox"
                        checked={topics[option.key]}
                        onChange={() => toggleTopic(option.key)}
                        disabled={isSubmitting}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-hushh-blue focus:ring-hushh-blue"
                      />
                      <span>
                        <span className="block text-sm font-medium text-gray-900">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-gray-500">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#111827] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1f2937] focus:outline-none focus:ring-4 focus:ring-gray-900/10"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe to updates"}
              </button>

              {isSubmitting ? (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  Subscription in progress...
                </div>
              ) : null}

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              ) : null}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
