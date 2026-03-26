import { useState } from "react";
import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";

const POPULAR_COURSES = [
  {
    num: "01",
    title: "Household Economics & Legal Awareness",
    sub: "The Foundation",
    duration: "5 hrs",
    level: "Beginner",
    icon: "🏠",
    tag: "Most Popular",
  },
  {
    num: "02",
    title: "Personal Finance & Compliance Skills",
    sub: "Managing Your Finances",
    duration: "5 hrs",
    level: "Beginner",
    icon: "💳",
    tag: "",
  },
  {
    num: "03",
    title: "Goal Setting & Tax Efficiency",
    sub: "Financial Planning",
    duration: "5 hrs",
    level: "Intermediate",
    icon: "🎯",
    tag: "",
  },
  {
    num: "04",
    title: "Insurance, Liability & Legal Safeguards",
    sub: "Risk & Reward",
    duration: "5 hrs",
    level: "Intermediate",
    icon: "🛡️",
    tag: "",
  },
  {
    num: "05",
    title: "Markets, Regulation & Legal Rights",
    sub: "The Financial Landscape",
    duration: "5 hrs",
    level: "Advanced",
    icon: "📈",
    tag: "Trending",
  },
  {
    num: "06",
    title: "The LexFin Strategy — Legal-Financial Integration",
    sub: "Capstone Project",
    duration: "10 hrs",
    level: "Advanced",
    icon: "🏆",
    tag: "",
  },
];

const WHY_CHOOSE = [
  {
    num: "1",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Expert-Crafted Content",
    desc: "Learn from modules designed by practising lawyers, chartered accountants, and legal researchers at LexFin.",
  },
  {
    num: "2",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Interactive Learning",
    desc: "Gain knowledge through expert-led lessons, quizzes, puzzles, and real-world Indian case studies.",
  },
  {
    num: "3",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Self-Paced & Flexible",
    desc: "Study at your own pace with lifetime access to all modules, resources, and future updates.",
  },
  {
    num: "4",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Learn on the Go",
    desc: "Fully mobile-optimised. Navigate the entire course seamlessly from your phone or tablet.",
  },
  {
    num: "5",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
        <path d="M9 3v18M3 9h6" />
      </svg>
    ),
    title: "Finance + Law Together",
    desc: "The only Indian programme that deeply integrates financial literacy with its actual legal framework.",
  },
  {
    num: "6",
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="1.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: "University-Certified",
    desc: "Earn a joint certificate from SGT University, Faculty of Law, recognised across India's legal and financial sectors.",
  },
];

