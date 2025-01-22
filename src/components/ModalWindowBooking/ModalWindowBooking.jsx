import css from './ModalWindowBooking.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import BookingForm from '../BookingForm/BookingForm.jsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #454343',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

const ModalWindowBooking = ({ userId, onClose }) => {
    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={style}>
                <div className={css.modalHeader}>
                    <h2>Booking Form</h2>
                    <IoMdClose onClick={onClose} />
                </div>
                <BookingForm userId={userId} onClose={onClose} />
            </Box>
        </Modal>
    );
};

export default ModalWindowBooking;