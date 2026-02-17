// src/app/features/projects/project-detail.component.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project, PROJECTS } from '../projects.data';
import { TranslationService } from '../../../core/services/translation.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  project: Project | undefined;
  public translation = inject(TranslationService);
  readonly language$ = this.translation.languageChanges$;

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = PROJECTS.find(p => p.id === id);
  }
}