const TESTIMONIALS = [
  {
    name: "Aayushi Mehta",
    role: "BA LLB Student, SGT University",
    quote:
      "LexFin completely changed how I understand personal finance. The way legal concepts are woven into everyday money decisions — tax, loans, insurance — is something no law school teaches. Absolutely worth it.",
    initials: "AM",
  },
  {
    name: "Rahul Sharma",
    role: "Young Professional, Mumbai",
    quote:
      "I was always confused about ITR filing and investment options. After completing the first three modules, I feel confident enough to handle my own finances without paying a consultant. The quizzes make learning stick.",
    initials: "RS",
  },
  {
    name: "Priya Nair",
    role: "MBA Finance, Delhi NCR",
    quote:
      "The SEBI and RBI regulatory modules are gold for anyone entering capital markets. I used the case studies during my internship at a law firm and my supervisor was genuinely impressed.",
    initials: "PN",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const prev = () =>
    setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <GlobalHeader />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 64,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* Left text */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#5A4FD6",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#5A4FD6",
                  borderRadius: 2,
                }}
              />
              E-Learning
            </div>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 16,
              }}
            >
              Learn Financial Laws{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>
                the Fun Way
              </em>
            </h1>

            <p
              style={{
                fontSize: 16,
                color: "#5A576B",
                lineHeight: 1.65,
                maxWidth: 480,
                marginBottom: 32,
              }}
            >
              Master Indian Financial & Legal frameworks — from household
              economics to capital markets — through structured, bite-sized
              learning. Certified by SGT University × LexFin.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => setLocation("/module/1/learn")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  background: "#5A4FD6",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background .2s, transform .15s",
                  boxShadow: "0 4px 16px rgba(90,79,214,.35)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#3D34A5";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#5A4FD6";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Start Learning Now
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setLocation("/courses")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  background: "transparent",
                  color: "#5A4FD6",
                  border: "1.5px solid #5A4FD6",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all .2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#EAE8FB")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Browse Courses
              </button>
            </div>

            {/* Stats */}
            <div
              style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}
            >
              {[
                { val: "6", label: "Modules" },
                { val: "30 hrs", label: "Content" },
                { val: "SGT University", label: "Certificate" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#1C1A28",
                    }}
                  >
                    {s.val}
                  </div>
                  <div style={{ fontSize: 12, color: "#9A97A8", fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div
            style={{ flex: "0 0 auto", position: "relative", maxWidth: 460 }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(90,79,214,.15) 0%, rgba(201,147,58,.12) 100%)",
                borderRadius: "3rem",
                transform: "rotate(3deg) scale(1.05)",
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}images/hero-balance.png`}
              alt="LexFin — Financial & Legal Literacy"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "auto",
                borderRadius: "2rem",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Affiliation strip */}
        <style>{`
          @media (max-width: 780px) {
            .landing-hero-inner { flex-direction: column !important; }
          }
        `}</style>
      </section>

      {/* ─── WHY CHOOSE LEXFIN ────────────────────────────── */}
      <section
        style={{
          background: "#FAFAF7",
          borderTop: "1px solid #E0DCCE",
          borderBottom: "1px solid #E0DCCE",
          padding: "80px 48px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#5A4FD6",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#5A4FD6",
                  borderRadius: 2,
                }}
              />
              Our Advantage
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 12,
                lineHeight: 1.1,
              }}
            >
              Why Choose{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>
                LexFin Learning?
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#5A576B",
                lineHeight: 1.65,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              We combine India's legal framework with real financial education —
              building skills you'll actually use.
            </p>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.num}
                style={{
                  background: "#F0EDE6",
                  border: "1.5px solid #E0DCCE",
                  borderRadius: 16,
                  padding: "28px 24px",
                  position: "relative",
                  transition: "box-shadow .2s, transform .18s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(90,79,214,.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 28,
                    height: 28,
                    background: "#EAE8FB",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#5A4FD6",
                  }}
                >
                  {item.num}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#EAE8FB",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#1C1A28",
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#5A576B",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR COURSES ──────────────────────────────── */}
      <section style={{ padding: "80px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "#5A4FD6",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 20,
                    height: 2,
                    background: "#5A4FD6",
                    borderRadius: 2,
                  }}
                />
                Curriculum
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  color: "#1C1A28",
                  lineHeight: 1.1,
                }}
              >
                Popular{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "#5A4FD6",
                  }}
                >
                  Courses
                </em>
              </h2>
            </div>
            <button
              onClick={() => setLocation("/courses")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "#5A4FD6",
                background: "transparent",
                border: "1.5px solid #5A4FD6",
                borderRadius: 8,
                padding: "9px 18px",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background .18s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#EAE8FB")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              View All Courses →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {POPULAR_COURSES.map((course) => (
              <div
                key={course.num}
                onClick={() => setLocation("/courses")}
                style={{
                  background: "#FAFAF7",
                  border: "1.5px solid #E0DCCE",
                  borderRadius: 16,
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all .2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#5A4FD6";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(90,79,214,.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#E0DCCE";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {course.tag && (
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: "#C9933A",
                      background: "rgba(201,147,58,.12)",
                      borderRadius: 100,
                      padding: "3px 10px",
                      border: "1px solid rgba(201,147,58,.25)",
                    }}
                  >
                    {course.tag}
                  </div>
                )}

                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "#EAE8FB",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 16,
                  }}
                >
                  {course.icon}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9A97A8",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    marginBottom: 4,
                  }}
                >
                  Module {course.num} · {course.level}
                </div>

                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "#1C1A28",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#9A97A8",
                    margin: "0 0 16px",
                  }}
                >
                  {course.sub}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#5A576B",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {course.duration}
                  <span style={{ marginLeft: "auto", color: "#5A4FD6", fontWeight: 500 }}>
                    Start →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── START YOUR JOURNEY CTA ───────────────────────── */}
      <section
        style={{
          background: "#1C1A28",
          padding: "72px 48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            background: "#5A4FD6",
            opacity: 0.15,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            background: "#C9933A",
            opacity: 0.08,
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#C9933A",
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#C9933A",
                  borderRadius: 2,
                }}
              />
              Get Started
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#fff",
                marginBottom: 14,
                lineHeight: 1.1,
              }}
            >
              Start Your Learning{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#B8B4D4",
                }}
              >
                Journey Today
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,.55)",
                lineHeight: 1.7,
                maxWidth: 440,
              }}
            >
              Join thousands of students, law graduates, and young professionals
              who are building financial and legal confidence through LexFin.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setLocation("/module/1/learn")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 36px",
                background: "#5A4FD6",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background .2s",
                boxShadow: "0 6px 24px rgba(90,79,214,.4)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#3D34A5")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#5A4FD6")}
            >
              Begin Module 1 — Free
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setLocation("/learning-path")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 36px",
                background: "rgba(255,255,255,.08)",
                color: "rgba(255,255,255,.8)",
                border: "1.5px solid rgba(255,255,255,.18)",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background .2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,.14)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,.08)")
              }
            >
              View Learning Path
            </button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section style={{ padding: "80px 48px", background: "#F0EDE6" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#5A4FD6",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#5A4FD6",
                  borderRadius: 2,
                }}
              />
              Testimonials
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                lineHeight: 1.1,
              }}
            >
              What Our{" "}
              <em
                style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}
              >
                Learners Say
              </em>
            </h2>
          </div>

          {/* Carousel */}
          <div
            style={{
              background: "#FAFAF7",
              border: "1.5px solid #E0DCCE",
              borderRadius: 20,
              padding: "48px 52px",
              position: "relative",
              minHeight: 220,
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 40,
                fontFamily: "'Fraunces', serif",
                fontSize: 80,
                color: "#EAE8FB",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              "
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Avatar + name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#5A4FD6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {TESTIMONIALS[activeTestimonial].initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#1C1A28",
                    }}
                  >
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div style={{ fontSize: 12, color: "#9A97A8" }}>
                    {TESTIMONIALS[activeTestimonial].role}
                  </div>
                </div>

                {/* Stars */}
                <div
                  style={{ marginLeft: "auto", display: "flex", gap: 2 }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: "#C9933A", fontSize: 14 }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 15.5,
                  color: "#5A576B",
                  lineHeight: 1.75,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            <button
              onClick={prev}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid #E0DCCE",
                background: "#FAFAF7",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#5A576B",
                transition: "border-color .15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "#5A4FD6")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "#E0DCCE")
              }
            >
              ←
            </button>

            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? 20 : 8,
                  height: 8,
                  borderRadius: 100,
                  border: "none",
                  background: i === activeTestimonial ? "#5A4FD6" : "#D4D0C8",
                  cursor: "pointer",
                  transition: "width .2s, background .2s",
                  padding: 0,
                }}
              />
            ))}

            <button
              onClick={next}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid #E0DCCE",
                background: "#FAFAF7",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#5A576B",
                transition: "border-color .15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "#5A4FD6")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "#E0DCCE")
              }
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ─── CONTACT & LOCATION ───────────────────────────── */}
      <section
        style={{
          background: "#FAFAF7",
          borderTop: "1px solid #E0DCCE",
          padding: "80px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 52,
            alignItems: "start",
          }}
        >
          {/* Contact */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#5A4FD6",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#5A4FD6",
                  borderRadius: 2,
                }}
              />
              Get In Touch
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              Contact Us
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {[
                {
                  icon: "📧",
                  label: "Email",
                  val: "info@lexfin.in",
                  href: "mailto:info@lexfin.in",
                },
                {
                  icon: "📞",
                  label: "Phone",
                  val: "+91 88264 XXXXX",
                  href: "tel:+918826400000",
                },
                {
                  icon: "🕐",
                  label: "Helpdesk Hours",
                  val: "Mon – Fri: 9:30 AM to 1:00 PM & 2:00 PM to 5:30 PM",
                  href: undefined,
                },
                {
                  icon: "🌐",
                  label: "Website",
                  val: "www.lexfin.in",
                  href: "https://www.lexfin.in",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    background: "#F0EDE6",
                    border: "1px solid #E0DCCE",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      width: 36,
                      height: 36,
                      background: "#EAE8FB",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#9A97A8",
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontSize: 14,
                          color: "#5A4FD6",
                          fontWeight: 500,
                          textDecoration: "none",
                        }}
                      >
                        {item.val}
                      </a>
                    ) : (
                      <span style={{ fontSize: 13.5, color: "#1C1A28" }}>
                        {item.val}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "#5A4FD6",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "#5A4FD6",
                  borderRadius: 2,
                }}
              />
              Campus
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              Our Location
            </h2>

            {/* Map embed (OpenStreetMap — no API key needed) */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1.5px solid #E0DCCE",
                marginBottom: 16,
              }}
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.8800%2C28.3400%2C76.9600%2C28.4100&layer=mapnik&marker=28.3750%2C76.9150"
                width="100%"
                height="220"
                style={{ border: "none", display: "block" }}
                title="SGT University Location"
                loading="lazy"
              />
            </div>

            <div
              style={{
                background: "#F0EDE6",
                border: "1px solid #E0DCCE",
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  width: 36,
                  height: 36,
                  background: "#EAE8FB",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                📍
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1C1A28",
                    marginBottom: 3,
                  }}
                >
                  SGT University, Faculty of Law
                </div>
                <div style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.55 }}>
                  Budhera, Gurugram — Badli Road,
                  <br />
                  Gurugram, Haryana 122505
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────── */}
      <footer
        style={{
          background: "#1C1A28",
          padding: "28px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>
          © 2025 LexFin. All rights reserved. Joint programme with SGT University.
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Courses", href: "/courses" },
            { label: "Blogs", href: "/blogs" },
            { label: "Study Material", href: "/study-material" },
            { label: "Regulatory Alerts", href: "/regulatory-alerts" },
          ].map((link) => (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,.4)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color .15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,.8)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,.4)")
              }
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "rgba(255,255,255,.5)",
            background: "rgba(255,255,255,.07)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 8,
            padding: "7px 14px",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            transition: "background .15s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.12)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.07)")
          }
        >
          Scroll to Top ↑
        </button>
      </footer>
    </div>
  );
}
