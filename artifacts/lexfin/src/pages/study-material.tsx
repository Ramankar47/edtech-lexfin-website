import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalHeader } from "@/components/GlobalHeader";

export default function StudyMaterialPage() {
  const materials = [
    { icon: "📄", title: "Module PDFs", desc: "Downloadable reading materials for all 6 modules.", category: "ModulePDFs" },
    { icon: "📊", title: "Case Study Worksheets", desc: "Practical worksheets aligned with each module.", category: "CaseStudyWorksheets" },
    { icon: "⚖️", title: "Landmark Judgments", desc: "Key case laws on banking fraud, insurance disputes, and tax evasion.", category: "LandmarkJudgements" },
    { icon: "📋", title: "Compliance Checklists", desc: "Personal legal compliance checklists for ITR, GST, loans, and more.", category: "ComplianceChecklists" },
    { icon: "🎥", title: "Video Lectures", desc: "Recorded masterclasses from legal and finance experts.", category: "VideoLectures" },
    { icon: "📖", title: "Glossary", desc: "A comprehensive glossary of financial and legal terms.", category: "Glossary" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<any[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);

  const openContentModal = async (category: string, title: string) => {
    if (!category) return;
    setModalCategory(category);
    setModalTitle(title);
    setModalContent([]);
    setModalOpen(true);
    setLoadingContent(true);
    try {
      const url = `/api/content/studymaterial/${category}`;
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

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
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

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#5A4FD6", marginBottom: 20 }}>
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Resources
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 16 }}>
            Study <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>Material</em>
          </h1>
          <p style={{ fontSize: 16, color: "#5A576B", lineHeight: 1.65, maxWidth: 500, margin: "0 auto" }}>
            All the resources you need to master Indian Financial & Legal Literacy.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {materials.map(m => (
            <div 
              key={m.title} 
              style={{ 
                background: "#FAFAF7", 
                border: "1px solid #E0DCCE", 
                borderRadius: 16, 
                padding: "28px 24px",
                cursor: m.category ? "pointer" : "default",
                transition: "transform 0.2s, boxShadow 0.2s"
              }}
              onClick={() => m.category && openContentModal(m.category, m.title)}
              onMouseOver={(e) => {
                if (m.category) {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                }
              }}
              onMouseOut={(e) => {
                if (m.category) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{m.icon}</div>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: "#1C1A28", marginBottom: 8 }}>{m.title}</h3>
              <p style={{ fontSize: 13, color: "#5A576B", lineHeight: 1.6 }}>{m.desc}</p>
              
              {m.category ? (
                <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5A4FD6", fontWeight: 600 }}>
                  Open material →
                </div>
              ) : (
                <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9A97A8", fontWeight: 500 }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  Coming soon
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
