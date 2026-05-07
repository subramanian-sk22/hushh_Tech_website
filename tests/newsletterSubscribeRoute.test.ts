import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMail = vi.fn();

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail,
    })),
  },
}));

function createResponse() {
  let statusCode = 200;
  let body;
  let ended = false;

  return {
    get statusCode() {
      return statusCode;
    },
    get body() {
      return body;
    },
    get ended() {
      return ended;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      body = payload;
      return this;
    },
    end() {
      ended = true;
      return this;
    },
  };
}

describe("newsletter subscribe route", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    sendMail.mockResolvedValue({ messageId: "message-1" });
    delete process.env.NODE_ENV;
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    delete process.env.NEWSLETTER_SUBSCRIBE_RECIPIENTS;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("rejects invalid email addresses", async () => {
    const { default: handler } = await import("../api/newsletter-subscribe.js");
    const req = {
      method: "POST",
      body: {
        email: "not-an-email",
        topics: ["Product updates"],
      },
    };
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain("valid email");
  });

  it("accepts subscriptions in development when mail delivery is not configured", async () => {
    const { default: handler } = await import("../api/newsletter-subscribe.js");
    const req = {
      method: "POST",
      body: {
        email: "reader@example.com",
        topics: ["Product updates", "AI insights", "AI insights"],
      },
    };
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: expect.any(String),
    });
    expect(console.info).toHaveBeenCalledWith(
      "newsletter subscribe fallback:",
      expect.objectContaining({
        email: "reader@example.com",
        topics: ["Product updates", "AI insights"],
      })
    );
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends an email when delivery is configured", async () => {
    process.env.GMAIL_USER = "ops@hushh.ai";
    process.env.GMAIL_APP_PASSWORD = "app-password";
    process.env.NEWSLETTER_SUBSCRIBE_RECIPIENTS = "team@hushh.ai";

    const { default: handler } = await import("../api/newsletter-subscribe.js");
    const req = {
      method: "POST",
      body: {
        email: "reader@example.com",
        topics: ["Product updates", "Fund news"],
      },
    };
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "team@hushh.ai",
        subject: "Newsletter signup: reader@example.com",
      })
    );
  });

  it("fails closed in production when delivery is not configured", async () => {
    process.env.NODE_ENV = "production";

    const { default: handler } = await import("../api/newsletter-subscribe.js");
    const req = {
      method: "POST",
      body: {
        email: "reader@example.com",
        topics: ["Events and announcements"],
      },
    };
    const res = createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res.body.error).toContain("temporarily unavailable");
  });
});
