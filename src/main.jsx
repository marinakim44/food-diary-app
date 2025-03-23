import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ConfirmSignUp from "./pages/ConfirmSignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import UserProfile from "./pages/UserProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/confirm_signup",
    element: <ConfirmSignUp />,
  },
  {
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
  },
  {
    path: "/my_profile",
    element: <UserProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
