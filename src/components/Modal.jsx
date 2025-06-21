function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 2000,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.12)",
          minWidth: 320,
          maxWidth: 420,
          width: "90vw",
          padding: "2rem 1.5rem",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 18,
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            color: "#1976d2",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;