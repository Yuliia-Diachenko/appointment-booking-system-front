import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../redux/bookings/operations';
import { selectBookings, selectLoading, selectError } from '../../redux/bookings/selectors';
import Booking from '../../components/Booking/Booking';
import Loader from '../../components/Loader/Loader';
import css from './BookingPage.module.css';

const BookingPage = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(selectBookings);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    return (
        <div className={css.container}>
            <h1>Bookings</h1>
            {isLoading && <Loader />}
            {error && <p className={css.error}>Failed to load bookings.</p>}
            <ul className={css.list}>
                {bookings.data.map(booking => (
                    <Booking key={booking._id} booking={booking} />
                ))}
            </ul>
        </div>
    );
};

export default BookingPage;