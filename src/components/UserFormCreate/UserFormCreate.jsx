import css from "./UserFormCreate.module.css";
import { useDispatch } from "react-redux";
import { useId } from "react";
import { addUser } from "../../redux/users/operations.js";
import { Formik, Form, Field } from 'formik';
import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

export default function UserFormCreate() {

    const fieldId = useId();
    const dispatch = useDispatch();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Submitting values:", values);

        // const toArray = (input) => {
        //     if (Array.isArray(input)) return input; 
        //     if (typeof input === 'string' && input.trim()) return input.split(',').map(item => item.trim()); 
        //     return []; 
        // };

        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            userType: values.userType,
            bookings: values.bookings,
        };

        console.log("Submitting user data:",userData);

        const response = await dispatch(addUser(userData)).unwrap();

            try  {
                console.log("Response:", response);               
                resetForm();              
            }
            catch(error) {
                console.error("Error adding person:", error.response ? error.response.data : error.message);
            }
            finally  {
                setSubmitting(false);
            };
    };

    return (
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
                    <Field type="text" name="userType" id={`${fieldId}-userType`} className={css.input} />
                    <ErrorMessage name="userType" component="span" className={css.error} />

                    <label htmlFor={`${fieldId}-bookings`} className={css.label}>Bookings</label>
                    <Field type="text" name="bookings" id={`${fieldId}-bookings`} className={css.input} />
                    <ErrorMessage name="bookings" component="span" className={css.error} />

                    <button type="submit" className={css.button} disabled={isSubmitting}>Create</button>
                </Form>
            )}
        </Formik>
    );
};
