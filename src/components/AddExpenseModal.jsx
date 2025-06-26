import Modal from "./Modal";
import AddExpenseSection from "../sections/AddExpenseSection";

function AddExpenseModal({ open, onClose, onSuccess }) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddExpenseSection onSuccess={onSuccess} />
    </Modal>
  );
}

export default AddExpenseModal;