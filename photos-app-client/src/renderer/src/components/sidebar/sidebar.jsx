import SidebarButton from "../Buttons/SideBar/SideBarButton";
import UploadButton from "../Buttons/Upload/uploadButton";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { RiPaintFill } from "react-icons/ri";
import { BiCrop } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs"; // ✅ Icon for chat
import "./sidebar.css";

function Sidebar() {
  const handleUpload = (file) => {
    const reader = new FileReader();

    reader.onload = function () {
      const arrayBuffer = reader.result;

      const userHome = window.electronAPI.getHomeDir();
      const saveDir = `${userHome}/EditlyImages`;
      const filePath = `${saveDir}/${file.name}`;

      window.electronAPI.mkdir(saveDir);
      window.electronAPI.saveImage(filePath, arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2 className="logo-title">Editly</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <UploadButton onUpload={handleUpload} />
          <SidebarButton to="/crop" icon={<BiCrop className="sidebar-icon" />} label="Crop Photo" />
          <SidebarButton to="/rotate" icon={<RxRotateCounterClockwise className="sidebar-icon" />} label="Rotate Photo" />
          <SidebarButton to="/effect" icon={<RiPaintFill className="sidebar-icon" />} label="Black and White Effect" />
          <SidebarButton to="/chat" icon={<BsChatDots className="sidebar-icon" />} label="Group Chat" /> {/* ✅ New chat route */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
