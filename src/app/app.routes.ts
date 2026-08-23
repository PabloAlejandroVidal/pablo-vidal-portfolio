import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const landingSections = new Set(['projects', 'about', 'contact']);

const landingMatcher = (segments: UrlSegment[]): UrlMatchResult | null => {
  if (segments.length === 0) {
    return { consumed: [] };
  }

  const section = segments[0].path;
  if (segments.length === 1 && landingSections.has(section)) {
    return {
      consumed: segments,
      posParams: { section: segments[0] },
    };
  }

  return null;
};

export const routes: Routes = [
  { path: 'projects/:id', loadComponent: () =>
    import('./features/projects/project-detail/project-detail.component')
      .then((m) => m.ProjectDetailComponent)
  },
  { matcher: landingMatcher, component: HomeComponent },
  { path: '**', redirectTo: '' },
];
