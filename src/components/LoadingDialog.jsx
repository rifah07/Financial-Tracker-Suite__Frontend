import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function LoadingDialog({ open }) {
  return (
    <Dialog open={open}>
      <DialogContent
        sx={{ display: "flex", alignItems: "center", gap: 2, p: 4 }}
      >
        <CircularProgress size={24} />
        <Typography>Loading...</Typography>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;