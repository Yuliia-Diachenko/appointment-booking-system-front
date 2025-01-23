import css from "./UserFormCreate.module.css";
import { useDispatch } from "react-redux";
import { useId } from "react";
import { addUser, fetchVisiableUsers } from "../../redux/users/operations.js";
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    userType: Yup.string()
        .required('User type is required')
        .oneOf(['client', 'business'], 'Invalid user type'),
    bookings: Yup.string()
        .nullable()
        .matches(/^[0-9a-fA-F]{24}$/, 'Invalid booking reference')
});

export default function UserFormCreate({ onClose }) {

    const fieldId = useId();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Submitting values:", values);

        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            userType: values.userType,
            bookings: values.bookings,
        };

        console.log("Submitting user data:", userData);

        try {
            const response = await dispatch(addUser(userData)).unwrap();
            console.log("Response:", response);
            toast.success('User successfully created!');
            resetForm();
            await dispatch(fetchVisiableUsers()); // Отримання оновленого списку користувачів
            onClose(); // Закриваємо форму після успішного додавання
        } catch (error) {
            console.error("Error adding user:", error.response ? error.response.data : error.message);
            toast.error('Failed to create user.');
        } finally {
            setSubmitting(false);
            
        }
    };

    return (
        <>
            <ToastContainer />
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    userType: "",
                    bookings: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={CreateSchema}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className={css.formContainer}>
                        <h3 className={css.formHeader}>Create a user</h3>
                        <label htmlFor={`${fieldId}-name`} className={css.label}>Name</label>
                        <Field type="text" name="name" id={`${fieldId}-name`} className={css.input} />
                        <ErrorMessage name="name" component="span" className={css.error} />

                        <label htmlFor={`${fieldId}-email`} className={css.label}>Email</label>
                        <Field type="email" name="email" id={`${fieldId}-email`} className={css.input} />
                        <ErrorMessage name="email" component="span" className={css.error} />

                        <label htmlFor={`${fieldId}-password`} className={css.label}>Password</label>
                        <Field type="password" name="password" id={`${fieldId}-password`} className={css.input} />
                        <ErrorMessage name="password" component="span" className={css.error} />

                        <label htmlFor={`${fieldId}-userType`} className={css.label}>User Type</label>
                        <Field as="select" id={`${fieldId}-userType`} name="userType" className={css.input}>
                            <option value="">Select user type</option>
                            <option value="client">Client</option>
                            <option value="business">Business</option>
                        </Field>
                        <ErrorMessage name="userType" component="span" className={css.error}></ErrorMessage>

                        <label htmlFor={`${fieldId}-bookings`} className={css.label}>Bookings</label>
                        <Field type="text" name="bookings" id={`${fieldId}-bookings`} className={css.input} />
                        <ErrorMessage name="bookings" component="span" className={css.error} />

                        <button type="submit" className={css.button} disabled={isSubmitting}>Create</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}