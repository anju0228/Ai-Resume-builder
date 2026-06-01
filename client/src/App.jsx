import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { useDispatch } from "react-redux";
import { setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import api from "./config/api";
import { loginStart } from "./app/features/authSlice";
const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
headers: { Authorization: `Bearer ${token}` }        });
        if (data.user) {
          dispatch(loginStart({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view/:resumeId" element={<Preview />} />

        {/* Protected / App Routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
