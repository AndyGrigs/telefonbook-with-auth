import { useEffect, lazy, Suspense } from "react";
import { Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";
import Layout from "./components/Layout.jsx";


function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const HomePage = lazy(() => import("./pages/HomePage.jsx"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
  const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
  const ContactsPage = lazy(() => import("./pages/ContactsPage.jsx"));

  
  return (
     <Router>
      <Suspense fallback='loading...'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <RegisterPage />
                </RestrictedRoute>
              }
            /> */}
            {/* <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <LoginPage />
                </RestrictedRoute>
              }
            /> */}
            {/* <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            /> */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
