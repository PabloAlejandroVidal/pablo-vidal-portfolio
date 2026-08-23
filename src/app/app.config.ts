import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LangCode, TranslationService } from './core/services/translation.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      // Las rutas del landing comparten el mismo documento. La posición
      // debe quedar bajo el control del scroll del usuario, no del Router.
      scrollPositionRestoration: 'disabled',
    })),
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
