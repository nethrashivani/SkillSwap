import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddSkillPage from './pages/AddSkillPage';
import EditSkillPage from './pages/EditSkillPage';
import SkillDetailsPage from './pages/SkillDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MySkillsPage from './pages/MySkillsPage';
import { isLoggedIn } from './services/authService';

function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddSkillPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditSkillPage /></ProtectedRoute>} />
        <Route path="/skills/:id" element={<ProtectedRoute><SkillDetailsPage /></ProtectedRoute>} />
        <Route path="/my-skills" element={<ProtectedRoute><MySkillsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;