import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LangCode, TranslationService } from '../../services/translation.service';

interface LangOption {
  code: LangCode;
  label: string;
  flag: string;   // emoji
  icon?: string;  // si después querés usar assets
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnDestroy {
  languages: LangOption[] = [
    { code: 'es', label: 'Español',          flag: '🇦🇷',  icon: 'https://flagicons.lipis.dev/flags/4x3/ar.svg' },
    { code: 'en', label: 'English',          flag: '🇬🇧',  icon: 'https://flagicons.lipis.dev/flags/4x3/gb.svg' },
    { code: 'pt', label: 'Português',        flag: '🇧🇷',  icon: 'https://flagicons.lipis.dev/flags/4x3/br.svg' },
    { code: 'fr', label: 'Français',         flag: '🇫🇷',  icon: 'https://flagicons.lipis.dev/flags/4x3/fr.svg' },
    { code: 'fi', label: 'Suomi',            flag: '🇫🇮',  icon: 'https://flagicons.lipis.dev/flags/4x3/fi.svg' },
    { code: 'no', label: 'Norsk (Bokmål)',   flag: '🇳🇴',  icon: 'https://flagicons.lipis.dev/flags/4x3/no.svg' },
  ];

  currentLang: LangCode = 'es';
  isOpen = false;
  isChanging = false;

  private langSub = new Subscription();

  constructor(private translation: TranslationService) {
    this.currentLang = this.translation.currentLanguage;

    this.langSub = this.translation.languageChanges$.subscribe((lang) => {
      this.currentLang = lang;
      this.isChanging = false;
    });
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  toggleMenu() {
    if (this.isChanging) return;
    this.isOpen = !this.isOpen;
  }

  async selectLang(lang: LangCode) {
    if (lang === this.currentLang || this.isChanging) {
      this.isOpen = false;
      return;
    }

    this.isChanging = true;

    try {
      await this.translation.loadLanguage(lang);
    } catch (err) {
      console.error('[LanguageSwitcher] Error al cambiar idioma', err);
      // el servicio ya hace fallback, acá solo registramos si queremos
    } finally {
      // Nos aseguramos de que el UI no quede trabado
      this.isChanging = false;
      this.isOpen = false;
    }
  }


  get currentLangOption(): LangOption | undefined {
    return this.languages.find((l) => l.code === this.currentLang);
  }
}
