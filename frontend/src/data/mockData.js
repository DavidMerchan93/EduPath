export const courses = [
  {
    id: '1',
    title: 'JavaScript Avanzado: Patrones de Diseño y Arquitectura',
    shortDescription: 'Domina los patrones de diseño más utilizados en proyectos JavaScript reales.',
    instructor: 'Carlos Rodríguez',
    instructorRole: 'Desarrollador Senior',
    rating: 4.8,
    reviews: 3241,
    students: 12540,
    level: 'Intermedio',
    price: 49,
    originalPrice: 89,
    discount: 45,
    isFree: false,
    category: 'Desarrollo',
    language: 'Español',
    lastUpdated: 'Abril 2026',
    hours: 22,
    sections: 8,
    lessons: 64,
    whatYouLearn: [
      'Patrones Creacionales (Factory, Builder, Singleton)',
      'Patrones Estructurales (Adapter, Decorator, Facade)',
      'Patrones de Comportamiento (Observer, Strategy, Command)',
      'Arquitectura limpia en proyectos JavaScript reales',
    ],
  },
  {
    id: '2',
    title: 'Diseño UI/UX con Figma: Curso Completo',
    shortDescription: 'Aprende a diseñar interfaces modernas desde cero con Figma.',
    instructor: 'Ana García',
    instructorRole: 'UX Designer Senior',
    rating: 4.8,
    reviews: 2308,
    students: 9800,
    level: 'Principiante',
    price: 0,
    originalPrice: 79,
    discount: 100,
    isFree: true,
    category: 'Diseño',
    language: 'Español',
    lastUpdated: 'Mayo 2026',
    hours: 18,
    sections: 6,
    lessons: 48,
    whatYouLearn: [
      'Fundamentos de UI/UX Design',
      'Prototipado interactivo en Figma',
      'Design Systems y componentes',
      'Entrega de proyectos a desarrollo',
    ],
  },
  {
    id: '3',
    title: 'Python para Data Science y Machine Learning',
    shortDescription: 'NumPy, Pandas, Matplotlib y Machine Learning básico con scikit-learn.',
    instructor: 'Laura Jiménez',
    instructorRole: 'Data Scientist',
    rating: 4.8,
    reviews: 2300,
    students: 22100,
    level: 'Principiante',
    price: 59,
    originalPrice: 99,
    discount: 40,
    isFree: false,
    category: 'Desarrollo',
    language: 'Español',
    lastUpdated: 'Mayo 2026',
    hours: 30,
    sections: 10,
    lessons: 88,
    whatYouLearn: [
      'Python desde cero hasta nivel avanzado',
      'Análisis de datos con Pandas y NumPy',
      'Visualización con Matplotlib y Seaborn',
      'Modelos de Machine Learning con scikit-learn',
    ],
  },
  {
    id: '4',
    title: 'Marketing Digital Completo 2026',
    shortDescription: 'Estrategias de SEO, SEM, redes sociales y email marketing.',
    instructor: 'Miguel Torres',
    instructorRole: 'Growth Hacker',
    rating: 4.8,
    reviews: 2300,
    students: 9800,
    level: 'Todos los niveles',
    price: 39,
    originalPrice: 69,
    discount: 43,
    isFree: false,
    category: 'Marketing',
    language: 'Español',
    lastUpdated: 'Marzo 2026',
    hours: 14,
    sections: 5,
    lessons: 42,
    whatYouLearn: [
      'SEO y posicionamiento orgánico',
      'Google Ads y Facebook Ads',
      'Email marketing y automatización',
      'Analítica web con Google Analytics',
    ],
  },
]

