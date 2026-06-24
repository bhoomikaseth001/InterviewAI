import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router'
import '../auth.scss'
import { useAuth } from '../hooks/useAuth'
import { ThemeContext } from '../../../theme.context'

const Register = () => {
    const { loading, handleRegister } = useAuth()
    const { theme, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
        if (success) navigate('/')
    }

    if (loading) {
        return <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-right)' }}><h1 style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Loading...</h1></main>
    }

    return (
        <div className='auth-page'>

            {/* ── Left Panel ── */}
            <div className='auth-left'>
                <div className='auth-left__brand'>
                    {/* <div className='auth-left__brand-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" /></svg>
                    </div> */}
                    <span className='auth-left__brand-name'>PrepAssistantAI</span>
                </div>

                <div className='auth-left__content'>
                    <h1 className='auth-left__heading'>
                        Ace your next interview with <span>AI-powered</span> preparation.
                    </h1>

                    <div className='auth-left__features'>
                        <div className='auth-left__feature'>
                            <div className='auth-left__feature-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                            </div>
                            <div className='auth-left__feature-text'>
                                <h3>AI-generated questions</h3>
                                <p>Dynamic prompts tailored to your specific role and experience level.</p>
                            </div>
                        </div>
                        <div className='auth-left__feature'>
                            <div className='auth-left__feature-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                            </div>
                            <div className='auth-left__feature-text'>
                                <h3>Personalized roadmap</h3>
                                <p>A structured learning path focusing on your unique skill gaps.</p>
                            </div>
                        </div>
                        <div className='auth-left__feature'>
                            <div className='auth-left__feature-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            </div>
                            <div className='auth-left__feature-text'>
                                <h3>Resume builder</h3>
                                <p>Optimize your profile for ATS compliance and technical impact.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <p className='auth-left__footer'>Join 15,000+ engineers who have leveled up their careers with InterviewAI.</p> */}
            </div>

            {/* ── Right Panel ── */}
            <div className='auth-right'>
                <button className='auth-theme-btn' onClick={toggleTheme} title='Toggle theme'>
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    )}
                </button>

                <div className='auth-card'>
                    <h2 className='auth-card__title'>Create an account</h2>
                    <p className='auth-card__subtitle'>Start your training session today.</p>

                    <form onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className='auth-field'>
                            <div className='auth-field__label-row'>
                                <label className='auth-field__label'>Username</label>
                            </div>
                            <div className='auth-field__input-wrap'>
                                <span className='auth-field__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <input
                                    className='auth-field__input'
                                    type="text"
                                    placeholder="johndoe"
                                    autoComplete="new-password"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='auth-field'>
                            <div className='auth-field__label-row'>
                                <label className='auth-field__label'>Email Address</label>
                            </div>
                            <div className='auth-field__input-wrap'>
                                <span className='auth-field__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </span>
                                <input
                                    className='auth-field__input'
                                    type="email"
                                    placeholder="john@example.com"
                                    autoComplete="new-password"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className='auth-field'>
                            <div className='auth-field__label-row'>
                                <label className='auth-field__label'>Password</label>
                            </div>
                            <div className='auth-field__input-wrap'>
                                <span className='auth-field__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </span>
                                <input
                                    className='auth-field__input'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type='button' className='auth-field__toggle' onClick={() => setShowPassword(p => !p)}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <p className='auth-terms'>
                            By clicking Register, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
                        </p>

                        <button type='submit' className='auth-submit-btn' disabled={loading}>
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>
                </div>

                <p className='auth-footer-link'>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
