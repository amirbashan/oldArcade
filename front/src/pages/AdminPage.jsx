import React, { useContext } from "react";
import AdminNav from "../components/AdminNav";
import { AppContext } from "../Context/AppContext";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminPage() {
  const { isAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  if (!isAdmin) navigate(`/`);
  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  );
}
