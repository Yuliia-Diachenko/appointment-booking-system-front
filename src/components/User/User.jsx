import css from "./User.module.css";

 const User = ({user}) => {
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
            <button className={css.bookingBtn}>Add Booking</button>       
        </div>
    );
}
export default User;