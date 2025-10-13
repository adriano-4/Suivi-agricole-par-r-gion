import { Link } from "react-router-dom";
import "../css/navBarPage.css";


function NavItem({ to, icon, label }) {
  return (
      <Link className="link" to={to}>
        <li>
            <i className={`fa ${icon}`}></i>
            <p>{label}</p>
        </li>
      </Link>
  );
}

export default NavItem;
