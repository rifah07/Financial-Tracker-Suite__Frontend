import Modal from "./Modal";
import AddIncomeSection from "../sections/AddIncomeSection";

function AddIncomeModal({ open, onClose, onSuccess }) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddIncomeSection onSuccess={onSuccess} />
    </Modal>
  );
}

export default AddIncomeModal;
