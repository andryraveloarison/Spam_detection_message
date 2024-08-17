import React, { useState, useEffect } from "react";
import "../../styles/User/sideMenu.css";
import { NavLink } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import BarChartIcon from '@mui/icons-material/BarChart';
import SendIcon from '@mui/icons-material/Send';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import MailIcon from '@mui/icons-material/Mail';
interface sideMenuInterface{
    username: string,
    role: number
}

const sidemenu = (user: sideMenuInterface) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    const togglesidemenu = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 480);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

  return (
    <>
      {!isMobile ? (
        <div className={`sidemenu-container ${isOpen ? "open" : "closed"}`}>
            <div className="hello">
                <h2>
                 {user.username} 
                </h2>
            </div>

          <div className="nav-menu">
           
            <NavLink
              to="/user/send"
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ textDecoration: "none" }}
            >
              <div className="nav">
                <SendIcon className="nav-icon" />
                Handefa 
              </div>
            </NavLink>
            <NavLink
              to="/user/reception"
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ textDecoration: "none" }}
            >
              <div className="nav">
                <MailIcon className="nav-icon" />
                Hafatra
              </div>
            </NavLink>

                  
            <NavLink
              to="/user/spam"
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ textDecoration: "none" }}
            >
              <div className="nav">
                <SmsFailedIcon className="nav-icon" />
                Spam
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="bottom-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <div className="bottom-nav-item">
              <HomeIcon />
              <span className="nav-label">Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/Room"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <div className="bottom-nav-item">
              <MeetingRoomIcon />
              <span className="nav-label">Room</span>
            </div>
          </NavLink>
          <NavLink
            to="/Automation"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <div className="bottom-nav-item">
              <SettingsSuggestIcon />
              <span className="nav-label">Automation</span>
            </div>
          </NavLink>
          <NavLink
            to="/Device"
            className={({ isActive }) => (isActive ? "active" : "")}
            style={{ textDecoration: "none" }}
          >
            <div className="bottom-nav-item">
              <DevicesOtherIcon />
              <span className="nav-label">Device</span>
            </div>
          </NavLink>
        </div>
      )}
      {!isMobile && (
        <button className={`menu-toggle ${isOpen ? "hide" : ""}`} onClick={togglesidemenu}>
          ☰
        </button>
      )}
    </>
  );
};

export default sidemenu;