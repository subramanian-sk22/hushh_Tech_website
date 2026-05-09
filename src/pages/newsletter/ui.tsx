import { FormEvent, useMemo, useState } from "react";

type TopicPreference = {
  id: string;
  label: string;
  description: string;
};

const TOPIC_PREFERENCES: TopicPreference[] = [
  {
    id: "product-updates",
    label: "Product updates",
    description: "New Hushh features, releases, and platform improvements.",
  },
  {
    id: "privacy-ai",
    label: "Privacy & AI",
    description: "Insights on personal data ownership, AI agents, and consent.",
  },
  {
    id: "developer-news",
    label: "Developer news",
    description: "APIs, SDKs, technical updates, and builder-focused content.",
  },
  {
    id: "company-news",
    label: "Company news",
    description: "Announcements, partnerships, and community stories.",
  },
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return isValidEmail(email) && selectedTopics.length > 0;
  }, [email, selectedTopics]);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((currentTopics) => {
      if (currentTopics.includes(topicId)) {
        return currentTopics.filter((id) => id !== topicId);
      }

      return [...currentTopics, topicId];
    });

    setError(null);
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      setIsSubmitted(false);
      return;
    }

    if (selectedTopics.length === 0) {
      setError("Please select at least one topic preference.");
      setIsSubmitted(false);
      return;
    }

    /**
     * TODO:
     * Replace this client-side success state with an API call when the backend
     * newsletter subscription endpoint is available.
     *
     * Example:
     * await newsletterService.subscribe({
     *   email: normalizedEmail,
     *   topics: selectedTopics,
     * });
     */

    setEmail(normalizedEmail);
    setError(null);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-emerald-300">
              Hushh Newsletter
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stay updated on the future of personal data and AI.
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Subscribe to receive curated Hushh updates, product news, privacy
              insights, and developer announcements.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Choose what you want to hear about
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Select one or more topics. You can update your preferences at
                any time.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Email address
                  </label>

                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError(null);
                      setIsSubmitted(false);
                    }}
                    placeholder="you@example.com"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/10"
                    aria-describedby={error ? "newsletter-error" : undefined}
                  />
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-zinc-200">
                    Topic preferences
                  </legend>

                  <div className="mt-4 grid gap-3">
                    {TOPIC_PREFERENCES.map((topic) => {
                      const isChecked = selectedTopics.includes(topic.id);

                      return (
                        <label
                          key={topic.id}
                          htmlFor={topic.id}
                          className={[
                            "group flex cursor-pointer gap-4 rounded-2xl border p-4 transition",
                            isChecked
                              ? "border-emerald-300/70 bg-emerald-300/10"
                              : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
                          ].join(" ")}
                        >
                          <input
                            id={topic.id}
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleTopic(topic.id)}
                            className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-emerald-300 focus:ring-emerald-300"
                          />

                          <span>
                            <span className="block text-sm font-medium text-white">
                              {topic.label}
                            </span>

                            <span className="mt-1 block text-sm leading-6 text-zinc-400">
                              {topic.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {error && (
                  <p
                    id="newsletter-error"
                    className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                {isSubmitted && (
                  <p
                    className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200"
                    role="status"
                  >
                    Thanks for subscribing. You’re now signed up for Hushh
                    updates.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  Subscribe to updates
                </button>
              </form>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                What you’ll get
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-medium text-zinc-100">
                    Curated updates
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Important Hushh announcements without inbox noise.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-zinc-100">
                    Privacy-first perspective
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Learn how personal data, consent, and AI agents are
                    evolving.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-zinc-100">
                    Developer signal
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Technical updates for builders working with Hushh.
                  </p>
                </div>
              </div>

              <p className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-zinc-500">
                No spam. No selling your data. Just relevant updates from
                Hushh.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}