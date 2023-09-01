import React from 'react';
import { Link,Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                    <li><Link to='/'>Contact</Link></li>
                    <li><Link to='/dashboard'>Charts and Maps</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;