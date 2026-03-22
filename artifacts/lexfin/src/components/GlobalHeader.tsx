import { useLocation } from "wouter";

const LOGO_SVG = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="4" r="2" stroke="#fff" strokeWidth="1.5"/>
    <line x1="9" y1="6" x2="9" y2="9" stroke="#fff" strokeWidth="1.5"/>
    <line x1="3" y1="9" x2="15" y2="9" stroke="#fff" strokeWidth="1.5"/>
    <path d="M3 9L1 14H5Z" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    <path d="M15 9L13 14H17Z" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "E-Learning", href: "/courses" },
  { label: "Blogs", href: "/blogs" },
  { label: "Study Material", href: "/study-material" },
  { label: "Regulatory Alerts", href: "/regulatory-alerts" },
];

export function GlobalHeader() {
  const [location, setLocation] = useLocation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(240,237,230,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #E0DCCE",
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      <button
        onClick={() => setLocation("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          fontWeight: 600,
          fontSize: 18,
          color: "#1C1A28",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "#5A4FD6",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {LOGO_SVG}
        </div>
        LexFin
      </button>

      <nav className="lexfin-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {NAV_LINKS.map(link => {
          const isActive = location === link.href || (link.href !== "/" && location.startsWith(link.href));
          return (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              style={{
                fontSize: 14,
                color: isActive ? "#5A4FD6" : "#5A576B",
                background: isActive ? "#EAE8FB" : "transparent",
                fontWeight: isActive ? 500 : 400,
                border: "none",
                cursor: "pointer",
                padding: "7px 14px",
                borderRadius: 6,
                transition: "all .18s",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </button>
          );
        })}
      </nav>
      <style>{`
        @media (max-width: 640px) {
          .lexfin-nav { display: none !important; }
        }
      `}</style>

      <button
        style={{
          background: "#1C1A28",
          color: "#fff",
          border: "none",
          padding: "9px 20px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background .18s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#5A4FD6")}
        onMouseOut={e => (e.currentTarget.style.background = "#1C1A28")}
        onClick={() => window.location.href = "/api/auth/login"}
      >
        Log In
      </button>
    </header>
  );
}
