import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import { FaUserAlt, FaChartArea } from "react-icons/fa";
import { TwentyOneMpOutlined } from '@mui/icons-material';
import './Main.css'

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile lg:drawer-open">
                <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-[#f6fff9]">
                    <Outlet></Outlet>
                </div>
                <label htmlFor="sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="drawer-side">
                    <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full text-base-content">
                    <li ><Link to='/' className='flex justify-start items-center mx-10 border border-accent my-5 '><FaUserAlt className='text-lg'></FaUserAlt> <p className='text-lg text-sky-900 fontfamily font-medium'>Contact</p></Link></li>
                    <li><Link to='/dashboard' className='flex justify-start items-center mx-10 border border-accent mb-5 '><FaChartArea className='text-xl'></FaChartArea><p className='text-lg text-sky-900 fontfamily font-medium'>Charts and Maps</p></Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Main;