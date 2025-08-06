// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/authOperations";
import { selectIsRefreshing } from "./redux/auth/authSelectors";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactsPage";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <LoadingSpinner />
  ) : (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <RegisterPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;export default App;