export const courseSections = [
  {
    id: 's1',
    title: 'Introducción y Setup',
    lessonsCount: 4,
    hours: 3,
    lessons: [
      { id: 'l1', title: '¿Qué son los patrones de diseño?', duration: '05:12', isCompleted: true },
      { id: 'l2', title: 'Historia y clasificación', duration: '08:45', isCompleted: true },
      { id: 'l3', title: 'Setup del entorno', duration: '07:30', isCompleted: true },
      { id: 'l4', title: 'Tu primer patrón', duration: '12:20', isCompleted: false },
    ],
  },
  {
    id: 's2',
    title: 'Patrones Creacionales',
    lessonsCount: 6,
    hours: 4,
    lessons: [
      { id: 'l5', title: 'Factory Method', duration: '14:32', isCompleted: false },
      { id: 'l6', title: 'Abstract Factory', duration: '11:20', isCompleted: false },
      { id: 'l7', title: 'Builder Pattern', duration: '13:55', isCompleted: false },
      { id: 'l8', title: 'Singleton', duration: '09:10', isCompleted: false },
      { id: 'l9', title: 'Prototype Pattern', duration: '10:45', isCompleted: false },
      { id: 'l10', title: 'Ejercicio práctico creacionales', duration: '18:00', isCompleted: false },
    ],
  },
  {
    id: 's3',
    title: 'Patrones Estructurales',
    lessonsCount: 8,
    hours: 5,
    lessons: [
      { id: 'l11', title: 'Adapter Pattern', duration: '12:05', isCompleted: false },
      { id: 'l12', title: 'Decorator Pattern', duration: '14:48', isCompleted: false },
      { id: 'l13', title: 'Facade Pattern', duration: '11:33', isCompleted: false },
      { id: 'l14', title: 'Bridge Pattern', duration: '13:22', isCompleted: false },
      { id: 'l15', title: 'Composite Pattern', duration: '10:15', isCompleted: false },
      { id: 'l16', title: 'Flyweight Pattern', duration: '09:40', isCompleted: false },
      { id: 'l17', title: 'Proxy Pattern', duration: '11:50', isCompleted: false },
      { id: 'l18', title: 'Ejercicio práctico estructurales', duration: '20:00', isCompleted: false },
    ],
  },
  {
    id: 's4',
    title: 'Patrones de Comportamiento',
    lessonsCount: 10,
    hours: 6,
    lessons: [
      { id: 'l19', title: 'Observer Pattern', duration: '12:30', isCompleted: false },
      { id: 'l20', title: 'Strategy Pattern', duration: '11:15', isCompleted: false },
      { id: 'l21', title: 'Command Pattern', duration: '13:40', isCompleted: false },
      { id: 'l22', title: 'Iterator Pattern', duration: '09:55', isCompleted: false },
      { id: 'l23', title: 'Mediator Pattern', duration: '10:20', isCompleted: false },
      { id: 'l24', title: 'Memento Pattern', duration: '08:35', isCompleted: false },
      { id: 'l25', title: 'State Pattern', duration: '12:10', isCompleted: false },
      { id: 'l26', title: 'Template Method', duration: '11:45', isCompleted: false },
      { id: 'l27', title: 'Visitor Pattern', duration: '13:00', isCompleted: false },
      { id: 'l28', title: 'Proyecto final integrador', duration: '35:00', isCompleted: false },
    ],
  },
]

export const courseProgress = {
  completedLessons: ['l1', 'l2', 'l3'],
  currentLessonId: 'l5',
  percentage: 65,
}

export const testimonials = [
  {
    id: 't1',
    name: 'Estudiante 1',
    initials: 'E1',
    rating: 5,
    text: 'Excelente plataforma. Los cursos son muy completos y bien estructurados.',
  },
  {
    id: 't2',
    name: 'Estudiante 2',
    initials: 'E2',
    rating: 5,
    text: 'Excelente plataforma. Los cursos son muy completos y bien estructurados.',
  },
  {
    id: 't3',
    name: 'Estudiante 3',
    initials: 'E3',
    rating: 5,
    text: 'Excelente plataforma. Los cursos son muy completos y bien estructurados.',
  },
]

export const categories = [
  { id: 'c1', name: 'Desarrollo',  icon: '💻' },
  { id: 'c2', name: 'Diseño',      icon: '🎨' },
  { id: 'c3', name: 'Negocios',    icon: '💼' },
  { id: 'c4', name: 'Foto',        icon: '📷' },
  { id: 'c5', name: 'Música',      icon: '🎵' },
  { id: 'c6', name: 'Salud',       icon: '🏃' },
  { id: 'c7', name: 'Marketing',   icon: '📈' },
  { id: 'c8', name: 'Mobile',      icon: '📱' },
]

export const stats = [
  { id: 'st1', value: '50,000+', label: 'Estudiantes' },
  { id: 'st2', value: '1,200+',  label: 'Cursos' },
  { id: 'st3', value: '300+',    label: 'Instructores' },
]

export const courseReviews = [
  {
    id: 'r1',
    author: 'Estudiante 1',
    initials: 'E1',
    date: 'hace 2 semanas',
    rating: 5,
    text: 'Excelente curso, muy bien explicado. Los ejercicios prácticos son muy útiles.',
  },
  {
    id: 'r2',
    author: 'Estudiante 2',
    initials: 'E2',
    date: 'hace 2 semanas',
    rating: 5,
    text: 'Excelente curso, muy bien explicado. Los ejercicios prácticos son muy útiles.',
  },
]

