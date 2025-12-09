import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslatePipe } from './shared/pipes/translate.pipe';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslationService } from './core/services/translation.service';
import { LanguageSwitcherComponent } from "./core/components/language-switcher/language-switcher.component";
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoaded$ = this.translationService.isLoaded$;

  constructor(private translationService: TranslationService) {}

  currentYear = new Date().getFullYear();
}
