import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useRoute } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";
import { getAllCourses } from "@/data";

const AUDIENCE = [
  { icon: "⚖️", title: "Law Students", desc: "Understand the financial regulations you'll eventually litigate — before you enter the courtroom." },
  { icon: "💼", title: "Young Professionals", desc: "Manage your first salary, understand taxes, and sidestep common debt traps from day one." },
  { icon: "🚀", title: "Entrepreneurs", desc: "Grasp the transition from compliance to competitiveness — legal fluency is your biggest edge." },
  { icon: "🔬", title: "Researchers", desc: "Explore the rich intersection of Law (Lex) and Finance (Fin) through case studies and live data." },
];

export default function CoursesPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/courses/:courseId");
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const selectedCourse = match ? getAllCourses().find(c => String(c.id) === String(params?.courseId)) : null;

  const toggle = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif", color: "#1C1A28" }}>
      <GlobalHeader />

      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* PAGE HEAD */}
            <section style={{ padding: "60px 48px 48px", borderBottom: "1px solid #E0DCCE" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 16 }}>
                <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
                E-Learning
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.02em", marginBottom: 12 }}>
                Our <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Courses</em>
              </h1>
              <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 500 }}>Master Indian Financial & Legal frameworks through structured, bite-sized learning.</p>
            </section>

            {/* AFFILIATION STRIP */}
            <div style={{ padding: "16px 48px", background: "#FAFAF7", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "#5A4FD6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.5"><circle cx="12" cy="12" r="7"/><path d="M5 12h14M12 5v14"/></svg>
              </div>
              <p style={{ fontSize: 13, color: "#5A576B" }}>All courses affiliated with <strong style={{ color: "#1C1A28" }}>SGT University, Faculty of Law</strong> — Joint certification with LexFin</p>
            </div>

            {/* COURSE CARDS */}
            <div style={{ padding: "48px", position: "relative", overflow: "hidden" }}>
              {/* Background animations */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 20}%`, fontSize: 40 + i * 10, filter: "blur(2px)", color: "#5A4FD6" }}
                  >
                    {["⚖️", "💰", "📜", "📈", "🏦", "🏛️"][i]}
                  </motion.div>
                ))}
              </div>

              <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>
                {getAllCourses().slice(0, 2).map((course, idx) => (
                  <CourseCard key={course.id} course={course} isRight={idx === 1} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <DetailView key="detail" course={selectedCourse} toggle={toggle} openModules={openModules} onBack={() => setLocation("/courses")} />
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailView({ course, toggle, openModules, onBack }: { course: any, toggle: (id: string) => void, openModules: Set<string>, onBack: () => void }) {
  const [, setLocation] = useLocation();
  const [showBrochureMenu, setShowBrochureMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{ paddingBottom: 80 }}
    >
      {/* Header / Breadcrumb */}
      <section style={{ padding: "40px 48px 24px", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFAF7" }}>
        <div>
          <button onClick={onBack} style={{ background: "transparent", border: "none", color: "#5A4FD6", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to All Courses
          </button>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 700, margin: 0 }}
          >
            {course.title}
          </motion.h1>
          <p style={{ color: "#5A576B", fontSize: 16, marginTop: 8 }}>{course.subtitle}</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {course.brochureUrl ? (
            <div style={{ position: "relative" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBrochureMenu(!showBrochureMenu)}
                style={{
                  padding: "12px 24px",
                  border: "1.5px solid #5A4FD6",
                  borderRadius: 12,
                  background: "#5A4FD6",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>📄 Brochure</span>
                <motion.span
                  animate={{ rotate: showBrochureMenu ? 180 : 0 }}
                  style={{ fontSize: 10, display: "inline-block" }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {showBrochureMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid #E0DCCE",
                      borderRadius: 12,
                      padding: "8px",
                      minWidth: 160,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                      zIndex: 50,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <button
                      onClick={() => {
                        window.open(course.brochureUrl, "_blank");
                        setShowBrochureMenu(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        background: "transparent",
                        border: "none",
                        borderRadius: 8,
                        textAlign: "left",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1C1A28",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#F0EDE6")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      👁️ View Online
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = course.brochureUrl;
                        link.download =
                          course.brochureUrl.split("/").pop() || "brochure.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        setShowBrochureMenu(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        background: "transparent",
                        border: "none",
                        borderRadius: 8,
                        textAlign: "left",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1C1A28",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#F0EDE6")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      ⬇️ Download PDF
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
              style={{ padding: "12px 24px", border: "1.5px solid #E0DCCE", borderRadius: 12, background: "transparent", color: "#9A97A8", fontWeight: 600, cursor: "not-allowed" }}
            >
              Brochure Coming Soon
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#3D34A5" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation(`/courses/${course.id}/path`)}
            style={{ padding: "12px 32px", border: "none", borderRadius: 12, background: "#5A4FD6", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            Start Learning Now →
          </motion.button>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #E0DCCE", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
        {[
          { icon: "📅", label: "Duration", val: course.duration },
          { icon: "⏱️", label: "Learning Hours", val: course.learningHours || "30 hrs" },
          { icon: "📚", label: "Modules", val: `${course.modules.length} Units` },
          { icon: "🔑", label: "Access", val: "Lifetime" },
          { icon: "🏆", label: "Certification", val: "SGT × LexFin" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
            style={{ flex: 1, padding: "32px 24px", borderRight: i < 4 ? "1px solid #E0DCCE" : "none", textAlign: "center" }}
          >
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              style={{ fontSize: 32, marginBottom: 12 }}
            >
              {stat.icon}
            </motion.div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#9A97A8", letterSpacing: ".1em" }}>{stat.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1A28", marginTop: 4 }}>{stat.val}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ maxWidth: 1200, margin: "48px auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 64 }}>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Audience Section */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginBottom: 32 }}>What's in it for you?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {AUDIENCE.map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(90,79,214,0.08)", borderColor: "#5A4FD6" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + 0.1 * i }}
                  style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 24, padding: "32px", transition: "all 0.3s ease" }}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{a.icon}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#1C1A28" }}>{a.title}</h4>
                  <p style={{ fontSize: 15, color: "#5A576B", lineHeight: 1.7 }}>{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Curriculum Section */}
          <section>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginBottom: 8 }}>Content Flow</h2>
              <p style={{ color: "#5A576B", fontSize: 16 }}>A structured journey from foundational concepts to advanced graduation projects.</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {course.modules.map((mod: any, i: number) => {
                const isOpen = openModules.has(`${course.id}-${mod.id}`);
                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + 0.05 * i }}
                    style={{ background: "#fff", border: "1.5px solid #E0DCCE", borderRadius: 20, overflow: "hidden", boxShadow: isOpen ? "0 10px 30px rgba(0,0,0,0.04)" : "none", transition: "all 0.3s ease" }}
                  >
                    <div
                      onClick={() => toggle(`${course.id}-${mod.id}`)}
                      style={{ padding: "24px 32px", cursor: "pointer", display: "flex", alignItems: "center", gap: 24 }}
                    >
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: isOpen ? "#5A4FD6" : "#F0EDE6", color: isOpen ? "#fff" : "#5A4FD6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, transition: "all 0.3s ease" }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1C1A28" }}>{mod.name}</h4>
                        <p style={{ fontSize: 14, color: "#9A97A8", margin: "4px 0 0" }}>{mod.sub || `Module ${i + 1} exploration`}</p>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} style={{ color: "#5A4FD6" }}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div style={{ padding: "0 32px 32px 96px", borderTop: "1px solid #F0EDE6", background: "#FCFCFA" }}>
                            {mod.topics?.map((topic: any, idx: number) => (
                              <div key={idx} style={{ marginTop: 24 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: "#5A4FD6", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 12 }}>{topic.head}</div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                  {topic.items.map((item: string) => (
                                    <div key={item} style={{ fontSize: 14, color: "#5A576B", padding: "6px 0", display: "flex", gap: 10, alignItems: "center" }}>
                                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5A4FD6", opacity: 0.3 }} />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </motion.div>

        {/* Sidebar / Quick Start */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          style={{ position: "sticky", top: 48, height: "fit-content" }}
        >
          <div style={{ background: "#1C1A28", borderRadius: 32, padding: "40px", color: "#fff", boxShadow: "0 20px 50px rgba(28,26,40,0.2)" }}>
            <div style={{ width: 50, height: 50, background: "#5A4FD6", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, marginBottom: 12 }}>Ready to lead?</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>Master the intersection of Law & Finance through immersive, case-study based learning.</p>
            
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
               {[ "Lifetime Access", "Expert Mentorship", "Joint Certification", "Live Masterclasses" ].map(item => (
                 <li key={item} style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
                   <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#5A4FD6" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                   {item}
                 </li>
               ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(90,79,214,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLocation(`/courses/${course.id}/path`)}
              style={{ width: "100%", padding: "18px", background: "#5A4FD6", border: "none", borderRadius: 16, color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 16, marginBottom: 16 }}
            >
              Enroll Now
            </motion.button>
            <p style={{ fontSize: 12, textAlign: "center", color: "rgba(255,255,255,0.4)", margin: 0 }}>Join 2,500+ professionals today</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CourseCard({ course, isRight }: { course: any, isRight: boolean }) {
  const [, setLocation] = useLocation();
  const [imgIdx, setImgIdx] = useState(0);
  
  const images = [
    `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800`,
    `https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIdx(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: isRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-[#FAFAF7] border-[1.5px] border-[#E0DCCE] rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "relative", height: 260, background: "#1C1A28", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.img 
            key={images[imgIdx]}
            src={images[imgIdx]}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}
          />
        </AnimatePresence>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", background: "linear-gradient(transparent, rgba(28,26,40,0.95))", zIndex: 1 }}>
           <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#C9933A", color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, marginBottom: 12 }}>★ Professional Course</div>
           <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>{course.title}</h3>
        </div>
      </div>

      <div style={{ padding: "40px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 15, color: "#5A576B", lineHeight: 1.7, marginBottom: 32 }}>{course.subtitle || course.description}</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          <div style={{ background: "#F0EDE6", padding: "16px", borderRadius: 16, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#9A97A8", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>Duration</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1C1A28" }}>{course.duration}</div>
          </div>
          <div style={{ background: "#F0EDE6", padding: "16px", borderRadius: 16, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#9A97A8", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>Content</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1C1A28" }}>{course.modules.length} Modules</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <motion.button
            whileHover={{ scale: 1.02, background: "#F0EDE6" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(`/courses/${course.id}`)}
            style={{ flex: 1, padding: "16px", border: "2px solid #5A4FD6", borderRadius: 16, color: "#5A4FD6", fontWeight: 800, cursor: "pointer", background: "transparent", fontSize: 15 }}
          >
            View Course
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, background: "#3D34A5" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(`/courses/${course.id}/path`)}
            style={{ flex: 1, padding: "16px", background: "#5A4FD6", border: "none", borderRadius: 16, color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 15 }}
          >
            Start Learning
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
