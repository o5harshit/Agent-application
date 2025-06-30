import { Button } from "@/Components/ui/button";
import { apiClient } from "@/lib/api-client";
import { clearAdmin } from "@/redux/slice/adminAuthSlice";
import { LOGOUT_USER } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminAuth.admin);

  const handleAdminLogout = async() => {
     const response = await apiClient.get(LOGOUT_USER,{ withCredentials: true });
        if(response.data.success){
          dispatch(clearAdmin());
          toast.success("User has been Logout");
          navigate("/login");
        } else{
          toast.error("You are not been logout!Try Again");
        }
  };

  console.log(admin);

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">

      <div
        className="text-xl md:text-2xl font-bold text-purple-700 cursor-pointer"
      >
        Admin-Panel
      </div>
      <div>
        
        {admin && (
        <Button
          onClick={handleAdminLogout}
          className=" cursor-pointer bg-red-500 hover:bg-red-600 text-white"
        >
          Admin Logout
        </Button>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
