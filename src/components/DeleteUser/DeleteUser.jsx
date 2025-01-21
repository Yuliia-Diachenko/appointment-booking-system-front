import { useDispatch } from "react-redux";
import { deleteUser, fetchVisiableUsers } from "../../redux/users/operations.js";
import css from './DeleteUser.module.css';

export default function DeleteUser({ userId, onStart, onSuccess, onClose }) {   

    const dispatch = useDispatch();
    const handleDelete = async () => {
        onStart();
        try {
            await dispatch(deleteUser(userId)).unwrap();
            await dispatch(fetchVisiableUsers()).unwrap();
            onSuccess();
        } catch (error) {
            console.error("Error deleting person:", error);
        }
    };


    console.log('User Id:', userId);

    return (
        <div className={css.container}>
        <h2> WARNING!</h2>
        <h3>Are you sure you want to delete this person?</h3>
        <div className={css.buttonContainer}>
            <button className={css.button} onClick={handleDelete}>Yes</button>  
            <button onClick={onClose} className={css.button}>No</button>          
        </div>
        </div>
    )
}