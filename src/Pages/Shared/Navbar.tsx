import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar justify-between border-b border-accent py-5 px-10">
            <a className="normal-case text-3xl text-sky-900 font-bold pl-3 mb-2"><span className='text-accent'>T</span>aiyo</a>
            <div className='navbar-end  lg:hidden'>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;