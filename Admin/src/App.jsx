import { Outlet } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { clearAdmin, setAdmin } from "./redux/slice/adminAuthSlice";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.adminAuth.admin);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        console.log("User Info:", response.data);
        console.log(response);
        if (response.data.success) {
          dispatch(setAdmin(response.data.message));
          // Assuming `message` = user object
        } else {
          dispatch(clearAdmin()); // properly reset auth
        }
      } catch (e) {
        console.log(e);
        dispatch(clearAdmin());
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [dispatch, userInfo]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {!!userInfo && <Navbar />}
      <div className="flex">
        {!!userInfo && <Sidebar />}
        <Outlet /> {/* renders Add-agent or other child routes */}
      </div>
    </>
  );
}

export default App;
