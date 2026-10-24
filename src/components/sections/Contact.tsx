"use client";

import { useState, useRef } from "react";
import { Mail, MessageSquare, Send, CheckCircle, XCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { profile } from "@/data/profile";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: FormData) => {
    const errs: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    if (!name || name.length < 2) errs.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email.";
    if (!message || message.length < 10) errs.message = "Message must be at least 10 characters.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setServerMessage("");

    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      profile.web3formsAccessKey;

    if (accessKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            message,
            subject: `Portfolio Contact from ${name}`,
            from_name: "Portfolio Visitor",
            botcheck: (data.get("botcheck") as string) || "",
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setServerMessage("Message delivered directly to my inbox! Thank you for reaching out.");
          formRef.current?.reset();
          return;
        } else {
          console.warn("Web3Forms response warning, falling back to email client:", result.message);
        }
      } catch (err) {
        console.warn("Web3Forms network error, falling back to email client:", err);
      }
    }

    // Graceful fallback to mail client
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("success");
      setServerMessage("Message pre-filled in your email client. Send it to deliver directly!");
      formRef.current?.reset();
    }, 500);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: "Best way to reach me",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "rupam-kumar-86a999254",
      href: profile.linkedin,
      description: "Connect professionally",
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "rpm2806",
      href: profile.github,
      description: "See my code",
    },
    ...(profile.whatsappConfigured
      ? [
          {
            icon: MessageSquare,
            label: "WhatsApp",
            value: "Chat directly",
            href: `https://wa.me/${profile.whatsappNumber}`,
            description: "Quick conversation",
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="section" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 64px" }}>
          <div className="section-label" style={{ justifyContent: "center" }} aria-hidden>
            Get In Touch
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Have a data or AI problem worth solving?
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1.05rem" }}>
            I&apos;m open to discussions about software engineering, data projects, and AI applications. Reach out directly — I respond to every genuine message.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "48px", alignItems: "start" }} className="contact-grid">
          {/* Left: Contact methods */}
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px" }}>
              Contact Methods
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {contactMethods.map(({ icon: Icon, label, value, href, description }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="card"
                  style={{
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  aria-label={`Contact via ${label}: ${value}`}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--accent-cyan-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--accent-cyan)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {value}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{description}</div>
                  </div>
                </a>
              ))}
            </div>

            {!profile.whatsappConfigured && (
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", fontStyle: "italic" }}>
                WhatsApp link will appear here once configured in profile.ts.
              </p>
            )}
          </div>

          {/* Right: Contact form */}
          <div className="card contact-form-card" style={{ padding: "32px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
              Send a Message
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>
              Send a message directly to my inbox, or connect via any of the links on the left.
            </p>

            {status === "success" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  gap: "12px",
                  textAlign: "center",
                }}
              >
                <CheckCircle size={48} style={{ color: "#10b981" }} />
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                  Message Delivered!
                </h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                  {serverMessage || "Thank you for reaching out. I'll get back to you shortly."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary"
                  style={{ marginTop: "8px" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                {/* Honeypot for spam bot prevention */}
                <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                {/* Name */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="contact-name"
                    style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}
                  >
                    Name <span aria-hidden style={{ color: "var(--accent-cyan)" }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "var(--bg-secondary)",
                      border: `1.5px solid ${errors.name ? "#ef4444" : "var(--border)"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--accent-cyan)"; }}
                    onBlur={(e) => { if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="contact-email"
                    style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}
                  >
                    Email <span aria-hidden style={{ color: "var(--accent-cyan)" }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "var(--bg-secondary)",
                      border: `1.5px solid ${errors.email ? "#ef4444" : "var(--border)"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--accent-cyan)"; }}
                    onBlur={(e) => { if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    htmlFor="contact-message"
                    style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}
                  >
                    Message <span aria-hidden style={{ color: "var(--accent-cyan)" }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "var(--bg-secondary)",
                      border: `1.5px solid ${errors.message ? "#ef4444" : "var(--border)"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
                      minHeight: "120px",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => { if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--accent-cyan)"; }}
                    onBlur={(e) => { if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--border)"; }}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "sending"}
                  style={{ width: "100%", justifyContent: "center", minHeight: "48px", opacity: status === "sending" ? 0.7 : 1 }}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    "Sending message..."
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "12px",
                      padding: "10px 14px",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#ef4444",
                    }}
                  >
                    <XCircle size={16} />
                    Something went wrong. Please email directly at {profile.email}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .contact-form-card {
            padding: 22px 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
