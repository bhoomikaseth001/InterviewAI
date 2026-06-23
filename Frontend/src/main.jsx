import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.scss'

import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'
import { ThemeProvider } from './theme.context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <App />
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)