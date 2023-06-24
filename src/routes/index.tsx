import { Route, Routes } from "react-router-dom";
import { Login } from "../page/Login";
import { Register } from "../page/Register";
import { Dashboard } from "../page/Dashboard";
import { Schedules } from "../page/Schedules";
import { PrivateRoute } from "./PrivateRoutes";
import { EditProfile } from "../page/EditProfile";

export const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/schedules"
        element={
          <PrivateRoute>
            <Schedules />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/editprofile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};
