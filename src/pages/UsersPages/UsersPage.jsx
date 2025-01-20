import css from "./UsersPage.module.css";
import UsersList from "../../components/UsersList/UsersList.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchVisiableUsers } from "../../redux/users/operations";

export default function UsersPage() {
  
    const dispatch = useDispatch();
    // const users = useSelector(selectUsers);
    useEffect(() => {
        dispatch(fetchVisiableUsers());
      }, [dispatch]);
return (
    <div className={css.container}>
    <h1>Users Page</h1>
    <UsersList />
    </div>
)
}