import { useLocation } from "wouter";
import { GlobalHeader } from "@/components/GlobalHeader";

export default function LoginUnavailablePage() {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0EDE6",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GlobalHeader />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "#EAE8FB",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
            fontSize: 36,
          }}
        >
          🔐
        </div>

        {/* Label */}
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
          Authentication
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-.02em",
            color: "#1C1A28",
            marginBottom: 14,
            lineHeight: 1.1,
          }}
        >
          Login is{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "#5A4FD6" }}>
            Not Yet Available
          </em>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#5A576B",
            lineHeight: 1.7,
            maxWidth: 460,
            marginBottom: 36,
          }}
        >
          We're working on setting up secure authentication for LexFin. Come back
          soon — the full login experience will be ready shortly.
        </p>

        {/* Info box */}
        <div
          style={{
            background: "#FAFAF7",
            border: "1px solid #E0DCCE",
            borderRadius: 14,
            padding: "20px 28px",
            maxWidth: 420,
            marginBottom: 36,
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: 13.5, color: "#5A576B", lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: "#1C1A28" }}>In the meantime</strong> — you
            can still browse all our courses, read regulatory alerts, and explore
            the learning path without an account.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => setLocation("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#5A4FD6",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background .2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#3D34A5")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#5A4FD6")}
          >
            ← Go Back Home
          </button>

          <button
            onClick={() => setLocation("/courses")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "transparent",
              color: "#5A4FD6",
              border: "1.5px solid #5A4FD6",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background .2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#EAE8FB")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Browse Courses
          </button>
        </div>
      </main>
    </div>
  );
}
