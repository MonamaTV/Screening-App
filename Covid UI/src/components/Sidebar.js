import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
    return (
        <>
            <div className="sidebar__container">
                <h2 className="title">Dashboard</h2>
                <div className="sidebar">
                    <div className="item">
                        <NavLink to="/home" activeClassName="active__navlink">
                            Home
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/screeners" activeClassName="active__navlink">
                            Screeners
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/clients"  activeClassName="active__navlink">
                            Clients
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink to="/logout"  activeClassName="active__navlink">
                            Logout
                        </NavLink>
                    </div>        
                </div>
            </div>
        </>
        
    );
};

export default Sidebar;
