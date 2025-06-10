import { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import StudentDashboard from '../components/Student/StudentDashboard';
import TeacherDashboard from '../components/Teacher/TeacherDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentUser.role === 'student' ? (
        <StudentDashboard currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <TeacherDashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
