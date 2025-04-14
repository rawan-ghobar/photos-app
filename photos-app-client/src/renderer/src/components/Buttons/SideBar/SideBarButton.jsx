import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import "./SideBarButton.css";

function SideBarButton({ to, icon, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to ? "sidebar-active" : "sidebar-inactive";

  return (
    <li>
      <button
        type="button"
        className={isActive}
        onClick={() => navigate(to)}>
        {icon}
        <span>{label}</span>
      </button>
    </li>
  );
}

SideBarButton.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default SideBarButton;
