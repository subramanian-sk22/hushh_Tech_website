import nodemailer from "nodemailer";

function trimValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimValue(value));
}

function normalizeTopics(rawTopics) {
  if (!Array.isArray(rawTopics)) {
    return [];
  }

  return [...new Set(
    rawTopics
      .filter((topic) => typeof topic === "string")
      .map((topic) => topic.trim())
      .filter(Boolean)
  )].slice(0, 8);
}

function parseRecipients() {
  const raw = trimValue(process.env.NEWSLETTER_SUBSCRIBE_RECIPIENTS) || trimValue(process.env.GMAIL_USER);

  return raw
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);
}

function createTransporter() {
  const user = trimValue(process.env.GMAIL_USER);
  const pass = trimValue(process.env.GMAIL_APP_PASSWORD);

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body =
    req.body && typeof req.body === "object" && !Array.isArray(req.body)
      ? req.body
      : {};
  const email = trimValue(body.email).toLowerCase();
  const topics = normalizeTopics(body.topics);

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Enter a valid email address to subscribe.",
    });
  }

  if (topics.length === 0) {
    return res.status(400).json({
      error: "Choose at least one topic so we know what to send you.",
    });
  }

  const recipients = parseRecipients();
  const transporter = createTransporter();
  const canDeliver = transporter && recipients.length > 0;

  if (!canDeliver && process.env.NODE_ENV === "production") {
    return res.status(503).json({
      error: "Newsletter subscriptions are temporarily unavailable.",
    });
  }

  try {
    if (canDeliver) {
      await transporter.sendMail({
        from: `"Hushh Newsletter" <${trimValue(process.env.GMAIL_USER)}>`,
        to: recipients.join(", "),
        subject: `Newsletter signup: ${email}`,
        text: [
          "New newsletter subscription",
          `Email: ${email}`,
          `Topics: ${topics.join(", ")}`,
          `Received at: ${new Date().toISOString()}`,
        ].join("\n"),
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
            <h2>New newsletter subscription</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Topics:</strong> ${topics.join(", ")}</p>
            <p><strong>Received at:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      });
    } else {
      console.info("newsletter subscribe fallback:", { email, topics });
    }

    return res.status(200).json({
      success: true,
      message: "You’re subscribed. We’ll be in touch soon.",
    });
  } catch (error) {
    console.error("newsletter subscribe route error:", error);

    return res.status(500).json({
      error: "We couldn't complete your subscription right now. Please try again.",
    });
  }
}
