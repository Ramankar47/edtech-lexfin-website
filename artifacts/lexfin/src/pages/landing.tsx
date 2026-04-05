import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveLearningModal } from "@/components/InteractiveLearning";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Dynamic discover all images in the slideshow assets folder
const slideModules = import.meta.glob('/src/assets/slideshow/*.{png,jpg,jpeg,webp,avif}', { eager: true });
const SLIDESHOW_IMAGES = Object.values(slideModules).map((m: any) => m.default);

const POPULAR_COURSES = [
  {
    num: "01",
    title: "Certificate in Legal Finance",
    sub: "The comprehensive 6-module journey",
    duration: "30 hrs",
    level: "All Levels",
    icon: "🎓",
    tag: "Most Popular",
    link: "/courses"
  },
  {
    num: "02",
    title: "Household Economics",
    sub: "Mastering everyday financial decisions",
    duration: "4 Weeks",
    level: "Foundation",
    icon: "🏠",
    tag: "Updated",
    link: "#"
  }
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
    category: "expertscraftedcontent",
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
    category: "interactivelearning",
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
    category: "universitycertified",
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Slideshow and Modal states
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<any[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  useGSAP(() => {
    // --- HERO LOAD ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tl.from(".hero-badge", { opacity: 0, x: -20, duration: 0.8 })
      .from(".hero-title", { opacity: 0, y: 30, duration: 1 }, "-=0.6")
      .from(".hero-description", { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
      .from(".hero-cta", { opacity: 0, scale: 0.95, stagger: 0.15, duration: 0.8 }, "-=0.6")
      .from(".hero-stat", { opacity: 0, y: 15, stagger: 0.1, duration: 0.8 }, "-=0.5")
      .from(".hero-image-wrap", { opacity: 0, x: 40, scale: 0.9, duration: 1.2 }, "-=1.2");

    // --- SCROLL ANIMATIONS ---
    
    // Why Choose LexFin Stagger
    gsap.fromTo(".why-choose-card", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".why-choose-grid",
          start: "top bottom-=80px",
          once: true,
        },
        clearProps: "all"
      }
    );

    // Popular Courses Reveal
    gsap.fromTo(".course-card",
      { opacity: 0, scale: 0.96, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".courses-grid",
          start: "top bottom-=60px",
          once: true,
        },
        clearProps: "all"
      }
    );

    // --- MAGNETIC BUTTONS ---
    const magneticBtns = gsap.utils.toArray<HTMLElement>(".hero-cta, .nav-btn");
    magneticBtns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });

    // Reveal Animations (Images & Headers)
    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-header, .reveal-image");
    revealElements.forEach(el => {
      const isImage = el.classList.contains("reveal-image");
      gsap.fromTo(el,
        { 
          opacity: 0, 
          y: isImage ? 0 : 20, 
          scale: isImage ? 0.95 : 1 
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=60px",
            once: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isImage ? 1.2 : 0.8,
          ease: "power3.out",
          clearProps: "all"
        }
      );
    });
  }, { scope: containerRef }); // No dependencies - only runs once for stability

  // Second hook specifically for the background slideshow Ken Burns effect
  useGSAP(() => {
    if (!activeSlide) return;
    
    gsap.fromTo(".active-slide-img", 
      { scale: 1 }, 
      { 
        scale: 1.1, 
        duration: 5, 
        ease: "none",
        rotate: 0.01,
      }
    );
  }, { dependencies: [activeSlide], scope: containerRef });


  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % SLIDESHOW_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const openContentModal = async (category: string, title: string) => {
    if (!category) return;
    setModalCategory(category);
    setModalTitle(title);
    setModalContent([]);
    setModalOpen(true);
    setLoadingContent(true);
    try {
      // For interactive learning, we might fetch a special quiz file
      const url = category === 'interactivelearning' 
        ? `/api/content/home/${category}/financial-literacy-quiz.json`
        : `/api/content/home/${category}`;
        
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setModalContent(data);
      }
    } catch {
      // gracefully fail
    } finally {
      setLoadingContent(false);
    }
  };

  const prev = () =>
    setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <GlobalHeader />

      {/* MODAL FOR MEDIA CONTENT */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: 20,
                width: "100%",
                maxWidth: 600,
                maxHeight: "80vh",
                overflowY: "auto",
                padding: "32px 24px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: 0, color: "#1C1A28" }}>
                  {modalTitle}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{ background: "#F0EDE6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A576B" }}
                >
                  ✕
                </button>
              </div>

              {loadingContent ? (
                <div style={{ padding: 40, textAlign: "center", color: "#5A576B" }}>Loading content...</div>
              ) : modalCategory === 'interactivelearning' ? (
                <InteractiveLearningModal />
              ) : modalContent.length === 0 ? (
                <div style={{ padding: 40, textAlign: "center", color: "#9A97A8", background: "#F9F9F9", borderRadius: 12 }}>
                  No media content published yet. Check back soon!
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {modalContent.map((file, i) => (
                    <div key={i} style={{ background: "#F9F9F9", border: "1px solid #EAE8FB", borderRadius: 12, padding: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div style={{ fontSize: 24 }}>
                          {file.type === "video" ? "🎬" : file.type === "audio" ? "🎧" : file.type === "doc" ? "📄" : "📁"}
                        </div>
                        <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1C1A28" }}>{file.name.replace(/\.[^/.]+$/, "")}</h4>
                      </div>
                      
                      {file.type === "video" && (
                        <video src={file.url} controls style={{ width: "100%", borderRadius: 8, background: "#000" }}></video>
                      )}
                      {file.type === "audio" && (
                        <audio src={file.url} controls style={{ width: "100%" }}></audio>
                      )}
                      {(file.type === "other" || file.type === "doc") && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {file.url.toLowerCase().endsWith(".pdf") || file.url.toLowerCase().endsWith(".txt") ? (
                            <iframe src={file.url} style={{ width: "100%", height: "450px", borderRadius: 8, border: "1px solid #EAE8FB", background: "#fff" }} title={file.name} />
                          ) : (
                            <div style={{ width: "100%", height: 120, borderRadius: 8, border: "1px dashed #E0DCCE", background: "#FAFAF7", display: "flex", alignItems: "center", justifyContent: "center", color: "#9A97A8", fontSize: 14 }}>
                              Document preview not available natively. Please view via Google Drive or download.
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                            <a 
                              href={file.url} 
                              download
                              style={{ 
                                display: "inline-flex", 
                                alignItems: "center", 
                                gap: 6, 
                                color: "#fff", 
                                textDecoration: "none", 
                                fontWeight: 600,
                                fontSize: 13,
                                background: "#5A4FD6",
                                padding: "8px 16px",
                                borderRadius: 8
                              }}
                            >
                              Download File ↓
                            </a>
                            <a 
                              href={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + file.url)}`}
                              target="_blank" 
                              rel="noreferrer" 
                              style={{ 
                                display: "inline-flex", 
                                alignItems: "center", 
                                gap: 6, 
                                color: "#5A4FD6", 
                                textDecoration: "none", 
                                fontWeight: 600,
                                fontSize: 13,
                                background: "#EAE8FB",
                                padding: "8px 16px",
                                borderRadius: 8
                              }}
                            >
                              View in Google Docs 👁️
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        className="hero-section"
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
              className="hero-badge"
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
              className="hero-title"
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
              className="hero-description"
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
                onClick={() => setLocation("/courses/1/path")}
                className="hero-cta"
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
                className="hero-cta"
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
                <div key={s.label} className="hero-stat">
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
            className="hero-image-wrap"
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
              className="hero-image"
              src={`${import.meta.env.BASE_URL}images/hero-legal-finance.jpg`}
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

      {/* ─── FULL WIDTH SLIDESHOW ────────────────────────────── */}
      <section
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          maxHeight: "80vh",
          minHeight: 350,
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid #E0DCCE",
          background: "#F0EDE6",
          padding: "40px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden"
            }}
          >
            <div
              className="active-slide-img"
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url("${SLIDESHOW_IMAGES[activeSlide]}")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                willChange: "transform",
                imageRendering: "crisp-edges" as any,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ─── BORDER FADE EFFECTS ────────────────────────────── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to bottom, #F0EDE6 0%, transparent 0.5%, transparent 99.5%, #F0EDE6 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to right, #F0EDE6 0%, transparent 0.5%, transparent 99.5%, #F0EDE6 100%)" }} />

      </section>

      {/* ─── WHY CHOOSE LEXFIN ────────────────────────────── */}
      <section
        style={{
          position: "relative",
          borderBottom: "1px solid #E0DCCE",
          padding: "80px 48px",
          background: "#F9F9F9",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div className="reveal-header" style={{ textAlign: "center", marginBottom: 52 }}>
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
                fontSize: 16,
                color: "#5A576B",
                lineHeight: 1.6,
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "center",
                padding: "0 20px",
              }}
            >
              We combine India's legal framework with real financial education —
              building skills you'll actually use.
            </p>
          </div>

          {/* Cards grid */}
          <div
            className="why-choose-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.num}
                className="why-choose-card lp-card"
                style={{
                  height: "100%",
                  minHeight: 220,
                  opacity: 0, // Initial state for GSAP
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1.5px solid rgba(224, 220, 206, 0.8)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  position: "relative",
                  transition: "background .2s",
                  cursor: item.category ? "pointer" : "default",
                }}
                onClick={() => {
                  if (item.category) {
                    openContentModal(item.category, item.title);
                  }
                }}
              >
                {item.category && (
                  <div style={{ position: "absolute", bottom: 20, right: 20, color: "#5A4FD6", fontWeight: 600, fontSize: 13 }}>
                    View media →
                  </div>
                )}
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
            <div className="reveal-header">
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
            className="courses-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {POPULAR_COURSES.map((course) => (
              <div
                key={course.num}
                className="course-card lp-card"
                onClick={() => setLocation("/courses")}
                style={{
                  opacity: 0, // Initial state for GSAP
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

      {/* ─── ABOUT SGT UNIVERSITY ────────────────────────── */}
      <section
        style={{
          background: "#FAFAF7",
          borderTop: "1px solid #E0DCCE",
          borderBottom: "1px solid #E0DCCE",
          padding: "80px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap",
          }}
        >
          <div className="reveal-image" style={{ flex: 1, minWidth: 320, aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 20 }}>
            <img
              src={`${import.meta.env.BASE_URL}images/sgt-university-campus.jpg`}
              alt="SGT University Campus"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          <div className="reveal-header" style={{ flex: 1.2, minWidth: 320 }}>
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
              Partner Institution
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              About{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>
                SGT University
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#5A576B",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Shree Guru Gobind Singh Tricentenary (SGT) University, Gurugram, is a premier multidisciplinary institution established in 2013 under the Haryana Private Universities Act. Recognized by the University Grants Commission (UGC) and accredited with an NAAC A+ grade, the university has rapidly emerged as a centre of excellence in higher education.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#5A576B",
                lineHeight: 1.7,
              }}
            >
              Spread across a sprawling campus of over 70 acres, SGT University offers a wide spectrum of academic programs through its 19 faculties, ranging from law, engineering, and management to medical and health sciences. The university is deeply committed to promoting innovation, research, and holistic development.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ABOUT LEXFIN INITIATIVE ────────────────────── */}
      <section
        style={{
          background: "#F0EDE6",
          borderBottom: "1px solid #E0DCCE",
          padding: "80px 48px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 64,
            flexWrap: "wrap-reverse",
          }}
        >
          <div className="reveal-header" style={{ flex: 1.2, minWidth: 320 }}>
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
                marginBottom: 16,
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
              Our Philosophy
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#1C1A28",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              The{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "#C9933A" }}>
                LexFin Initiative
              </em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#5A576B",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              The LexFin Financial Literacy website is an innovative initiative aimed at simplifying financial concepts and making them accessible to students and the general public. Inspired by the integration of legal and financial expertise, LexFin represents a platform where financial awareness meets practical application.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#5A576B",
                lineHeight: 1.7,
              }}
            >
              By bridging the gap between theoretical knowledge and real-world financial understanding, LexFin empowers learners with essential tools for informed decision-making in savings, budgeting, and regulatory frameworks like RBI and SEBI.
            </p>
          </div>
          <div className="reveal-image" style={{ flex: 1, minWidth: 320, aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 20 }}>
            <img
              src={`${import.meta.env.BASE_URL}images/lexfin-initiative-banner.jpg`}
              alt="LexFin Initiative Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
              }}
            />
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
          <div className="reveal-header" style={{ flex: 1, minWidth: 280 }}>
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
              onClick={() => setLocation("/courses/1/path")}
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
              onClick={() => setLocation("/courses/1/path")}
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
          <div className="reveal-header" style={{ textAlign: "center", marginBottom: 48 }}>
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
          <div className="reveal-header">
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
          <div className="reveal-header">
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
