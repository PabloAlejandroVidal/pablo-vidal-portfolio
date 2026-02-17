// src/app/features/projects/projects.data.ts
export type ProjectId = 'debAndLopers' | 'clinicaOnline' | 'portfolio' | 'salaDeJuegos';

export interface Project {
  id: ProjectId;
  // Claves de traducción para textos
  titleKey: string;
  shortDescriptionKey: string;
  roleKey: string;          // "Rol" (ej: "Fullstack developer")
  contextKey: string;       // contexto (ej: "Proyecto académico UTN")
  responsibilitiesKey: string; // bullet general “Responsabilidades principales”
  techStack: string[];      // tags visibles, sin i18n (Angular, Ionic, etc.)

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
    year: '2025',
    techStack: ['Angular', 'Ionic', 'Supabase', 'Firebase', 'TypeScript'],
    liveUrl: 'laboratorio-4-13a5b.web.app',    // ajustás vos
    repoUrl: 'https://github.com/tu-usuario/debAndLopers'
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
    liveUrl: 'labo4-c2-tp2.web.app',
    repoUrl: 'https://github.com/PabloAlejandroVidal/Labo4-C2-TP2'
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
    liveUrl: 'laboratorio-4-13a5b.web.app/',
    repoUrl: 'https://github.com/PabloAlejandroVidal/Labo4-SalaDeJuegos-Angular'
  },
  {
    id: 'portfolio',
    titleKey: 'projects.items.portfolio.title',
    shortDescriptionKey: 'projects.items.portfolio.shortDescription',
    roleKey: 'projects.items.portfolio.role',
    contextKey: 'projects.items.portfolio.context',
    responsibilitiesKey: 'projects.items.portfolio.responsibilities',
    year: '2025',
    techStack: ['Angular', 'TypeScript', 'GitHub Pages'],
    liveUrl: 'https://pabloalejandrovidal.github.io/pablo-vidal-portfolio/',
    repoUrl: 'https://github.com/PabloAlejandroVidal/pablo-vidal-portfolio'
  }
];
