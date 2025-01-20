import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const UsersPage = lazy(() => import("../../pages/UsersPages/UsersPage"));
const BookingPage = lazy(() => import("../../pages/BookingPage/BookingPage"));

export default function App() {

  return (
    <Layout >
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage /> } />         
          <Route path="/bookings" element={<BookingPage/> } />
        </Routes>
      </Suspense>
    </Layout>
  );
}