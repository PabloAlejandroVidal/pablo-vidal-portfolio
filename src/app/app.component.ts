import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, RouterModule, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoaded$ = this.translationService.isLoaded$;

  constructor(private translationService: TranslationService) {}

  title = 'pablo-vidal-portfolio';
}
