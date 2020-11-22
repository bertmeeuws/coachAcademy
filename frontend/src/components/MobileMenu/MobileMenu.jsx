import React from "react";
import "../../styles/mobilemenu.css";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div className="mobile-menu shadow">
      <div className="mobile-menu-header">
        <img className="mobile-menu-logo" src={Logo} alt="" />
      </div>
      <p className="smalltext">Menu</p>
      <ul className="menu-list">
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Dashboard</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Progress</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Workout</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Diet</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Calendar</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Edit profile</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Settings</span>
          </li>
        </Link>
        <Link className="link">
          <li className="menu-list-item rounded">
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}