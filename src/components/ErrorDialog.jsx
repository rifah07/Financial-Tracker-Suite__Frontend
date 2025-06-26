import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";

function ErrorDialog({ error, onClose }) {
  return (
    <Dialog open={!!error} onClose={onClose}>
      <DialogContent>
        <Alert severity="error" onClose={onClose}>
          {error}
        </Alert>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorDialog;