export const users = [
  // Profesores
  {
    id: 1,
    email: "matematicas@colegio.com",
    password: "mate123",
    role: "teacher",
    name: "Prof. Carlos Rivera",
    subjects: ["matemáticas"]
  },
  {
    id: 2,
    email: "ciencias@colegio.com",
    password: "ciencia123",
    role: "teacher",
    name: "Prof. Laura Méndez",
    subjects: ["ciencias", "biología"]
  },
  {
    id: 3,
    email: "historia@colegio.com",
    password: "historia123",
    role: "teacher",
    name: "Prof. Jorge Sánchez",
    subjects: ["historia", "geografía"]
  },

  // Estudiantes
  {
    id: 101,
    email: "alumno1@colegio.com",
    password: "alumno1",
    role: "student",
    name: "Ana López",
    grade: "10° A",
    grades: {
      matemáticas: 8.5,
      ciencias: 9.0,
      historia: 7.5
    },
    comments: {
      matemáticas: "Excelente en geometría, necesita practicar álgebra",
      ciencias: "Destacado desempeño en laboratorios",
      historia: "Participación activa en clase"
    }
  },
  {
    id: 102,
    email: "alumno2@colegio.com",
    password: "alumno2",
    role: "student",
    name: "Pedro Ramírez",
    grade: "10° B",
    grades: {
      matemáticas: 6.0,
      biología: 8.5,
      geografía: 7.0
    },
    comments: {
      matemáticas: "Necesita reforzar conceptos básicos",
      biología: "Muy buen trabajo en equipo",
      geografía: "Interés notable en geografía física"
    }
  },
  {
    id: 103,
    email: "alumno3@colegio.com",
    password: "alumno3",
    role: "student",
    name: "María Fernández",
    grade: "11° A",
    grades: {
      matemáticas: 9.5,
      física: 8.0,
      historia: 6.5
    },
    comments: {
      matemáticas: "Talento excepcional para matemáticas avanzadas",
      física: "Buen manejo de conceptos teóricos",
      historia: "Podría mejorar en análisis histórico"
    }
  }
];

export const classes = [
  {
    id: 1,
    name: "10° A",
    teacherId: 1, // Prof. Carlos Rivera
    subject: "matemáticas",
    schedule: "Lunes y Miércoles 8:00-10:00"
  },
  {
    id: 2,
    name: "10° B",
    teacherId: 2, // Prof. Laura Méndez
    subject: "ciencias",
    schedule: "Martes y Jueves 9:00-11:00"
  },
  {
    id: 3,
    name: "11° A",
    teacherId: 3, // Prof. Jorge Sánchez
    subject: "historia",
    schedule: "Viernes 10:00-12:00"
  }
];

export const assignments = [
  {
    id: 1,
    classId: 1,
    title: "Examen de Álgebra",
    dueDate: "2023-11-15",
    maxScore: 10
  },
  {
    id: 2,
    classId: 2,
    title: "Proyecto de Biología",
    dueDate: "2023-11-20",
    maxScore: 20
  }
];