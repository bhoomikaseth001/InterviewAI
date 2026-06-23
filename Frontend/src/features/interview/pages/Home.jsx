import React, { useState, useRef, useEffect, useContext } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, NavLink } from 'react-router'
import Navbar from '../../../Navbar'
import { ThemeContext } from '../../../theme.context.jsx'


// ── Score helper ─────────────────────────────────────────────────────────────
const scoreClass = (score) =>
    score >= 80 ? 'score--high' : score >= 60 ? 'score--mid' : 'score--low'

// ── Main Component ────────────────────────────────────────────────────────────
const Home = () => {
    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState(null)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => { getReports() }, [])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileName(file ? file.name : null)
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (!data) return
        navigate(`/interview/${data._id}`)
    }

    if (loading && reports.length === 0) {
        return (
            <>
                <Navbar />
                <main className='loading-screen'>
                    <h1>Loading your interview plan...</h1>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />

            <div className='home-page'>

                {/* Header */}
                <header className='page-header'>
                    <h1>Create Your Custom Interview Plan</h1>
                    <p>Upload your resume and the job description to generate a hyper-personalized interview strategy powered by AI analysis.</p>
                </header>

                {/* Main Card */}
                <div className='interview-card'>
                    <div className='interview-card__body'>

                        {/* Left — Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <p className='panel__desc'>Paste the full job post here. The AI will extract key competencies and technical requirements.</p>
                            <textarea
                                className='panel__textarea'
                                placeholder="e.g. We are looking for a Senior Product Designer with experience in Figma, design systems, and rapid prototyping..."
                                maxLength={5000}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        {/* Right — Your Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Profile</h2>
                            </div>

                            {/* Upload Resume */}
                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge--best'>Best Results</span>
                                </label>
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                                    </span>
                                    <p className='dropzone__title'>{fileName || 'Upload Your Resume'}</p>
                                    <p className='dropzone__subtitle'>PDF, DOCX up to 5MB</p>
                                    <input
                                        ref={resumeInputRef}
                                        hidden type='file' id='resume'
                                        accept='.pdf,.docx'
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>

                            <div className='or-divider'><span>OR</span></div>

                            {/* Self Description */}
                            <div>
                                <label className='section-label' htmlFor='selfDescription'>Self Description</label>
                                <textarea
                                    id='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="Add specific experiences or concerns you want the AI to address..."
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            AI-Powered · Approx 30s
                        </span>
                        <button onClick={handleGenerateReport} className='generate-btn' disabled={loading}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" /></svg>
                            {loading ? 'Generating...' : 'Generate My Interview Strategy'}
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <div className='recent-reports__header'>
                            <h2>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14" /><path d="M3.05 11a9 9 0 1 0 .5-4" /></svg>
                                Recent Interview Plans
                            </h2>
                            <a href='#'>View All</a>
                        </div>

                        <div className='reports-grid'>
                            {reports.map((report) => {
                                const sc = scoreClass(report.matchScore)
                                return (
                                    <div
                                        key={report._id}
                                        className='report-card'
                                        onClick={() => navigate(`/interview/${report._id}`)}
                                    >
                                        <div className='report-card__top'>
                                            <div className='report-card__icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                            </div>
                                            {report.matchScore > 0 && (
                                                <div className={`report-card__score ${sc}`}>
                                                    {report.matchScore}
                                                    <span>%</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className='report-card__role'>Interview Plan</p>
                                        <h3 className='report-card__title'>{report.title || 'Untitled Position'}</h3>
                                        <p className='report-card__meta'>{new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        <div className='report-card__footer'>
                                            <span>View plan</span>
                                            <div className='report-card__arrow'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                <footer className='page-footer'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </footer>
            </div>
        </>
    )
}

export default Home
