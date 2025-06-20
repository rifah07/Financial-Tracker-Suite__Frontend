function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header
        style={{
          padding: "2rem 0",
          background: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <h1>Financial Tracker Suite</h1>
        <p>Welcome to your personal finance dashboard!</p>
      </header>
      <main style={{ flex: 1, padding: "2rem", textAlign: "center" }}>
        <h2>Home</h2>
        <p>
          Track your expenses, manage your budget, and gain financial insights.
        </p>
      </main>
      <footer
        style={{
          padding: "1rem 0",
          background: "#222",
          color: "#fff",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} Rifah Sajida Deya
      </footer>
    </div>
  );
}

export default App;
