import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../redux/bookings/operations';
import { selectBookings, selectLoading, selectError } from '../../redux/bookings/selectors';
import Booking from '../../components/Booking/Booking';
import Loader from '../../components/Loader/Loader';
import css from './BookingPage.module.css';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

const BookingPage = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(selectBookings);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleClickBooking = (booking) => {
        setBookingId(booking);  
        console.log('booking Id:', bookingId);  
   };

    return (
        <div className={css.container}>
            <h1>Bookings</h1>
            <ModalWindow bookingId={bookingId}/>
            {isLoading && <Loader />}
            {error && <p className={css.error}>Failed to load bookings.</p>}
            <ul className={css.list}>
                {bookings.data?.map((booking) => (
                    <li key={booking._id}>
                        <button onClick={() => handleClickBooking(booking._id)} className={css.button}>
                            <Booking booking={booking} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingPage;