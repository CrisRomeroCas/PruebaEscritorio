import React from 'react';

const StudentDashboard = ({ currentUser, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hola, {currentUser.name}</h1>
          <p className="text-gray-600">Bienvenido a tu panel de estudiante</p>
        </div>
        <button
          onClick={onLogout}
          className="text-red-500 hover:text-red-700"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tus Calificaciones</h2>
        {currentUser.grades && Object.entries(currentUser.grades).map(([subject, grade]) => (
          <div key={subject} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium capitalize">{subject}</h3>
              <span className={`px-3 py-1 rounded-full ${
                grade >= 7 ? 'bg-green-100 text-green-800' : 
                grade >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {grade}
              </span>
            </div>
            {currentUser.comments && currentUser.comments[subject] && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700"><span className="font-medium">Profesor:</span> {currentUser.comments[subject]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;