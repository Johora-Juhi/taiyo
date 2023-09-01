import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <label htmlFor="sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="drawer-side">
                    <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-200 min-h-full text-base-content">
                    <li><Link to='/'>Contact</Link></li>
                    <li><Link to='/dashboard'>Charts and Maps</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;