export const ratingDistribution = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 6  },
  { stars: 2, percentage: 2  },
  { stars: 1, percentage: 2  },
]

export const lessonResources = [
  { id: 'res1', name: 'factory-method.zip', type: 'zip' },
  { id: 'res2', name: 'slides-seccion-2.pdf', type: 'pdf' },
]

// ── Catálogo completo (6 cursos para el grid de /cursos) ──────────────────────
export const catalogCourses = [
  {
    id: '1',  title: 'JavaScript Avanzado: Patrones de Diseño',
    instructor: 'Carlos Rodríguez', rating: 4.8, students: 2100,
    price: 0, isFree: true, category: 'Desarrollo', level: 'Intermedio',
  },
  {
    id: '2', title: 'Diseño UI/UX con Figma: Curso Completo',
    instructor: 'Ana García', rating: 4.7, students: 2100,
    price: 0, isFree: true, category: 'Diseño', level: 'Principiante',
  },
  {
    id: '3', title: 'Python para Data Science',
    instructor: 'Laura Jiménez', rating: 4.7, students: 2100,
    price: 39, isFree: false, category: 'Desarrollo', level: 'Principiante',
  },
  {
    id: '4', title: 'Marketing Digital Completo 2026',
    instructor: 'Miguel Torres', rating: 4.7, students: 2100,
    price: 44, isFree: false, category: 'Marketing', level: 'Todos los niveles',
  },
  {
    id: '5', title: 'Fotografía Profesional desde Cero',
    instructor: 'Roberto Vega', rating: 4.7, students: 2100,
    price: 49, isFree: false, category: 'Fotografía', level: 'Principiante',
  },
  {
    id: '1', title: 'React y TypeScript: Aplicaciones Modernas',
    instructor: 'Sofía Ramírez', rating: 4.7, students: 2100,
    price: 54, isFree: false, category: 'Desarrollo', level: 'Avanzado',
  },
]

export const catalogFilters = {
  categories: [
    { label: 'Desarrollo', count: 420 },
    { label: 'Diseño',     count: 210 },
    { label: 'Negocios',   count: 180 },
    { label: 'Marketing',  count: 95  },
  ],
  levels: [
    { label: 'Principiante', count: 520 },
    { label: 'Intermedio',   count: 380 },
    { label: 'Avanzado',     count: 220 },
  ],
  prices: [
    { label: 'Gratuito', count: 120 },
    { label: 'De pago',  count: 1128 },
  ],
  ratings: [
    { label: '4+ estrellas' },
    { label: '3+ estrellas' },
  ],
}

// ── Dashboard del estudiante ──────────────────────────────────────────────────
export const dashboardUser = {
  name: 'David Merchan',
  email: 'davidm@email.com',
  initials: 'DS',
}

export const dashboardStats = [
  { id: 'ds1', value: '3',   label: 'Cursos en progreso', color: 'text-brand-blue'   },
  { id: 'ds2', value: '2',   label: 'Completados',        color: 'text-brand-green'  },
  { id: 'ds3', value: '48h', label: 'Horas aprendidas',   color: 'text-brand-orange' },
  { id: 'ds4', value: '7 🔥', label: 'Días de racha',     color: 'text-brand-orange' },
]

export const enrolledCourses = [
  {
    id: 'e1', courseId: '1',
    title: 'JavaScript Avanzado: Patrones de Diseño', instructor: 'Instructor 1',
    progress: 65, lastLesson: 'Lección 3: Título de lección', completed: false,
  },
  {
    id: 'e2', courseId: '2',
    title: 'Diseño UI/UX con Figma', instructor: 'Instructor 2',
    progress: 42, lastLesson: 'Lección 4: Título de lección', completed: false,
  },
  {
    id: 'e3', courseId: '3',
    title: 'Python para Data Science', instructor: 'Instructor 3',
    progress: 100, lastLesson: 'Lección 5: Título de lección', completed: true,
  },
  {
    id: 'e4', courseId: '4',
    title: 'Marketing Digital Completo 2026', instructor: 'Instructor 4',
    progress: 23, lastLesson: 'Lección 6: Título de lección', completed: false,
  },
  {
    id: 'e5', courseId: '1',
    title: 'React y TypeScript: Aplicaciones Modernas', instructor: 'Instructor 5',
    progress: 88, lastLesson: 'Lección 7: Título de lección', completed: false,
  },
]
