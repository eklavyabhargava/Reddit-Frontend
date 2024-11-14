import { useLocation, useNavigate } from "react-router-dom";
import { sidebars } from "./Header";

const Sidebar = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="desktop:flex flex-col hidden w-full pt-4 px-4 z-[9999]">
      {sidebars.map((sidebar) => (
        <button
          key={sidebar.path}
          className="flex flex-row gap-x-2 items-center p-3 rounded-md hover:bg-gray-800"
          style={
            pathname === sidebar.path ? { backgroundColor: "#4b5563" } : {}
          }
          onClick={() => navigate(sidebar.path)}
        >
          {sidebar.btn}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
