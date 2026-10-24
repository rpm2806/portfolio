"use client";

export default function Approach() {
  const principles = [
    {
      number: "01",
      title: "Understand before building",
      description:
        "Break down what the problem actually is before selecting a tool or starting to code. Time spent clarifying requirements saves significant time during implementation.",
    },
    {
      number: "02",
      title: "Write clear, maintainable code",
      description:
        "Aim for code that a future version of yourself (or a collaborator) can read and modify. Meaningful names, reasonable functions, and comments where logic is non-obvious.",
    },
    {
      number: "03",
      title: "Validate inputs and handle errors",
      description:
        "Real systems receive unexpected data. Check inputs, handle edge cases, and give useful feedback when something goes wrong rather than silently failing.",
    },
    {
      number: "04",
      title: "Keep data and logic organized",
      description:
        "Separate concerns: keep data processing, business logic, and presentation distinct. A clear data model makes a system significantly easier to extend.",
    },
    {
      number: "05",
      title: "Use version control consistently",
      description:
        "Commit often with meaningful messages. Treat Git as a project journal, not just a backup. Good version control history makes debugging and collaboration much smoother.",
    },
    {
      number: "06",
      title: "Test, observe, iterate",
      description:
        "Test important functionality rather than assuming it works. Observe how the system behaves under real conditions. Refine based on what you learn, not just what was planned.",
    },
  ];

  return (
    <section
      id="approach"
      className="section"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container">
        <div className="section-label" aria-hidden>Engineering Approach</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          How I Approach Technical Work
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "520px", marginBottom: "56px", lineHeight: 1.7 }}>
          Working principles I try to apply — not claims of mastery, but a consistent way of thinking about software and data problems.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="approach-grid">
          {principles.map((p) => (
            <div key={p.number} className="card" style={{ padding: "24px" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "12px",
                  opacity: 0.6,
                }}
                aria-hidden
              >
                {p.number}
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .approach-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .approach-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
