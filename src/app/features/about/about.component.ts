import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public translation = inject(TranslationService);

  readonly language$ = this.translation.languageChanges$;

}
