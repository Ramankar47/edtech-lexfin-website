import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";
import { ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const CATEGORY_META: Record<string, { label: string; icon: string; desc: string }> = {
  academicians: {
    label: "From Academicians",
    icon: "⚖️",
    desc: "Perspectives from faculty, professors, and legal experts affiliated with LexFin and SGT University.",
  },
  students: {
    label: "From Students",
    icon: "🎓",
    desc: "Reflections and learnings shared by our student community.",
  },
};

interface BlogEntry {
  id: number;
  name: string;
  designation: string;
  blog: string;
  photoUrl: string | null;
}

const AVATAR_COLORS = ["#5A4FD6", "#7C3AED", "#0284C7", "#059669", "#D97706", "#DB2777"];
function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Renders an avatar: photo if available, letter-initials fallback */
function Avatar({ name, photoUrl, size = 76 }: { name: string; photoUrl: string | null; size?: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const color = avatarColor(name);
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  const showInitials = !photoUrl || imgFailed;

  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0, overflow: "hidden",
        border: "3px solid rgba(255,255,255,.7)",
        boxShadow: "0 2px 10px rgba(0,0,0,.12)",
        background: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Always render img if photoUrl set; hide if error */}
      {photoUrl && (
        <img
          src={photoUrl}
          alt={name}
          onError={() => setImgFailed(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            position: "absolute", inset: 0,
            display: imgFailed ? "none" : "block",
          }}
        />
      )}

      {/* Initials shown when no photo or photo failed */}
      {showInitials && (
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontSize: size * 0.34, fontWeight: 700, color: "#fff",
          userSelect: "none", lineHeight: 1,
          position: "relative", zIndex: 1,
        }}>
          {initials}
        </span>
      )}

      {/* "No photo" placeholder overlay — shown only when photo is explicitly null */}
      {!photoUrl && (
        <svg
          viewBox="0 0 48 48"
          style={{ position: "absolute", inset: 0, width: "60%", height: "60%", margin: "auto", opacity: .25 }}
          fill="white"
        >
          <circle cx="24" cy="18" r="10" />
          <path d="M4 44c0-11.046 8.954-20 20-20s20 8.954 20 20" />
        </svg>
      )}
    </div>
  );
}

function BlogCard({ entry, index }: { entry: BlogEntry; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW_LEN = 420;
  const isLong = entry.blog.length > PREVIEW_LEN;
  const displayText = !expanded && isLong ? entry.blog.slice(0, PREVIEW_LEN) + "…" : entry.blog;

  return (
    <article
      style={{
        background: "#FAFAF7",
        border: "1.5px solid #E0DCCE",
        borderRadius: 20,
        padding: "36px 40px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        animation: `fadeInUp .4s ease ${index * 0.09}s both`,
      }}
    >
      {/* Watermark number */}
      <div style={{
        position: "absolute", top: 18, right: 26,
        fontFamily: "'Fraunces', serif", fontSize: 72, fontWeight: 700,
        color: "#F0EDE6", userSelect: "none", lineHeight: 1, pointerEvents: "none",
      }}>
        {String(entry.id).padStart(2, "0")}
      </div>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, position: "relative", zIndex: 1 }}>
        <Avatar name={entry.name} photoUrl={entry.photoUrl} size={76} />
        <div>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700,
            color: "#1C1A28", marginBottom: 8, lineHeight: 1.2,
          }}>
            {entry.name}
          </h2>
          {entry.designation && (
            <div style={{ display: "inline-flex", alignItems: "center", background: "#EAE8FB", borderRadius: 100, padding: "4px 14px" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#5A4FD6", letterSpacing: ".02em" }}>
                {entry.designation}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E0DCCE", marginBottom: 22 }} />

      {/* Blog content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontSize: 52, lineHeight: .5,
          color: "#EAE8FB", marginBottom: 10, userSelect: "none",
        }}>"</div>
        <p style={{ fontSize: 14.5, color: "#3A3748", lineHeight: 1.88, whiteSpace: "pre-wrap", margin: 0 }}>
          {displayText}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              marginTop: 14, fontSize: 13, color: "#5A4FD6", background: "none",
              border: "none", cursor: "pointer", fontWeight: 600, padding: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {expanded ? "Show less ↑" : "Read more →"}
          </button>
        )}
      </div>
    </article>
  );
}

export default function BlogListPage() {
  const params = useParams<{ category: string }>();
  const [, setLocation] = useLocation();
  const category = params.category || "";
  const meta = CATEGORY_META[category];

  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/blogs/${category}`, { credentials: "include" })
      .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
      .then(data => {
        setEntries(data.entries || []);
        setLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setLoading(false);
      });
  }, [category]);

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDE6", fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalHeader />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 32px 100px" }}>
        {/* Back */}
        <button
          onClick={() => setLocation("/blogs")}
          style={{
            display: "flex", alignItems: "center", gap: 7, fontSize: 13,
            color: "#9A97A8", background: "none", border: "none", cursor: "pointer",
            marginBottom: 36, padding: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}
        >
          <ArrowLeft size={15} />
          Back to Blogs
        </button>

        {/* Hero */}
        <div style={{ marginBottom: 52 }}>
          <div style={{
            width: 52, height: 52, background: "#EAE8FB", borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, marginBottom: 18,
          }}>
            {meta?.icon || "📝"}
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12,
            fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
            color: "#5A4FD6", marginBottom: 14,
          }}>
            <span style={{ display: "block", width: 20, height: 2, background: "#5A4FD6", borderRadius: 2 }} />
            Blogs
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700,
            letterSpacing: "-.02em", color: "#1C1A28", marginBottom: 12, lineHeight: 1.1,
          }}>
            {meta?.label || category}
          </h1>
          {meta?.desc && (
            <p style={{ fontSize: 15, color: "#5A576B", lineHeight: 1.7, maxWidth: 520 }}>
              {meta.desc}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9A97A8", fontSize: 15 }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>📖</div>
            Loading blogs…
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 14,
            padding: "20px 24px", color: "#B91C1C", fontSize: 14,
          }}>
            Failed to load blogs: {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && entries.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: "#1C1A28", marginBottom: 8 }}>
              No entries yet
            </h3>
            <p style={{ color: "#9A97A8", fontSize: 14 }}>
              Add rows to the xlsx file in{" "}
              <code style={{ fontSize: 12, background: "#ECEAF4", padding: "2px 6px", borderRadius: 4 }}>
                content/blogs/
              </code>{" "}
              to populate this page.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && entries.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {entries.map((entry, i) => (
              <BlogCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
