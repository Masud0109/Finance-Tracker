import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { FinanceProvider } from './context/FinanceContext.jsx';
import './styles.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FinanceProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Dashboard />} />
              {/* Add other routes for specific views if needed */}
            </Routes>
          </div>
        </FinanceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
