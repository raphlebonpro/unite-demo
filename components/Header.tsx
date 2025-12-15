import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#FFFFFF",
        borderBottom: "1px solid #EEE",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 0.3,
              color: "#FF6C4A", // couleur Unite
            }}
          >
            Unite
          </span>
        </Link>

        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Démo
        </span>
      </div>
    </header>
  );
}
