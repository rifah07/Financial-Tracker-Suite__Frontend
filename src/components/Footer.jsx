function Footer() {
  return (
    <footer
      style={{
        padding: "1rem 0",
        background: "#222",
        color: "#fff",
        textAlign: "center",
      }}
    >
      &copy; {new Date().getFullYear()}{" "}
      <a
        href="https://rifah-sajida-deya-portfolio.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#4fc3f7", textDecoration: "underline" }}
      >
        Rifah Sajida Deya
      </a>
    </footer>
  );
}

export default Footer;