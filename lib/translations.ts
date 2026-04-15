type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

export const translations: Translations = {
  es: {
    // Navbar
    home: "Inicio",
    about: "Perfil Profesional",
    skills: "Habilidades",
    projects: "Proyectos",
    education: "Educación",
    experience: "Experiencia",
    contact: "Contacto",
    reviews: "Reseñas",

    // Hero
    heroTitle: "Harry Fishert Lasso Hernández",
    heroSubtitle: "Estudiante de Ingeniería de Sistemas",
    heroDescription:
      "Desarrollador Full Stack especializado en arquitecturas web modernas y soluciones tecnológicas integrales.",
    contactMe: "Contáctame",
    viewProjects: "Ver Proyectos",
    downloadCV: "Descargar CV",

    // About
    aboutTitle: "Perfil Profesional",
    aboutHeading: "¡Hola! Soy Harry",
    aboutParagraph1:
      "Desarrollador Full Stack con sólida formación en Ingeniería de Sistemas, especializado en la creación e implementación de soluciones tecnológicas end-to-end. Combino habilidades técnicas en desarrollo frontend y backend con una metodología orientada a resultados.",
    aboutParagraph2:
      "Me distingo por mi capacidad para adaptarme rápidamente a nuevas tecnologías y frameworks, así como por facilitar la colaboración efectiva en equipos multidisciplinarios. Con un nivel intermedio de inglés, participo activamente en proyectos diversos y mantengo un compromiso constante con el perfeccionamiento de mis habilidades técnicas.",
    age: "Edad",
    ageValue: "19 años",
    location: "Ubicación",
    locationValue: "Colombia",
    birthDate: "Fecha de nacimiento",
    birthDateValue: "03/11/2005",
    languages: "Idiomas",
    languagesValue: "Español (Nativo), Inglés (A2), Portugués (básico)",

    // About - información profesional
    experience: "Experiencia",
    experienceValue: "1 año",
    specialization: "Especialización",
    specializationValue: "Full Stack",
    projectsCompleted: "Proyectos Completados",
    projectsCompletedValue: "15+",
    status: "Estado",
    statusValue: "Disponible",

    // Skills
    skillsTitle: "Mis Habilidades",
    skillsDescription:
      "Estas son las tecnologías y herramientas con las que trabajo. Python es mi lenguaje principal, pero siempre estoy aprendiendo nuevas tecnologías.",
    programming: "Programación",
    frameworks: "Frameworks",
    tools: "Herramientas",
    softSkills: "Habilidades Blandas",
    languagesTab: "Idiomas",

    // Programming skills
    pythonDesc: "Intermedio: Enfoque en desarrollo backend y manejo de librerías",
    javascriptDesc: "Básico: Conocimientos de lógica y manipulación del DOM",
    htmlcssDesc: "Intermedio: Diseño y maquetación web",
    sqlDesc: "Intermedio: Consultas y manejo de bases de datos relacionales",
    javacDesc: "Básico: Programación orientada a objetos y desarrollo de aplicaciones",

    // Frameworks categories
    pythonFrameworks: "Frameworks Python",
    jsFrameworks: "Frameworks JavaScript",
    htmlFrameworks: "Frameworks HTML/CSS",
    sqlFrameworks: "Bases de Datos",
    javaFrameworks: "Frameworks Java",
    cFrameworks: "Herramientas C/C++",

    // Python frameworks
    streamlitDesc: "Desarrollo de aplicaciones web con Python",
    fletDesc: "Creación de interfaces gráficas multiplataforma",
    flaskDesc: "Microframework para desarrollo web",
    djangoDesc: "Framework web completo en Python",
    fastApiDesc: "Framework para APIs de alto rendimiento",
    pyqtDesc: "Desarrollo de interfaces gráficas de escritorio",
    kivyDesc: "Desarrollo de aplicaciones móviles multiplataforma",
    tkinterDesc: "Biblioteca estándar para interfaces gráficas",
    pygameDesc: "Desarrollo de juegos y multimedia",

    // JavaScript frameworks
    reactDesc: "Biblioteca para interfaces de usuario",
    vueDesc: "Framework progresivo para interfaces de usuario",
    nodeDesc: "Entorno de ejecución para JavaScript del lado del servidor",
    expressDesc: "Framework para aplicaciones web en Node.js",
    nextDesc: "Framework de React para aplicaciones web con renderizado del lado del servidor",

    // HTML/CSS frameworks
    tailwindDesc: "Framework CSS de utilidades",
    bootstrapDesc: "Framework CSS para diseño responsive",

    // SQL frameworks
    sqliteDesc: "Sistema de gestión de bases de datos ligero",
    workbenchDesc: "Herramienta visual para MySQL",
    mongoDesc: "Base de datos NoSQL orientada a documentos",

    // Java frameworks
    eclipseDesc: "Entorno de desarrollo integrado para Java",
    apacheDesc: "Servidor web y herramientas",
    javaSeDesc: "Plataforma estándar de Java",
    springDesc: "Framework para aplicaciones empresariales",

    // C/C++ tools
    qtDesc: "Framework para desarrollo de aplicaciones multiplataforma",
    gccDesc: "Compilador para C y C++",

    // Tools skills
    versionControlDesc: "Control de versiones con Git y GitHub",
    prototypeDesc: "Prototipado de interfaces con Figma y Canva",
    unityDesc: "Básico: Desarrollo de proyectos simples en 2D/3D",
    androidstudioDesc: "Diseño y desarrollo de aplicaciones móviles",
    vscodeDesc: "Configuración avanzada y uso eficiente para desarrollo",
    excelDesc: "Análisis de datos, fórmulas avanzadas y visualizaciones",
    dockerDesc: "Contenedores y despliegue de aplicaciones",
    postmanDesc: "Testing y documentación de APIs",
    slackDesc: "Comunicación y colaboración en equipos",
    trelloDesc: "Gestión de proyectos y metodologías ágiles",
    awsDesc: "Servicios en la nube de Amazon - Nivel inicial",
    powerBiDesc: "Herramienta de Business Intelligence para análisis de datos",
    officeDesc: "Suite completa de Microsoft Office (Word, Excel, PowerPoint, Outlook)",
    accessDesc: "Base de datos de Microsoft Access para gestión de información",
    accessDbDesc: "Sistema de gestión de bases de datos de Microsoft",
    postgresDesc: "Sistema de gestión de bases de datos relacional avanzado",
    azureDevOpsDesc: "Plataforma de DevOps de Microsoft para CI/CD",
    gisDesc: "Sistemas de Información Geográfica para análisis espacial",

    // Soft skills
    teamwork: "Trabajo en equipo",
    teamworkDesc: "Colaboración en entornos multidisciplinarios",
    problemSolving: "Resolución de problemas",
    problemSolvingDesc: "Enfoque analítico y soluciones efectivas",
    communication: "Comunicación asertiva",
    communicationDesc: "Definición clara de requisitos y necesidades",
    projectManagement: "Gestión de proyectos",
    projectManagementDesc: "Metodologías ágiles",
    adaptability: "Adaptabilidad",
    adaptabilityDesc: "Rápido aprendizaje ante nuevos retos tecnológicos",
    customerSupport: "Soporte al Cliente",
    customerSupportDesc: "Atención y soporte técnico a usuarios - Nivel inicial",
    agileMethodologies: "Metodologías Ágiles",
    agileMethodologiesDesc: "Scrum, Kanban y prácticas ágiles de desarrollo",
    qualityAssurance: "QA - Control de Calidad",
    qaDesc: "Testing y aseguramiento de calidad en software",

    // Language skills
    spanishLang: "Español",
    spanishDesc: "Nativo",
    englishLang: "Inglés",
    englishDesc: "Nivel A2 - Capacidad para leer, escribir y mantener conversaciones básicas",
    portugueseLang: "Portugués",
    portugueseDesc: "Nivel básico - Comprensión general y frases simples",

    // Projects
    projectsTitle: "Mis Proyectos",
    projectsDescription:
      "Una selección de proyectos en los que he trabajado, desde análisis de datos hasta desarrollo web.",
    all: "Todos",
    python: "Python",
    data: "Datos",
    backend: "Backend",
    frontend: "Frontend",
    ai: "IA",
    code: "Código",
    demo: "Demo",

    // Education - ACTUALIZADO
    educationTitle: "Educación",
    educationDescription: "Mi formación académica y certificaciones obtenidas a lo largo de mi carrera.",
    systemsEngineering: "Ingeniería de Sistemas",
    universidadCentral: "Universidad Central - Bogotá D.C.",
    currentSemester:
      "Cursando 4to año. Semestre actual: 8 en curso. Enfoque en programación, bases de datos, redes y desarrollo de software.",
    highSchool: "Bachiller Académico",
    highSchoolName: "I.E. La Merced - Mosquera, Cundinamarca",
    highSchoolDesc: "Formación académica completa con énfasis en ciencias y matemáticas.",
    coursesAndCertifications: "Cursos y Certificaciones",
    complementaryTraining: "Formación complementaria",
    softSkillsCourse: "Habilidades blandas (2022)",
    softSkillsDesc: "Universidad Central: Desarrollo de comunicación efectiva y trabajo en equipo.",
    infosecCourse: "Seguridad de la información (2023)",
    infosecDesc: "Itzys Colombia: Fundamentos de ciberseguridad, análisis de riesgos y buenas prácticas.",
    softwareDevCourse: "Desarrollo de software (2023)",
    softwareDevDesc: "SENA: Diseño y desarrollo de aplicaciones utilizando metodologías ágiles.",
    present: "Actual",

    // Experience - ACTUALIZADO
    experienceTitle: "Experiencia Laboral",
    experienceDescription: "Mi trayectoria profesional y proyectos en los que he participado.",
    softwareDevelopment: "Desarrollo de Software",
    mcArchitects: "MC_ARQUITECTOS - Universidad Central",
    semester: "2024-2S",
    devResponsibility1: "Desarrollo e implementación de módulos de backend utilizando Django.",
    devResponsibility2: "Integración de bases de datos y servicios.",
    devResponsibility3: "Colaboración en el diseño y arquitectura de software para proyectos internos.",
    featuredProjects: "Proyectos Destacados",
    personalDevelopment: "Desarrollo personal y académico",
    projectEel: "Sistema de Gestión con Eel",
    projectEelDesc:
      "Aplicación de escritorio con interfaz web utilizando Python Eel, HTML, CSS y JavaScript para gestión de inventarios.",
    projectStreamlit: "Dashboard con Streamlit",
    projectStreamlitDesc: "Dashboard interactivo para visualización de datos educativos utilizando Streamlit y Plotly.",
    projectDjango: "API REST con Django",
    projectDjangoDesc:
      "Desarrollo de una API REST utilizando Django Rest Framework para gestionar un sistema de inventario.",

    // Contact
    contactTitle: "Trabajemos juntos",
    contactDescription:
      "Convierte tu idea en un proyecto real con soluciones escalables diseñadas a tu medida.",
    responseTime: "Respuesta en menos de 24h",
    freeConsultation: "Asesoría inicial gratuita",
    availability: "Lun - Sab",
    ctaTitle: "¿Listo para llevar tu idea al siguiente nivel?",
    ctaDescription: "Agenda tu asesoría y descubre cómo puedo ayudarte a implementar soluciones escalables",
    ctaButton: "Solicitar cotización",
    socialNetworks: "Redes Sociales",
    email: "Email",
    phone: "Teléfono",
    name: "Nombre",
    subject: "Asunto",
    message: "Mensaje",
    yourName: "Tu nombre",
    yourEmail: "tu@email.com",
    messageSubject: "Asunto del mensaje",
    yourMessage: "Tu mensaje...",
    sending: "Enviando...",
    sendMessage: "Enviar Mensaje",
    successMessage: "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.",

    // WhatsApp
    whatsapp: "WhatsApp",
    contactDirectly: "Contactar directamente",

    // Footer
    student: "Estudiante de Ingeniería de Sistemas",
    rights: "Todos los derechos reservados.",
    madeWith: "Hecho con",
    using: "usando Next.js y Tailwind CSS",

    // Reviews section
    reviewsTitle: "Reseñas y Testimonios",
    reviewsDescription: "Lo que dicen mis colegas y colaboradores sobre mi trabajo y habilidades profesionales.",

    // About - textos hardcodeados
    aboutParagraph1Updated:
      "Desarrollador Full Stack con sólida formación en Ingeniería de Sistemas, especializado en la creación e implementación de soluciones tecnológicas end-to-end. Combino habilidades técnicas en desarrollo frontend y backend con una metodología orientada a resultados.",
    aboutParagraph2Updated:
      "Me distingo por mi capacidad para adaptarme rápidamente a nuevas tecnologías y frameworks, así como por facilitar la colaboración efectiva en equipos multidisciplinarios. Con un nivel intermedio de inglés, participo activamente en proyectos diversos y mantengo un compromiso constante con el perfeccionamiento de mis habilidades técnicas.",

    // Experience - textos hardcodeados ACTUALIZADO
    currentSemesterText: "Cursando 4to año. Semestre actual: 8 en curso",
    miKazaProject: "Mi Kaza - Plataforma de Reservas",
    miKazaDesc:
      "Aplicación web tipo Airbnb desarrollada con React para gestión de reservas de alojamientos. Incluye sistema de búsqueda, filtros avanzados, gestión de usuarios y proceso de reservas completo.",
    nlpProject: "NLP Processor - Procesador de Lenguaje Natural",
    nlpDesc:
      "Sistema de procesamiento de lenguaje natural que combina React en el frontend con Python en el backend para análisis de texto, sentiment analysis y extracción de información.",
    flightProject: "Sistema de Gestión de Vuelos",
    flightDesc:
      "Plataforma completa para gestión de vuelos con sistema de pagos integrado. Desarrollada con React y JavaScript, incluye reservas, gestión de itinerarios y procesamiento de pagos para viajes.",

    // Skills - textos hardcodeados
    distributionTitle: "Distribución de Habilidades",
    skillsGrowthTitle: "Crecimiento de Habilidades",
    projectTimelineTitle: "Timeline de Proyectos",
    developmentTools: "Herramientas de Desarrollo",
    softSkillsProfile: "Perfil de Habilidades Blandas",
    linguisticCompetence: "Competencia Lingüística",

    // Reviews - textos hardcodeados
    reviewsReceived: "Reseñas recibidas",
    noReviewsYet: "Aún no hay reseñas",
    beFirstReview: "Sé el primero en dejar una reseña y compartir tu experiencia trabajando conmigo.",
    averageRating: "Calificación promedio",
    totalReviews: "Reseñas totales",
    ratingDistribution: "Distribución de Calificaciones",
    leaveReview: "Deja tu Reseña",
    reviewValueMessage: "Tu opinión es muy valiosa para mi crecimiento profesional",
    excellent: "Excelente",
    veryGood: "Muy bueno",
    good: "Bueno",
    regular: "Regular",
    needsImprovement: "Necesita mejorar",
    verified: "Verificado",
    helpful: "Útil",
    thanksForFeedback: "¡Gracias por tu feedback!",
    markedAsHelpful: "Has marcado esta reseña como útil.",
    reviewSent: "¡Reseña enviada!",
    reviewPublished: "Gracias por tu feedback. Tu reseña ha sido publicada.",
    companyNotSpecified: "Empresa no especificada",
    positionNotSpecified: "Posición no especificada",
    company: "Empresa",
    companyName: "Nombre de la empresa",
    position: "Cargo/Posición",
    yourPosition: "Tu cargo o posición",
    rating: "Calificación",
    yourReview: "Tu Reseña",
    shareExperience: "Comparte tu experiencia trabajando conmigo...",
    submitReview: "Enviar Reseña",

    // Projects - textos hardcodeados
    seeMoreProjects: "Ver más proyectos",
    viewPreview: "Ver Preview",
    appInExecution: "Vista de la aplicación en ejecución",
    betterVisualization: "Para una mejor visualización, acceda al documento completo.",
    viewOnGitHub: "Ver Código en GitHub",
    tryDemo: "Probar Demo",
    viewOnGoogleDrive: "Ver en Google Drive",
    basic: "Básico",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    all: "Todos",

    // Education - textos hardcodeados ACTUALIZADO
    currentSemester: "Semestre Actual",
    ofSemesters: "de 10 semestres",
    yearsStudied: "Años Cursados",
    ofYears: "de 5 años",
    credits: "Créditos",
    totalCredits: "de 160 total",
    certifications: "Certificaciones",
    completed: "completadas",
    skillsAcquired: "Habilidades Adquiridas",
    currentSemesterDesc: "Cursando 4to año. Semestre actual: 8 en curso.",
    programmingSkill: "Programación",
    databaseSkill: "Bases de Datos",
    networkingSkill: "Redes",
    webDevelopmentSkill: "Desarrollo Web",
    agileMethodologiesSkill: "Metodologías Ágiles",

    // Experience - estadísticas
    modules: "Módulos",
    efficiency: "Eficiencia",
    framework: "Framework",
    months: "Meses",
    projects: "Proyectos",
    hours: "Horas",
    projectsCompletedStat: "Proyectos Completados",
    technologiesMastered: "Tecnologías Dominadas",
    developmentHours: "Horas de Desarrollo",
    collaborations: "Colaboraciones",
    frontendDevelopment: "Desarrollo Frontend",
    backendDevelopment: "Desarrollo Backend",
    databaseManagement: "Gestión de Bases de Datos",
    fullStackIntegration: "Integración Full Stack",

    // Descripciones de proyectos
    dataAnalysisBasicDesc:
      "Proyecto introductorio de análisis de datos utilizando Python con Tkinter para cargar, visualizar y graficar datos de archivos CSV.",
    notesAppDesc:
      "Aplicación desarrollada en Python con PyQt5 para gestionar notas de manera interactiva. Permite crear, editar, eliminar y adjuntar archivos a las notas, además de visualizar imágenes y archivos Excel directamente en la aplicación.",
    fileControlPanelDesc:
      "Aplicación interactiva desarrollada con Streamlit y Plotly para analizar y visualizar el contenido de archivos subidos por los usuarios. Soporta múltiples formatos como texto, Excel, PDF, Word, CSV, imágenes y Jupyter Notebooks.",
    advancedCurvesDesc:
      "Una aplicación interactiva desarrollada en Python con Pygame que genera curvas avanzadas basadas en guías circulares. Este proyecto es ideal para visualizar conceptos matemáticos y gráficos de manera dinámica.",
    librarySearcherDesc:
      "Una aplicación interactiva para buscar información sobre librerías de Python utilizando la API de PyPI. Descubre detalles como la versión, descripción, autor, licencia y más, además de recomendaciones de librerías similares.",
    storiesSystemDesc:
      "Una aplicación interactiva para generar historias de terror únicas y personalizadas. ¡Elige el tema, la longitud y el estilo de terror, y deja que la magia ocurra!",
    retroGameDesc:
      "Un juego retro desarrollado con HTML, CSS y JavaScript. El jugador controla un objeto que debe esquivar obstáculos mientras acumula puntos. Incluye un sistema de puntuación y una pantalla de 'Juego Terminado' con opción para reiniciar.",
    calculatorDesc:
      "Proyecto básico de calculadora desarrollado con HTML, CSS y JavaScript. La calculadora permite realizar operaciones matemáticas básicas de manera interactiva.",
    githubUsersDesc:
      "Aplicación web que permite buscar usuarios de GitHub y mostrar información relevante sobre ellos, como su avatar, nombre, biografía, y repositorios públicos.",
    snakeGameDesc:
      "Juego clásico de la serpiente desarrollado con HTML, CSS y JavaScript. El objetivo del juego es controlar la serpiente para que coma la comida y crezca, evitando colisionar con los bordes o con su propio cuerpo.",
    nlpProcessorDesc:
      "Sistema avanzado de procesamiento de lenguaje natural para una tienda deportiva. Combina análisis sintáctico y generación automática de respuestas para consultas de productos deportivos. Incluye procesamiento de preguntas predefinidas y análisis léxico en tiempo real.",
    employmentPlatformDesc:
      "Aplicación web para búsqueda de empleo que permite crear perfiles, subir hojas de vida y postularse fácilmente a ofertas laborales. Incluye filtros por ubicación y área, recomendaciones personalizadas y notificaciones en tiempo real.",
    mysqlRegistryDesc:
      "Aplicación de escritorio desarrollada en Python utilizando la biblioteca tkinter para la interfaz gráfica y mysql.connector para la conexión con una base de datos MySQL. Permite gestionar un inventario de productos, incluyendo funcionalidades como agregar, buscar, mostrar y eliminar registros.",
    sqliteQueriesDesc:
      "Aplicación de consola en Python que permite realizar operaciones básicas de gestión de datos utilizando SQLite. Los usuarios pueden interactuar con una base de datos para crear tablas, insertar datos, consultar registros, actualizarlos y eliminarlos.",
    beesProjectionDesc:
      "Aplicación interactiva desarrollada con Streamlit, Plotly y Folium que simula el impacto de la disminución de abejas en la biodiversidad, agricultura y economía en Colombia, permitiendo explorar visualmente sus efectos en ecosistemas.",
    routeCalculatorDesc:
      "Proyecto de métodos numéricos enfocado en la optimización de rutas en almacenes para reducir desplazamientos. Utiliza algoritmos de optimización y análisis de datos para encontrar las rutas más eficientes.",
    miKazaPlatformDesc:
      "Plataforma web completa tipo Airbnb para descubrir alojamientos únicos en toda Colombia. Incluye sistema de búsqueda avanzada, gestión de propiedades, reservas, perfiles de usuario y base de datos robusta para manejar propiedades, usuarios y transacciones.",

    // Títulos de proyectos
    dataAnalysisBasicTitle: "Análisis de Datos Básico",
    notesAppTitle: "Aplicación de Notas",
    fileControlPanelTitle: "Panel de Control de Archivos",
    advancedCurvesTitle: "Curvas Avanzadas",
    librarySearcherTitle: "Buscador de Librerías",
    storiesSystemTitle: "Sistema de Historias",
    retroGameTitle: "Juego Retro",
    calculatorTitle: "Calculadora",
    githubUsersTitle: "Usuarios de GitHub",
    snakeGameTitle: "Snake Game",
    nlpProcessorTitle: "NLP Processor - Procesador de Lenguaje Natural",
    employmentPlatformTitle: "Plataforma de Empleo",
    mysqlRegistryTitle: "Registro de Datos en MySQL",
    sqliteQueriesTitle: "Consultas Básicas con SQLite",
    beesProjectionTitle: "Proyección de Abejas",
    routeCalculatorTitle: "Calculador de Rutas",
    miKazaPlatformTitle: "Mi Kaza - Plataforma de Alojamientos",
  },
  en: {
    // Navbar
    home: "Home",
    about: "Professional Profile",
    skills: "Skills",
    projects: "Projects",
    education: "Education",
    experience: "Experience",
    contact: "Contact",
    reviews: "Reviews",

    // Hero
    heroTitle: "Harry Fishert Lasso Hernández",
    heroSubtitle: "Systems Engineering Student",
    heroDescription:
      "Full Stack Developer specialized in modern web architectures and comprehensive technological solutions.",
    contactMe: "Contact Me",
    viewProjects: "View Projects",
    downloadCV: "Download CV",

    // About
    aboutTitle: "Professional Profile",
    aboutHeading: "Hello! I'm Harry",
    aboutParagraph1:
      "Full Stack Developer with a solid background in Systems Engineering, specialized in creating and implementing end-to-end technological solutions. I combine technical skills in frontend and backend development with a results-oriented methodology.",
    aboutParagraph2:
      "I distinguish myself by my ability to quickly adapt to new technologies and frameworks, as well as facilitating effective collaboration in multidisciplinary teams. With an intermediate level of English, I actively participate in diverse projects and maintain a constant commitment to perfecting my technical skills.",
    age: "Age",
    location: "Location",
    birthDate: "Birth Date",
    languages: "Languages",
    ageValue: "19 years",
    locationValue: "Colombia",
    birthDateValue: "11/03/2005",
    languagesValue: "Spanish (Native), English (A2), Portuguese (basic)",

    // About - professional information
    experience: "Experience",
    experienceValue: "1 year",
    specialization: "Specialization",
    specializationValue: "Full Stack",
    projectsCompleted: "Projects Completed",
    projectsCompletedValue: "15+",
    status: "Status",
    statusValue: "Available",

    // Skills
    skillsTitle: "My Skills",
    skillsDescription:
      "These are the technologies and tools I work with. Python is my main language, but I'm always learning new technologies.",
    programming: "Programming",
    frameworks: "Frameworks",
    tools: "Tools",
    softSkills: "Soft Skills",
    languagesTab: "Languages",

    // Programming skills
    pythonDesc: "Intermediate: Focus on backend development and library management",
    javascriptDesc: "Basic: Knowledge of logic and DOM manipulation",
    htmlcssDesc: "Intermediate: Web design and layout",
    sqlDesc: "Intermediate: Queries and relational database management",
    javacDesc: "Basic: Object-oriented programming and application development",

    // Frameworks categories
    pythonFrameworks: "Python Frameworks",
    jsFrameworks: "JavaScript Frameworks",
    htmlFrameworks: "HTML/CSS Frameworks",
    sqlFrameworks: "Databases",
    javaFrameworks: "Java Frameworks",
    cFrameworks: "C/C++ Tools",

    // Python frameworks
    streamlitDesc: "Web application development with Python",
    fletDesc: "Cross-platform GUI creation",
    flaskDesc: "Micro-framework for web development",
    djangoDesc: "Full-featured web framework in Python",
    fastApiDesc: "High-performance API framework",
    pyqtDesc: "Desktop GUI development",
    kivyDesc: "Cross-platform mobile application development",
    tkinterDesc: "Standard library for GUI interfaces",
    pygameDesc: "Game and multimedia development",

    // JavaScript frameworks
    reactDesc: "Library for user interfaces",
    vueDesc: "Progressive framework for user interfaces",
    nodeDesc: "Server-side JavaScript runtime environment",
    expressDesc: "Web application framework for Node.js",
    nextDesc: "React framework for web applications with server-side rendering",

    // HTML/CSS frameworks
    tailwindDesc: "Utility-first CSS framework",
    bootstrapDesc: "CSS framework for responsive design",

    // SQL frameworks
    sqliteDesc: "Lightweight database management system",
    workbenchDesc: "Visual tool for MySQL",
    mongoDesc: "Document-oriented NoSQL database",

    // Java frameworks
    eclipseDesc: "Integrated development environment for Java",
    apacheDesc: "Web server and tools",
    javaSeDesc: "Java Standard Edition platform",
    springDesc: "Framework for enterprise applications",

    // C/C++ tools
    qtDesc: "Framework for cross-platform application development",
    gccDesc: "Compiler for C and C++",

    // Tools skills
    versionControlDesc: "Version control with Git and GitHub",
    prototypeDesc: "Interface prototyping with Figma and Canva",
    unityDesc: "Basic: Simple 2D/3D project development",
    androidstudioDesc: "Mobile application design and development",
    vscodeDesc: "Advanced configuration and efficient use for development",
    excelDesc: "Data analysis, advanced formulas and visualizations",
    dockerDesc: "Containers and application deployment",
    postmanDesc: "API testing and documentation",
    slackDesc: "Team communication and collaboration",
    trelloDesc: "Project management and agile methodologies",
    awsDesc: "Amazon Web Services - Initial level",
    powerBiDesc: "Business Intelligence tool for data analysis and visualization",
    officeDesc: "Complete Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)",
    accessDesc: "Microsoft Access database for information management",
    accessDbDesc: "Microsoft database management system",
    postgresDesc: "Advanced relational database management system",
    azureDevOpsDesc: "Microsoft DevOps platform for CI/CD",
    gisDesc: "Geographic Information Systems for spatial analysis",

    // Soft skills
    teamwork: "Teamwork",
    teamworkDesc: "Collaboration in multidisciplinary environments",
    problemSolving: "Problem Solving",
    problemSolvingDesc: "Analytical approach and effective solutions",
    communication: "Assertive Communication",
    communicationDesc: "Clear definition of requirements and needs",
    projectManagement: "Project Management",
    projectManagementDesc: "Agile methodologies",
    adaptability: "Adaptability",
    adaptabilityDesc: "Quick learning when facing new technological challenges",
    customerSupport: "Customer Support",
    customerSupportDesc: "Customer service and technical support - Initial level",
    agileMethodologies: "Agile Methodologies",
    agileMethodologiesDesc: "Scrum, Kanban and agile development practices",
    qualityAssurance: "QA - Quality Assurance",
    qaDesc: "Software testing and quality assurance",

    // Language skills
    spanishLang: "Spanish",
    spanishDesc: "Native",
    englishLang: "English",
    englishDesc: "A2 Level - Ability to read, write and maintain basic conversations",
    portugueseLang: "Portuguese",
    portugueseDesc: "Basic level - General comprehension and simple phrases",

    // Projects
    projectsTitle: "My Projects",
    projectsDescription: "A selection of projects I've worked on, from data analysis to web development.",
    all: "All",
    python: "Python",
    data: "Data",
    backend: "Backend",
    frontend: "Frontend",
    ai: "AI",
    code: "Code",
    demo: "Demo",

    // Education - ACTUALIZADO
    educationTitle: "Education",
    educationDescription: "My academic background and certifications obtained throughout my career.",
    systemsEngineering: "Systems Engineering",
    universidadCentral: "Universidad Central - Bogotá D.C.",
    currentSemester:
      "Currently in 4th year. Current semester: 8 in progress. Focus on programming, databases, networks, and software development.",
    highSchool: "Academic High School",
    highSchoolName: "I.E. La Merced - Mosquera, Cundinamarca",
    highSchoolDesc: "Complete academic training with emphasis on science and mathematics.",
    coursesAndCertifications: "Courses and Certifications",
    complementaryTraining: "Complementary training",
    softSkillsCourse: "Soft skills (2022)",
    softSkillsDesc: "Universidad Central: Development of effective communication and teamwork.",
    infosecCourse: "Information security (2023)",
    infosecDesc: "Itzys Colombia: Cybersecurity fundamentals, risk analysis, and best practices.",
    softwareDevCourse: "Software development (2023)",
    softwareDevDesc: "SENA: Design and development of applications using agile methodologies.",
    present: "Present",

    // Experience - ACTUALIZADO
    experienceTitle: "Work Experience",
    experienceDescription: "My professional career and projects I've participated in.",
    softwareDevelopment: "Software Development",
    mcArchitects: "MC_ARQUITECTOS - Universidad Central",
    semester: "2024-2S",
    devResponsibility1: "Development and implementation of backend modules using Django.",
    devResponsibility2: "Database and service integration.",
    devResponsibility3: "Collaboration in software design and architecture for internal projects.",
    featuredProjects: "Featured Projects",
    personalDevelopment: "Personal and academic development",
    projectEel: "Management System with Eel",
    projectEelDesc:
      "Desktop application with web interface using Python Eel, HTML, CSS and JavaScript for inventory management.",
    projectStreamlit: "Dashboard with Streamlit",
    projectStreamlitDesc: "Interactive dashboard for educational data visualization using Streamlit and Plotly.",
    projectDjango: "REST API with Django",
    projectDjangoDesc: "Development of a REST API using Django Rest Framework to manage an inventory system.",

// Contact
  contactTitle: "Let's work together",
  contactDescription:
  "Turn your idea into a real project with scalable solutions designed for you.",
  responseTime: "Response within 24h",
  freeConsultation: "Free initial consultation",
  availability: "Mon - Sat",
  ctaTitle: "Ready to take your idea to the next level?",
  ctaDescription: "Schedule your consultation and discover how I can help you implement scalable solutions",
    ctaButton: "Request quote",
    socialNetworks: "Social Networks",
    email: "Email",
    phone: "Phone",
    name: "Name",
    subject: "Subject",
    message: "Message",
    yourName: "Your name",
    yourEmail: "your@email.com",
    messageSubject: "Message subject",
    yourMessage: "Your message...",
    sending: "Sending...",
    sendMessage: "Send Message",
    successMessage: "Message sent successfully! I'll get back to you soon.",

    // WhatsApp
    whatsapp: "WhatsApp",
    contactDirectly: "Contact directly",

    // Footer
    student: "Systems Engineering Student",
    rights: "All rights reserved.",
    madeWith: "Made with",
    using: "using Next.js and Tailwind CSS",

    // Reviews section
    reviewsTitle: "Reviews & Testimonials",
    reviewsDescription: "What my colleagues and collaborators say about my work and professional skills.",

    // About - textos hardcodeados
    aboutParagraph1Updated:
      "Full Stack Developer with a solid background in Systems Engineering, specialized in creating and implementing end-to-end technological solutions. I combine technical skills in frontend and backend development with a results-oriented methodology.",
    aboutParagraph2Updated:
      "I distinguish myself by my ability to quickly adapt to new technologies and frameworks, as well as facilitating effective collaboration in multidisciplinary teams. With an intermediate level of English, I actively participate in diverse projects and maintain a constant commitment to perfecting my technical skills.",

    // Experience - textos hardcodeados ACTUALIZADO
    currentSemesterText: "Currently in 4th year. Current semester: 8 in progress",
    miKazaProject: "Mi Kaza - Booking Platform",
    miKazaDesc:
      "Airbnb-type web application developed with React for accommodation booking management. Includes search system, advanced filters, user management and complete booking process.",
    nlpProject: "NLP Processor - Natural Language Processor",
    nlpDesc:
      "Natural language processing system that combines React on the frontend with Python on the backend for text analysis, sentiment analysis and information extraction.",
    flightProject: "Flight Management System",
    flightDesc:
      "Complete platform for flight management with integrated payment system. Developed with React and JavaScript, includes reservations, itinerary management and payment processing for travel.",

    // Skills - textos hardcodeados
    distributionTitle: "Skills Distribution",
    skillsGrowthTitle: "Skills Growth",
    projectTimelineTitle: "Project Timeline",
    developmentTools: "Development Tools",
    softSkillsProfile: "Soft Skills Profile",
    linguisticCompetence: "Linguistic Competence",

    // Reviews - textos hardcodeados
    reviewsReceived: "Reviews received",
    noReviewsYet: "No reviews yet",
    beFirstReview: "Be the first to leave a review and share your experience working with me.",
    averageRating: "Average rating",
    totalReviews: "Total reviews",
    ratingDistribution: "Rating Distribution",
    leaveReview: "Leave Your Review",
    reviewValueMessage: "Your opinion is very valuable for my professional growth",
    excellent: "Excellent",
    veryGood: "Very good",
    good: "Good",
    regular: "Regular",
    needsImprovement: "Needs improvement",
    verified: "Verified",
    helpful: "Helpful",
    thanksForFeedback: "Thanks for your feedback!",
    markedAsHelpful: "You have marked this review as helpful.",
    reviewSent: "Review sent!",
    reviewPublished: "Thanks for your feedback. Your review has been published.",
    companyNotSpecified: "Company not specified",
    positionNotSpecified: "Position not specified",
    company: "Company",
    companyName: "Company name",
    position: "Position",
    yourPosition: "Your position",
    rating: "Rating",
    yourReview: "Your Review",
    shareExperience: "Share your experience working with me...",
    submitReview: "Submit Review",

    // Projects - textos hardcodeados
    seeMoreProjects: "See more projects",
    viewPreview: "View Preview",
    appInExecution: "Application execution view",
    betterVisualization: "For better visualization, access the complete document.",
    viewOnGitHub: "View Code on GitHub",
    tryDemo: "Try Demo",
    viewOnGoogleDrive: "View on Google Drive",
    basic: "Basic",
    intermediate: "Intermediate",
    advanced: "Advanced",
    all: "All",

    // Education - textos hardcodeados ACTUALIZADO
    currentSemester: "Current Semester",
    ofSemesters: "of 10 semesters",
    yearsStudied: "Years Studied",
    ofYears: "of 5 years",
    credits: "Credits",
    totalCredits: "of 160 total",
    certifications: "Certifications",
    completed: "completed",
    skillsAcquired: "Skills Acquired",
    currentSemesterDesc: "Currently in 4th year. Current semester: 8 in progress.",
    programmingSkill: "Programming",
    databaseSkill: "Databases",
    networkingSkill: "Networking",
    webDevelopmentSkill: "Web Development",
    agileMethodologiesSkill: "Agile Methodologies",

    // Experience - estadísticas
    modules: "Modules",
    efficiency: "Efficiency",
    framework: "Framework",
    months: "Months",
    projects: "Projects",
    hours: "Hours",
    projectsCompletedStat: "Projects Completed",
    technologiesMastered: "Technologies Mastered",
    developmentHours: "Development Hours",
    collaborations: "Collaborations",
    frontendDevelopment: "Frontend Development",
    backendDevelopment: "Backend Development",
    databaseManagement: "Database Management",
    fullStackIntegration: "Full Stack Integration",

    // Descripciones de proyectos en inglés
    dataAnalysisBasicDesc:
      "Introductory data analysis project using Python with Tkinter to load, visualize and graph data from CSV files.",
    notesAppDesc:
      "Application developed in Python with PyQt5 to manage notes interactively. Allows creating, editing, deleting and attaching files to notes, as well as viewing images and Excel files directly in the application.",
    fileControlPanelDesc:
      "Interactive application developed with Streamlit and Plotly to analyze and visualize the content of files uploaded by users. Supports multiple formats such as text, Excel, PDF, Word, CSV, images and Jupyter Notebooks.",
    advancedCurvesDesc:
      "An interactive application developed in Python with Pygame that generates advanced curves based on circular guides. This project is ideal for visualizing mathematical and graphical concepts dynamically.",
    librarySearcherDesc:
      "An interactive application to search for information about Python libraries using the PyPI API. Discover details like version, description, author, license and more, plus recommendations for similar libraries.",
    storiesSystemDesc:
      "An interactive application to generate unique and personalized horror stories. Choose the theme, length and horror style, and let the magic happen!",
    retroGameDesc:
      "A retro game developed with HTML, CSS and JavaScript. The player controls an object that must dodge obstacles while accumulating points. Includes a scoring system and a 'Game Over' screen with restart option.",
    calculatorDesc:
      "Basic calculator project developed with HTML, CSS and JavaScript. The calculator allows performing basic mathematical operations interactively.",
    githubUsersDesc:
      "Web application that allows searching for GitHub users and displaying relevant information about them, such as their avatar, name, biography, and public repositories.",
    snakeGameDesc:
      "Classic snake game developed with HTML, CSS and JavaScript. The goal of the game is to control the snake to eat food and grow, avoiding colliding with the edges or its own body.",
    nlpProcessorDesc:
      "Advanced natural language processing system for a sports store. Combines syntactic analysis and automatic response generation for sports product queries. Includes predefined question processing and real-time lexical analysis.",
    employmentPlatformDesc:
      "Web application for job searching that allows creating profiles, uploading resumes and easily applying to job offers. Includes filters by location and area, personalized recommendations and real-time notifications.",
    mysqlRegistryDesc:
      "Desktop application developed in Python using the tkinter library for the graphical interface and mysql.connector for connection to a MySQL database. Allows managing a product inventory, including functionalities such as adding, searching, displaying and deleting records.",
    sqliteQueriesDesc:
      "Console application in Python that allows performing basic data management operations using SQLite. Users can interact with a database to create tables, insert data, query records, update and delete them.",
    beesProjectionDesc:
      "Interactive application developed with Streamlit, Plotly and Folium that simulates the impact of bee decline on biodiversity, agriculture and economy in Colombia, allowing visual exploration of their effects on ecosystems.",
    routeCalculatorDesc:
      "Numerical methods project focused on route optimization in warehouses to reduce travel. Uses optimization algorithms and data analysis to find the most efficient routes.",
    miKazaPlatformDesc:
      "Complete Airbnb-type web platform to discover unique accommodations throughout Colombia. Includes advanced search system, property management, reservations, user profiles and robust database to handle properties, users and transactions.",

    // Títulos de proyectos
    dataAnalysisBasicTitle: "Basic Data Analysis",
    notesAppTitle: "Notes Application",
    fileControlPanelTitle: "File Control Panel",
    advancedCurvesTitle: "Advanced Curves",
    librarySearcherTitle: "Library Searcher",
    storiesSystemTitle: "Stories System",
    retroGameTitle: "Retro Game",
    calculatorTitle: "Calculator",
    githubUsersTitle: "GitHub Users",
    snakeGameTitle: "Snake Game",
    nlpProcessorTitle: "NLP Processor - Natural Language Processor",
    employmentPlatformTitle: "Employment Platform",
    mysqlRegistryTitle: "MySQL Data Registry",
    sqliteQueriesTitle: "Basic SQLite Queries",
    beesProjectionTitle: "Bees Projection",
    routeCalculatorTitle: "Route Calculator",
    miKazaPlatformTitle: "Mi Kaza - Accommodation Platform",
  },
}
