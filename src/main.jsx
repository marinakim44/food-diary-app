import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ConfirmSignUp from "./pages/ConfirmSignUp.jsx";

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
    path: "/reset_password",
    element: <ResetPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
