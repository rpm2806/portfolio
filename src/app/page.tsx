import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Leadership from "@/components/sections/Leadership";
import Resumes from "@/components/sections/Resumes";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Leadership />
      <Resumes />
      <Contact />
    </>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-label" aria-hidden>About</div>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}
        >
          About Me
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.75 }}>
          {`I'm Rupam Kumar, a Mechanical Engineering graduate from NIT Durgapur, now pivoted into Data & AI Engineering. My journey started with building physical systems, but I quickly fell in love with coding, data, and intelligent automation. I enjoy turning complex problems into clean, production‑ready solutions—whether that's a full‑stack web app, a data pipeline, or an LLM‑powered assistant.`}
        </p>
      </div>
    </section>
  );
}
