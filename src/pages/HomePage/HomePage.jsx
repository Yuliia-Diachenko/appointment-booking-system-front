import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./HomePage.module.css";
import { GiNotebook } from "react-icons/gi";

export default function HomePage() {
    return (
      <div className={css.container}>
        <PageTitle>
        Welcome to the Booking System application.
        </PageTitle>
        <p>
        MeetMate is an application designed to facilitate the management of users and appointments. 
        It allows users to create, edit, delete, and view profiles. 
        There are two types of users: clients and businesses. Clients can view a list of business users and make appointments with them by specifying the date, time, and duration. Additionally, clients have the ability to manage their own appointments by cancelling or rescheduling them. This comprehensive functionality ensures that clients can easily connect with businesses and handle their appointments efficiently.
        </p>
        <GiNotebook className={css.image}/>
        </div>
    );
  }