import css from "./UsersList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisiableUsers } from "../../redux/users/operations.js";
import { selectLoading, selectError, selectVisiableUsers } from '../../redux/users/selectors.js';
import User from "../User/User.jsx";
import ModalWindow from "../ModalWindow/ModalWindow.jsx"
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from "../Loader/Loader";

export default function UsersList() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError); 
    const users = useSelector(selectVisiableUsers) || [];
    const [userId, setUserId] = useState('');

console.log('Users in UsersList component:', users);

    const [page, setPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        console.log('Fetching users with page:', page, 'perPage:', perPage);
        dispatch(fetchVisiableUsers({page, perPage}));
      }, [dispatch, page, perPage]);

      const handleClick = () => {
        setPage(page => page + 1);
        return
      } 
      const handleClickUser = (user) => {
        setUserId(user);  
        console.log('user Id:', user);  
   };
    return (
        <>       
      <>
      <ModalWindow userId={userId} />
      {users.data && users.data.length > 0 ? (
      <ul className={css.list}>
        {isLoading && !error && <Loader />}
        {users.data.map((user) => (
          <li key={user._id}>
            <button onClick={()=>{handleClickUser(user._id)}} className={css.button}><User user={user} /></button>
          </li>
        ))}
      </ul>
    ) : (
      <p>Something went wrong...</p>
    )}
    </>
      <LoadMoreBtn onClick={handleClick}/>
      </>
    )
}