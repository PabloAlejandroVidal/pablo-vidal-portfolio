// src/app/features/projects/projects.data.ts
export type ProjectId = 'debAndLopers' | 'laComanda' | 'clinicaOnline' | 'salaDeJuegos';

export interface Project {
  id: ProjectId;
  // Claves de traducción para textos
  titleKey: string;
  shortDescriptionKey: string;
  roleKey: string;          // "Rol" (ej: "Fullstack developer")
  contextKey: string;       // contexto (ej: "Proyecto académico UTN")
  responsibilitiesKey: string; // bullet general “Responsabilidades principales”
  techStack: string[];      // tags visibles, sin i18n (Angular, Ionic, etc.)
  backgroundImage?: string; // imagen opcional para el fondo de la tarjeta

  year: string;             // "2025", "2024-2025"
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'debAndLopers',
    titleKey: 'projects.items.debAndLopers.title',
    shortDescriptionKey: 'projects.items.debAndLopers.shortDescription',
    roleKey: 'projects.items.debAndLopers.role',
    contextKey: 'projects.items.debAndLopers.context',
    responsibilitiesKey: 'projects.items.debAndLopers.responsibilities',
    year: '2026',
    techStack: ['Angular', 'Ionic', 'TypeScript', 'Supabase', 'PostgreSQL'],
    backgroundImage: 'assets/debandlopers-bg.png',
  },
  {
    id: 'laComanda',
    titleKey: 'projects.items.laComanda.title',
    shortDescriptionKey: 'projects.items.laComanda.shortDescription',
    roleKey: 'projects.items.laComanda.role',
    contextKey: 'projects.items.laComanda.context',
    responsibilitiesKey: 'projects.items.laComanda.responsibilities',
    year: '2026',
    backgroundImage: 'assets/lacomanda-bg.png',
    techStack: ['PHP 8', 'Slim', 'MySQL', 'PDO', 'JWT', 'REST API'],
    repoUrl: 'https://github.com/PabloAlejandroVidal/LaComanda-Slim-API',
  },
  {
    id: 'clinicaOnline',
    titleKey: 'projects.items.clinicaOnline.title',
    shortDescriptionKey: 'projects.items.clinicaOnline.shortDescription',
    roleKey: 'projects.items.clinicaOnline.role',
    contextKey: 'projects.items.clinicaOnline.context',
    responsibilitiesKey: 'projects.items.clinicaOnline.responsibilities',
    year: '2025',
    techStack: ['Angular', 'Firebase', 'Firestore'],
    backgroundImage: 'assets/clinica-bg.png',
    liveUrl: 'https://labo4-c2-tp2.web.app',
    repoUrl: 'https://github.com/PabloAlejandroVidal/Labo4-C2-TP2',
  },
  {
    id: 'salaDeJuegos',
    titleKey: 'projects.items.salaDeJuegos.title',
    shortDescriptionKey: 'projects.items.salaDeJuegos.shortDescription',
    roleKey: 'projects.items.salaDeJuegos.role',
    contextKey: 'projects.items.salaDeJuegos.context',
    responsibilitiesKey: 'projects.items.salaDeJuegos.responsibilities',
    year: '2025',
    techStack: ['Angular', 'Firebase', 'Firestore'],
    backgroundImage: 'assets/saladejuegos-bg.png',
    liveUrl: 'https://laboratorio-4-13a5b.web.app/',
    repoUrl: 'https://github.com/PabloAlejandroVidal/Labo4-SalaDeJuegos-Angular'
  },
];
