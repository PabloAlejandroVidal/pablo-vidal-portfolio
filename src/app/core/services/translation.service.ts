import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';

type Translations = Record<string, string>;

// Tipos de idioma soportados
export type LangCode = 'es' | 'en' | 'pt' | 'fr' | 'fi' | 'no';
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly defaultLang: LangCode = 'es';
  private readonly storageKey = 'app_lang';

  private currentLang$ = new BehaviorSubject<LangCode>(this.defaultLang);

  private translations: Translations = {};
  private cache = new Map<LangCode, Translations>();

  constructor(private http: HttpClient) {
    const savedLang = this.getPersistedLang();
    const initialLang = savedLang ?? this.defaultLang;

    this.loadLanguage(initialLang);
  }

  get languageChanges$() {
    return this.currentLang$.asObservable();
  }

  get currentLanguage(): LangCode {
    return this.currentLang$.value;
  }


  private getPersistedLang(): LangCode | null {
    const value = localStorage.getItem(this.storageKey);
    return value as LangCode | null;
  }

  private persistLang(lang: LangCode) {
    localStorage.setItem(this.storageKey, lang);
  }

  async loadLanguage(lang: LangCode): Promise<void> {
    // Evitar recarga si ya estamos en ese idioma y tenemos datos
    if (lang === this.currentLang$.value && this.cache.has(lang)) {
      return;
    }

    // Cache en memoria
    if (this.cache.has(lang)) {
      this.translations = this.cache.get(lang)!;
      this.currentLang$.next(lang);
      this.persistLang(lang);
      return;
    }

    try {
      await this.loadJson(lang);
      this.currentLang$.next(lang);
      this.persistLang(lang);
    } catch {
      if (lang !== this.defaultLang) {
        await this.loadLanguage(this.defaultLang);
      }
    }
  }

  async loadJson(lang: LangCode) {
    const data = await firstValueFrom(
        this.http.get<Translations>(`assets/i18n/${lang}.json`)
      );

    this.cache.set(lang, data);
    this.translations = data;
  }

  t(key: string): string {
    return this.translations[key] ?? key;
  }

}
