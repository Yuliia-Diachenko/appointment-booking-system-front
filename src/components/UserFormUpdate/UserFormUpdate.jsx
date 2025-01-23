import { useDispatch } from "react-redux";
import { useId, useEffect, useState } from "react";
import { updateUser, getUserById, fetchVisiableUsers } from "../../redux/users/operations.js";
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './UserFormUpdate.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
        .email('Invalid email format'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    userType: Yup.string()
        .oneOf(['client', 'business'], 'Invalid user type'),
    bookings: Yup.string()
        .nullable()
        .matches(/^[0-9a-fA-F]{24}$/, 'Invalid booking reference')
});

export default function UserFormUpdate({ userId, onSuccess, onClose }) {
    const fieldId = useId();
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        password: "",
        userType: "",
        bookings: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await dispatch(getUserById(userId)).unwrap();
                    console.log("Response data:", response);   
                    toast.success('User successfully updated!');                 
                    setInitialValues({
                        name: response.data.name || '',
                        email: response.data.email || '',
                        password: response.data.password || "",
                        userType: response.data.userType || "",
                        bookings: response.data.bookings || "",
                    });
                    setLoading(false);

                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast.error('Failed to update user.');
                } 
            }
        };

        fetchUserData();
    }, [userId, dispatch]);

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(updateUser({
            _id: userId,
            name: values.name,
            email: values.email,
            password: values.password,
            userType: values.userType,
            bookings: values.bookings,
        })).then(() => {
            onSuccess();
            onClose();
        }).catch(error => {
            console.error("Error updating user:", error);
        }).finally(() => {
            setSubmitting(false);
            dispatch(fetchVisiableUsers()).unwrap();
        });
    };

    if (loading) {
        return <div className={css.blink}>Loading...</div>;
    }

    return (
        <><ToastContainer />
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={CreateSchema}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form className={css.formContainer}>
                    <h3 className={css.formHeader}>Update a user</h3>
                    <label htmlFor={`${fieldId}-name`} className={css.label}>Name</label>
                    <Field type="text" name="name" id={`${fieldId}-name`} className={css.input}></Field>
                    <ErrorMessage name="name" component="span" className={css.error}></ErrorMessage>

                    <label htmlFor={`${fieldId}-email`} className={css.label}>Email</label>
                    <Field type="email" name="email" id={`${fieldId}-email`} className={css.input}></Field>
                    <ErrorMessage name="email" component="span" className={css.error}></ErrorMessage>

                    <label htmlFor={`${fieldId}-password`} className={css.label}>Password</label>
                    <Field type="password" name="password" id={`${fieldId}-password`} className={css.input} disabled></Field>
                    <ErrorMessage name="ppassword" component="span" className={css.error}></ErrorMessage>

                    <label htmlFor={`${fieldId}-userType`} className={css.label}>User Type</label>
                    <Field as="select"  id={`${fieldId}-userType`} name="userType" className={css.input}>
                        <option value="client">Client</option>
                        <option value="business">Business</option>
                    </Field>
                    <ErrorMessage name="userType" component="span" className={css.error}></ErrorMessage>

                    <label htmlFor={`${fieldId}-bookings`} className={css.label}>Bookings</label>
                    <Field type="text" name="bookings" id={`${fieldId}-bookings`} className={css.input} />
                    <ErrorMessage name="bookings" component="span" className={css.error} />

                    <button type="submit" className={css.button} disabled={isSubmitting}>Update</button>
                </Form>
            )}
        </Formik>
        </>
    );
}