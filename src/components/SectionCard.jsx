import Paper from "@mui/material/Paper";

function SectionCard({ children, sx = {}, ...props }) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        bgcolor: "#fff",
        boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.07)",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default SectionCard;