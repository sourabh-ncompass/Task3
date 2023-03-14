import { NavLink } from "react-router-dom";
import navbar from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={navbar.main}>
      <NavLink to="/" className={navbar.link}>
        Home
      </NavLink>
      <NavLink to="/posts" className={navbar.link}>
        Posts
      </NavLink>
      <NavLink to="/find-post" className={navbar.link}>
        Search
      </NavLink>
    </div>
  );
};

export { Navbar };
