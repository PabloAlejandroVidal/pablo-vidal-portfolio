import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROJECTS, Project } from './projects.data';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = PROJECTS;
  public translation = inject(TranslationService);
  readonly language$ = this.translation.languageChanges$;
}
