import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LangCode, TranslationService } from './core/services/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslations,
      deps: [TranslationService],
      multi: true,
    },
  ],
};

export function initTranslations(service: TranslationService) {
  return () => {
    const savedLang = localStorage.getItem('app_lang') as LangCode | null;
    const initialLang = savedLang ?? 'es';
    return service.loadLanguage(initialLang);
  };
}
