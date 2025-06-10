import React, { useState } from 'react';
import { users, classes, assignments } from '../../mock/users';

const TeacherDashboard = ({ currentUser, onLogout }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [gradeInput, setGradeInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  // Filtra estudiantes que tienen al menos una materia en común con el profesor
  const teacherStudents = users.filter(user => 
    user.role === 'student' && 
    Object.keys(user.grades || {}).some(subject => 
      currentUser.subjects.includes(subject)
    )
  );

  // Filtra clases que imparte este profesor
  const teacherClasses = classes.filter(
    cls => cls.teacherId === currentUser.id
  );

  const handleAddGrade = () => {
    if (!selectedStudent || !selectedClass || !gradeInput) return;

    const updatedStudents = teacherStudents.map(student => {
      if (student.id === selectedStudent) {
        return {
          ...student,
          grades: {
            ...student.grades,
            [selectedClass.subject]: parseFloat(gradeInput)
          },
          comments: {
            ...student.comments,
            [selectedClass.subject]: commentInput || "Sin comentarios"
          }
        };
      }
      return student;
    });

    // En una app real, aquí harías una llamada API para actualizar en la base de datos
    console.log("Calificación actualizada:", updatedStudents);
    alert("Calificación registrada exitosamente");
    setGradeInput('');
    setCommentInput('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Panel del Profesor</h1>
          <p className="text-gray-600">Bienvenido, {currentUser.name}</p>
        </div>
        <button
          onClick={onLogout}
          className="text-red-500 hover:text-red-700"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de Clases */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tus Clases</h2>
          <ul className="space-y-3">
            {teacherClasses.map(cls => (
              <li 
                key={cls.id}
                className={`p-3 border rounded cursor-pointer ${selectedClass?.id === cls.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                onClick={() => setSelectedClass(cls)}
              >
                <h3 className="font-medium">{cls.subject}</h3>
                <p className="text-sm text-gray-600">{cls.name}</p>
                <p className="text-xs text-gray-500">{cls.schedule}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Estudiantes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Estudiantes</h2>
          <div className="mb-4">
            <label className="block mb-2">Filtrar por clase:</label>
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedClass(teacherClasses.find(c => c.id === parseInt(e.target.value)))}
            >
              <option value="">Todas las clases</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.subject} - {cls.name}
                </option>
              ))}
            </select>
          </div>

          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {teacherStudents
              .filter(student => 
                !selectedClass || 
                student.grade === selectedClass.name
              )
              .map(student => (
                <li 
                  key={student.id}
                  className={`p-3 border rounded cursor-pointer ${selectedStudent === student.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelectedStudent(student.id)}
                >
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.grade}</p>
                </li>
              ))}
          </ul>
        </div>

        {/* Sección de Calificaciones */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Registrar Calificación</h2>
          
          {selectedClass && selectedStudent ? (
            <>
              <div className="mb-4">
                <label className="block mb-2">Estudiante:</label>
                <p className="font-medium">
                  {teacherStudents.find(s => s.id === selectedStudent)?.name}
                </p>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Materia:</label>
                <p className="font-medium">{selectedClass.subject}</p>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Calificación (0-10):</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Comentario:</label>
                <textarea
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <button
                onClick={handleAddGrade}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Guardar Calificación
              </button>
            </>
          ) : (
            <p className="text-gray-500">
              Selecciona una clase y un estudiante para registrar calificaciones
            </p>
          )}
        </div>
      </div>

      {/* Visualización de Calificaciones */}
      {selectedStudent && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Historial de Calificaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(
              teacherStudents.find(s => s.id === selectedStudent)?.grades || {}
            ).map(([subject, grade]) => (
              <div key={subject} className="border p-4 rounded">
                <h3 className="font-medium capitalize">{subject}</h3>
                <div className={`text-2xl font-bold ${
                  grade >= 7 ? 'text-green-600' : 
                  grade >= 5 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {grade}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {teacherStudents.find(s => s.id === selectedStudent)?.comments[subject] || "Sin comentarios"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;

// Credenciales de acceso:
/*
PROFESORES:
1. matemáticas@colegio.com / mate123
2. ciencias@colegio.com / ciencia123
3. historia@colegio.com / historia123

ESTUDIANTES:
1. alumno1@colegio.com / alumno1
2. alumno2@colegio.com / alumno2
3. alumno3@colegio.com / alumno3
*/

// DONE