import React from 'react';
import './Navbar.scss';
import { LiaEarlybirds } from "react-icons/lia";
import { FiList, FiChevronLeft, FiChevronRight, FiSettings, FiMaximize, FiPlay } from 'react-icons/fi';
import { BsCloudUpload } from 'react-icons/bs';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="logo">
                    <LiaEarlybirds size={24} color="#ffa116" /> CodeRoom
                </div>
                <div className="nav-item">
                    <FiList /> Problem List
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="nav-button"><FiChevronLeft /></button>
                    <button className="nav-button"><FiChevronRight /></button>
                </div>
            </div>

            <div className="navbar-center">
                <button className="nav-button run-btn">
                    <FiPlay /> Run
                </button>
                <button className="nav-button submit-btn">
                    <BsCloudUpload /> Submit
                </button>
            </div>

            <div className="navbar-right">
                <button className="nav-button"><FiSettings /></button>
                <button className="nav-button"><FiMaximize /></button>
                <div style={{ margin: '0 8px', width: '1px', height: '20px', background: '#ffffff12' }}></div>
                <div className="register-link">Register</div>
                <span style={{ color: '#eff2f699' }}>or</span>
                <div className="login-link">Log in</div>
                <button className="premium-btn">Premium</button>
            </div>
        </nav>
    );
};

export default Navbar;
