import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';
import trollImage from './img/Anhrtroll.png';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic đăng nhập giả lập
        navigate('/room/default');
    };

    return (
        <section className="vh-100 login-page-wrapper">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100" style={{ marginTop: '38px' }}>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src={trollImage}
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3" style={{ color: 'var(--text-primary)' }}>Sign in with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1" style={{ borderRadius: '50%', padding: '10px 15px' }}>
                                    <FiFacebook />
                                </button>
                                <button type="button" className="btn btn-primary btn-floating mx-1" style={{ borderRadius: '50%', padding: '10px 15px' }}>
                                    <FiTwitter />
                                </button>
                                <button type="button" className="btn btn-primary btn-floating mx-1" style={{ borderRadius: '50%', padding: '10px 15px' }}>
                                    <FiLinkedin />
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0" style={{ color: 'var(--text-muted)' }}>Or</p>
                            </div>

                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="email" style={{ color: 'var(--text-muted)' }}>Email address</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="password" style={{ color: 'var(--text-muted)' }}>Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="remember" />
                                    <label className="form-check-label" htmlFor="remember" style={{ color: 'var(--text-muted)' }}>
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body" style={{ color: '#06b6d4' }}>Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: '#06b6d4', borderColor: '#06b6d4' }}>
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: 'var(--text-primary)' }}>
                                    Don't have an account? <a href="#!" className="link-danger" style={{ color: '#06b6d4' }}>Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Login;