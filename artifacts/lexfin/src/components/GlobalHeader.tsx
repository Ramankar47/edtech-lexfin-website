import { useLocation } from "wouter";

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
        <img
          src={`${import.meta.env.BASE_URL}images/lexfin-logo.png`}
          alt="LexFin"
          style={{ 
            height: 60, 
            objectFit: "contain", 
            filter: "contrast(1.05)",
            transform: "scale(1.5)",
            transformOrigin: "left center",
            transition: "transform 0.25s ease-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.55)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
        />
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
        onClick={() => setLocation("/login-unavailable")}
      >
        Log In
      </button>
    </header>
  );
}
