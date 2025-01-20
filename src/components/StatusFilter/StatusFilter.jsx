import css from "./StatusFilter.module.css";
import { useSelector } from "react-redux";


export const StatusFilter = () => {

    const filter = useSelector(state => state.filters.status);
  
    return (
        <div className={css.container}>
            <button>Client {filter === "client" && "is active"}</button>
            <button>Business {filter === "busness" && "is active"}</button>
            <button>All {filter === "all" && "is active"}</button>
        </div>
    );
  };