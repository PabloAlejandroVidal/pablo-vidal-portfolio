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
  private readonly defaultLang: LangCode = 'es';

  private currentLang$ = new BehaviorSubject<LangCode>(this.defaultLang);
  private translations: Translations = {};
  private loaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Cargamos el idioma por defecto al inicio
    this.loadLanguage(this.defaultLang);
  }

  get languageChanges$() {
    return this.currentLang$.asObservable();
  }

  get isLoaded$() {
    return this.loaded$.asObservable();
  }

  get currentLanguage(): LangCode {
    return this.currentLang$.value;
  }

  private async fetchTranslations(lang: LangCode): Promise<Translations> {
    return await firstValueFrom(
      this.http.get<Translations>(`assets/i18n/${lang}.json`)
    );
  }

  async loadLanguage(lang: LangCode): Promise<void> {
    this.loaded$.next(false);

    try {
      // 1) Intentar cargar el idioma solicitado
      const data = await this.fetchTranslations(lang);
      this.translations = data;
      this.currentLang$.next(lang);
    } catch (error) {
      console.warn(
        `[TranslationService] No se pudo cargar el idioma "${lang}".`,
        error
      );

      // 2) Intentar fallback SOLO si no es ya el idioma por defecto
      if (lang !== this.defaultLang) {
        try {
          console.info(
            `[TranslationService] Usando idioma por defecto "${this.defaultLang}" como fallback.`
          );
          const fallback = await this.fetchTranslations(this.defaultLang);
          this.translations = fallback;
          this.currentLang$.next(this.defaultLang);
        } catch (fallbackError) {
          console.error(
            `[TranslationService] También falló el fallback "${this.defaultLang}". Mantengo traducciones anteriores.`,
            fallbackError
          );
          // acá NO cambiamos translations ni currentLang
        }
      }
    } finally {
      this.loaded$.next(true);
    }
  }

  t(key: string): string {
    if (!this.loaded$.value) {
      return '';
    }

    return this.translations[key] ?? key;
  }
}
