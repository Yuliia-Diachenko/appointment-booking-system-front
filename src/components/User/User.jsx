import css from "./User.module.css";

 const User = ({user}) => {
    console.log('Rendering user in User component:', user);
    return (
        <div className={css.user}>          
            <h3>{user?.name}</h3>
            <p>Email: <span>{user?.email}</span></p>
            <p>Type: <span>{user.userType?.join(', ') || ''}</span></p>
            <p>Bookings: <span>{user.bookings?.join(', ') || ''}</span></p>        
        </div>
    )
}
export default User;