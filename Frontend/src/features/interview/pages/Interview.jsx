import React, { useState, useEffect, useContext } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import { ThemeContext } from '../../../theme.context.jsx'
import Navbar from '../../../Navbar'

// ── Nav Items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    {
        id: 'technical', label: 'Technical Questions',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    },
    {
        id: 'behavioral', label: 'Behavioral Questions',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    },
    {
        id: 'roadmap', label: 'Road Map',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
    },
]

// ── Score Ring ────────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
    const r = 44
    const circ = 2 * Math.PI * r
    const offset = circ - (score / 100) * circ
    const color = score >= 80 ? 'var(--score-high)' : score >= 60 ? 'var(--score-mid)' : 'var(--score-low)'
    const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Ready' : 'Needs Work'

    return (
        <div className='match-score'>
            <p className='match-score__label'>Match Score</p>
            <div className='match-score__ring-wrap'>
                <svg className='match-score__svg' viewBox='0 0 110 110'>
                    <circle className='match-score__track' cx='55' cy='55' r={r} />
                    <circle
                        className='match-score__fill'
                        cx='55' cy='55' r={r}
                        stroke={color}
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className='match-score__center'>
                    <span className='match-score__value'>{score}%</span>
                    <span className='match-score__pct' style={{ color }}>{label}</span>
                </div>
            </div>
            <p className='match-score__sub'>Your profile aligns well with this role</p>
        </div>
    )
}

// ── Skill Item ────────────────────────────────────────────────────────────────
const SkillItem = ({ gap }) => {
    const levelMap = { high: { label: 'Critical', width: '75%' }, medium: { label: 'Moderate', width: '50%' }, low: { label: 'Strong', width: '25%' } }
    const info = levelMap[gap.severity] || levelMap['low']

    return (
        <div className={`skill-item skill-item--${gap.severity}`}>
            <div className='skill-item__top'>
                <span className='skill-item__name'>{gap.skill}</span>
                <span className='skill-item__level'>{info.label}</span>
            </div>
            <div className='skill-item__bar'>
                <div className='skill-item__bar-fill' style={{ width: info.width }} />
            </div>
        </div>
    )
}

// ── Question Card ─────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`q-card ${open ? 'q-card--open' : ''}`}>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p className='q-card__text'>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <div className='q-card__answer-box'>
                            <p>"{item.answer}"</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Roadmap Day ───────────────────────────────────────────────────────────────
const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const { theme, toggleTheme } = useContext(ThemeContext)

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your resume...</h1>
            </main>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar showLinks={false} />
            <div className='interview-page'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <p className='interview-nav__label'>Sections</p>

                    <div className='interview-nav__items'>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className='interview-nav__bottom'>

                        <button
                            className='interview-nav__download-btn'
                            onClick={() => getResumePdf(interviewId)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" /></svg>
                            Download Resume
                        </button>

                        <div className='interview-nav__user'>
                            <div className='interview-nav__user-avatar'>AI</div>
                            <div>
                                <p className='interview-nav__user-name'>{report.title || 'Interview Plan'}</p>
                                <p className='interview-nav__user-tier'>AI Generated</p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} Questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} Questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-Day Plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>
                    <ScoreRing score={report.matchScore} />
                    <div className='sidebar-divider' />
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <SkillItem key={i} gap={gap} />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview
