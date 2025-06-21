import HeroSection from "./sections/HeroSection";
import DashboardSection from "./sections/DashboardSection";
import Footer from "./components/Footer";
import RegisterSection from "./sections/RegisterSection";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7fafc",
      }}
    >
      <HeroSection />
      <main
        style={{
          flex: 1,
          padding: "2.5rem 1rem",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <DashboardSection />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;