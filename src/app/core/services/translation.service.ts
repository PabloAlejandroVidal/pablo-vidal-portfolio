import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

type Translations = Record<string, string>;

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang$ = new BehaviorSubject<string>('es');
  private translations: Translations = {};
  private loaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadLanguage('es');
  }

  get languageChanges$() {
    return this.currentLang$.asObservable();
  }

  get isLoaded$() {
    return this.loaded$.asObservable();
  }

  get currentLanguage(): string {
    return this.currentLang$.value;
  }

  async loadLanguage(lang: string): Promise<void> {
    this.loaded$.next(false);
    const data = await firstValueFrom(
      this.http.get<Translations>(`assets/i18n/${lang}.json`)
    );
    this.translations = data;
    this.currentLang$.next(lang);
    this.loaded$.next(true);
  }

  t(key: string): string {
    // Mientras no cargó el JSON, no mostrés la clave
    if (!this.loaded$.value) {
      return '';
    }

    // Si cargó y falta la clave, ahí sí devolvemos la clave (para debug)
    return this.translations[key] ?? key;
  }
}
