import css from './Booking.module.css';

const BookingItem = ({ booking }) => {
    return (
        <li className={css.item}>
            <p>Client: {booking.client}</p>
            <p>Business: {booking.business}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
        </li>
    );
};

export default BookingItem;