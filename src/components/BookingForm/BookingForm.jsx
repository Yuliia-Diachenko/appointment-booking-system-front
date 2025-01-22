import { useDispatch } from 'react-redux';
import { useId } from "react";
import { createBooking } from '../../redux/bookings/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import css from './BookingForm.module.css';

const BookingForm = ({ userId, onClose }) => {
    const dispatch = useDispatch();

    const fieldId = useId();

    const initialValues = {
        date: '',
        status: 'scheduled',
    };

    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required'),
        status: Yup.string().oneOf(['scheduled', 'cancelled']).required('Status is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const resultAction = await dispatch(createBooking({
                client: userId,
                business: userId,  
                date: values.date,
                status: values.status,
            }));

            if (createBooking.fulfilled.match(resultAction)) {
                toast.success('Booking successfully created!');
                console.log('New booking:', resultAction.payload);
                onClose();
            } else {
                if (resultAction.payload) {
                    toast.error(`Failed to create booking: ${resultAction.payload}`);
                } else {
                    toast.error(resultAction.error.message);
                }
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={css.formContainer}>
                    <div className={css.inputBox}>
                        <label className={css.label} htmlFor={`${fieldId}-date`}>Date:</label>
                        <Field className={css.input} id={`${fieldId}-date`} type="date" name="date" />
                        <ErrorMessage name="date" component="div" className={css.error} />
                    </div>
                    <div className={css.inputBox}>
                        <label className={css.label} htmlFor={`${fieldId}-status`}>Status:</label>
                        <Field as="select"  id={`${fieldId}-status`} name="status" className={css.input}>
                            <option value="scheduled">Scheduled</option>
                            <option value="cancelled">Cancelled</option>
                        </Field>
                        <ErrorMessage name="status" component="div" className={css.error} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
        </>
    );
};

export default BookingForm;