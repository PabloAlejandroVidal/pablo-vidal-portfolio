import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

type Translations = Record<string, string>;

// Tipos de idioma soportados
export type LangCode = 'es' | 'en' | 'pt' | 'fr' | 'fi' | 'no';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Ahora el BehaviorSubject tipado correctamente
  private currentLang$ = new BehaviorSubject<LangCode>('es');
  private translations: Translations = {};
  private loaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadLanguage('es');
  }

  get languageChanges$() {
    // Devuelve observable con tipo LangCode
    return this.currentLang$.asObservable();
  }

  get isLoaded$() {
    return this.loaded$.asObservable();
  }

  get currentLanguage(): LangCode {
    return this.currentLang$.value;
  }

  async loadLanguage(lang: LangCode): Promise<void> {
    this.loaded$.next(false);

    const data = await firstValueFrom(
      this.http.get<Translations>(`assets/i18n/${lang}.json`)
    );

    this.translations = data;
    this.currentLang$.next(lang);
    this.loaded$.next(true);
  }

  t(key: string): string {
    if (!this.loaded$.value) {
      return '';
    }

    return this.translations[key] ?? key;
  }
}
