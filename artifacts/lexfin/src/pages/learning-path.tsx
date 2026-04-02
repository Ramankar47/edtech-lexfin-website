import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";
import { getCourseById } from "@/data";
import { ModuleData } from "@/data/types";

export default function LearningPathPage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/courses/:courseId/path");
  const courseId = params?.courseId || "1";
  
  const course = getCourseById(courseId);

  const [openPanel, setOpenPanel] = useState<number | null>(1);
  const [lockVisible, setLockVisible] = useState<number | null>(null);

  useEffect(() => {
    // scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (!match || !course) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <h2>Course Not Found</h2>
        <button onClick={() => setLocation("/courses")}>Back to Courses</button>
      </div>
    );
  }

  // Determine active status for each module
  const checkStatus = (modId: number) => {
    if (modId === 1) return "active";
    // Check if the PREVIOUS module is passed
    const prevModId = modId - 1;
    let passed = false;
    if (typeof window !== "undefined") {
      passed = localStorage.getItem(`Course${course.id}_mod${prevModId}_passed`) === "true";
      if (!passed && course.id === "1") {
         // fallback for legacy keys
         passed = localStorage.getItem(`mod${prevModId}_passed`) === "true";
      }
    }
    return passed ? "active" : "locked";
  };

  const handleNodeClick = (mod: ModuleData, status: string) => {
    if (status === "active") {
      setOpenPanel(openPanel === mod.id ? null : mod.id);
    } else {
      setLockVisible(lockVisible === mod.id ? null : mod.id);
    }
  };

  let activeModulesCount = 1;

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif", color: "#1C1A28" }}>
      <GlobalHeader />

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "60px 48px 48px" }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 12 }}>
          Your <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Learning Path</em>
        </h1>
        <p style={{ fontSize: 15, color: "#5A576B", lineHeight: 1.65, maxWidth: 420, margin: "0 auto 24px" }}>
          Complete each module to unlock the next. Multi-disciplinary mastery step by step.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 100, padding: "8px 20px" }}>
          <div style={{ width: 160, height: 6, background: "#E0DCCE", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "16.6%", background: "#5A4FD6", borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 12, color: "#5A576B", fontWeight: 500 }}>Active Modules</span>
        </div>
      </section>

      {/* PATH CONTAINER */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 80px", position: "relative" }}>

        {/* COURSE BANNER */}
        <div style={{ background: "#5A4FD6", borderRadius: 12, padding: "14px 22px", display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "rgba(255,255,255,.65)", marginBottom: 2 }}>Course</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{course.title}</div>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{course.modules.length} Modules · {course.learningHours}</div>
        </div>

        {/* MODULES */}
        {course.modules.map((mod, idx) => {
          const status = checkStatus(mod.id);
          const isActive = status === "active";
          if (isActive) activeModulesCount++;
          const isLocked = status === "locked";
          const isPanelOpen = openPanel === mod.id;
          const isLockShown = lockVisible === mod.id;

          return (
            <div key={mod.id}>
              {/* Connector */}
              <div style={{ width: 2, height: 48, margin: "0 auto", background: isLocked ? "transparent" : "#5A4FD6", backgroundImage: isLocked ? "repeating-linear-gradient(to bottom, #C8C5D8 0, #C8C5D8 6px, transparent 6px, transparent 12px)" : "none" }} />

              {/* START pill */}
              {idx === 0 && (
                <>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
                    <span style={{ background: "#5A4FD6", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "6px 20px", borderRadius: 100 }}>START!</span>
                  </div>
                  <div style={{ width: 2, height: 20, margin: "0 auto", backgroundImage: "repeating-linear-gradient(to bottom, #5A4FD6 0, #5A4FD6 4px, transparent 4px, transparent 10px)" }} />
                </>
              )}

              {/* MODULE NODE */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>
                <div
                  onClick={() => handleNodeClick(mod, status)}
                  style={{
                    width: 80, height: 80, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 32, cursor: isLocked ? "not-allowed" : "pointer",
                    background: isLocked ? "#ECEAF4" : "#5A4FD6",
                    border: `3px solid ${isLocked ? "#C8C5D8" : "#3D34A5"}`,
                    boxShadow: isActive ? "0 4px 24px rgba(90,79,214,.4)" : isLocked ? "none" : "0 4px 20px rgba(90,79,214,.35)",
                    transition: "transform .2s, box-shadow .2s",
                    animation: isActive ? "lpulse 2.5s ease-in-out infinite" : "none",
                  }}
                >
                  {isLocked ? (
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C8C5D8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  ) : (
                    <span>{mod.emoji}</span>
                  )}
                </div>

                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3, color: isLocked ? "#C8C5D8" : "#5A4FD6" }}>{mod.unit}</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, lineHeight: 1.2, color: isLocked ? "#C8C5D8" : "#1C1A28" }}>{mod.name}</div>
                  <div style={{ fontSize: 12, marginTop: 2, color: isLocked ? "#C8C5D8" : "#9A97A8" }}>{mod.sub}</div>
                </div>

                {/* LOCK MSG */}
                {isLocked && isLockShown && (
                  <div style={{ width: "100%", background: "#ECEAF4", border: "1px dashed #C8C5D8", borderRadius: 14, padding: "18px 22px", marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C8C5D8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <p style={{ fontSize: 13, color: "#C8C5D8" }} dangerouslySetInnerHTML={{ __html: mod.unlockMsg.replace(/Module \d+/, m => `<strong>${m}</strong>`) }} />
                  </div>
                )}

                {/* EXPANDED PANEL */}
                {isActive && (
                  <div style={{ width: "100%", background: "#FAFAF7", border: "1px solid #E0DCCE", borderRadius: 14, overflow: "hidden", marginTop: 16, maxHeight: isPanelOpen ? 800 : 0, opacity: isPanelOpen ? 1 : 0, transition: "max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s" }}>
                    <div style={{ padding: "18px 22px", borderBottom: "1px solid #E0DCCE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 7, background: "#EAE8FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#5A4FD6" }}>0{mod.id}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1A28" }}>{mod.name}</div>
                          <div style={{ fontSize: 12, color: "#9A97A8" }}>{mod.sub}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setLocation(`/courses/${course.id}/module/${mod.id}/learn`)}
                        style={{ padding: "8px 18px", background: "#5A4FD6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}
                      >
                        Start Module →
                      </button>
                    </div>
                    <div style={{ padding: "16px 22px" }}>
                      {mod.topics?.map(sec => (
                        <div key={sec.head} style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "#9A97A8", marginBottom: 6 }}>{sec.head}</div>
                          {sec.items.map(item => (
                            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#5A576B", lineHeight: 1.6, padding: "3px 0" }}>
                              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#5A4FD6", marginTop: 7, flexShrink: 0 }} />
                              {item}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: "14px 22px", borderTop: "1px solid #E0DCCE", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 16 }}>
                        {[["⏱", mod.hrs], ["📖", `${mod.sections} sections`]].map(([icon, label]) => (
                          <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#9A97A8" }}>{icon} {label}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Dashed connector to completion */}
        <div style={{ width: 2, height: 48, margin: "0 auto", backgroundImage: "repeating-linear-gradient(to bottom, #C8C5D8 0, #C8C5D8 6px, transparent 6px, transparent 12px)" }} />

        {/* COMPLETION */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 0 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E2F3EE", border: "2.5px solid #2A8C72", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, opacity: .45 }}>🎓</div>
          <div style={{ textAlign: "center" }}>
            <strong style={{ fontSize: 14, color: "#C8C5D8", display: "block" }}>{course.certificateStr}</strong>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lpulse {
          0%,100% { box-shadow: 0 4px 24px rgba(90,79,214,.4), 0 0 0 0 rgba(90,79,214,.25); }
          50% { box-shadow: 0 4px 24px rgba(90,79,214,.4), 0 0 0 12px rgba(90,79,214,0); }
        }
      `}</style>
    </div>
  );
}
