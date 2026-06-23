import React, { useContext, useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { ThemeContext } from './theme.context'
import { useAuth } from './features/auth/hooks/useAuth'

const Navbar = ({ showLinks = true }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, handleLogout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef()
    const navigate = useNavigate()

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const initials = user?.username?.slice(0, 1).toUpperCase() || 'AI'

    return (
        <>
            <style>{`
                .nav-dropdown {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    background: var(--bg-card);
                    border: 1px solid var(--border);
                    border-radius: 14px;
                    min-width: 200px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                    z-index: 200;
                    overflow: hidden;
                    animation: fadeIn 0.15s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .nav-dropdown__header {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border);
                }
                .nav-dropdown__name {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                .nav-dropdown__email {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-top: 0.2rem;
                }
                .nav-dropdown__item {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: none;
                    border: none;
                    font-family: inherit;
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    cursor: pointer;
                    text-align: left;
                    transition: background 0.15s, color 0.15s;
                }
                .nav-dropdown__item:hover {
                    background: var(--nav-hover);
                    color: var(--text-primary);
                }
                .nav-dropdown__item--danger {
                    color: #ef4444;
                }
                .nav-dropdown__item--danger:hover {
                    background: rgba(239,68,68,0.08);
                    color: #ef4444;
                }
                .navbar__avatar {
                    position: relative;
                    cursor: pointer;
                }
                .navbar__avatar-circle {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: var(--gradient-btn);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: white;
                    transition: opacity 0.2s;
                }
                .navbar__avatar-circle:hover { opacity: 0.85; }
            `}</style>

            <nav className='navbar'>
                <span className='navbar__brand'>PrepAssistantAI</span>



                <div className='navbar__actions'>
                    <button className='navbar__theme-btn' onClick={toggleTheme}>
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                        )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className='navbar__avatar' ref={dropdownRef}>
                        <div
                            className='navbar__avatar-circle'
                            onClick={() => setDropdownOpen(o => !o)}
                        >
                            {initials}
                        </div>

                        {dropdownOpen && (
                            <div className='nav-dropdown'>
                                <div className='nav-dropdown__header'>
                                    <p className='nav-dropdown__name'>@{user?.username}</p>
                                    <p className='nav-dropdown__email'>{user?.email}</p>
                                </div>
                                <button className='nav-dropdown__item' onClick={() => setDropdownOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    Profile
                                </button>
                                <button className='nav-dropdown__item nav-dropdown__item--danger' onClick={onLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar