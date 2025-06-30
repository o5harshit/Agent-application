import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-[18%] h-screen border-r border-gray-300 flex flex-col pt-10 gap-3">
      {/* Add Agent */}
      <NavLink
        to="/add-agent"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        Add Agent
      </NavLink>
      {/* Upload CSV */}
      <NavLink
        to="/upload-csv"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        Upload CSV
      </NavLink>
      <NavLink
        to="/Leads-Board"
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium rounded-r-md border-l-4 transition-all ${
            isActive
              ? "bg-[#fff0ed] border-[tomato] text-[tomato]"
              : "hover:bg-gray-100 border-transparent"
          }`
        }
      >
        LeadBoards
      </NavLink>
    </div>
  );
}
