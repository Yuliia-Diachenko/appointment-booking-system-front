import css from "./User.module.css";
import { useState } from "react";
import ModalWindowBooking from "../ModalWindowBooking/ModalWindowBooking.jsx";

 const User = ({user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleOpenModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    if (!user) {
        return <div className={css.user}>No user data available</div>;
    }

    console.log('Rendering user in User component:', user);
    return (
        <div className={css.user}>          
            <h3>{user?.name}</h3>
            <p>Email: <span>{user?.email}</span></p>
            <p>Type: <span>{Array.isArray(user.userType) ? user.userType.join(', ') : user.userType || ''}</span></p>
            <p>Bookings: <span>{Array.isArray(user.bookings) ? user.bookings.join(', ') : user.bookings || ''}</span></p> 
            <button className={css.bookingBtn} onClick={() => handleOpenModal(user._id)}>Add Booking</button>
            {isModalOpen && (
                <ModalWindowBooking userId={selectedUserId} onClose={handleCloseModal} />
            )}
        </div>
    );
}
export default User;