import Footer from "./components/Footer";

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
      <Footer />
    </div>
  );
}

export default App;
