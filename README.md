Perfecto. Te lo dejo completamente como texto plano en formato Markdown, sin bloques anidados que rompan el copiado. Podés copiarlo tal cual y pegarlo en tu `README.md`.

---

# Pablo Vidal – Portfolio Web

## Descripción

Este es mi portfolio personal desarrollado en Angular. Presenta mis proyectos, trabajos prácticos, habilidades técnicas y experiencia como desarrollador fullstack.

El objetivo del sitio es:

* Mostrar mi evolución profesional.
* Organizar mis proyectos de forma clara y estructurada.
* Servir como carta de presentación para oportunidades laborales.
* Integrar fácilmente nuevos trabajos a medida que los desarrollo.

El enfoque principal está en una arquitectura frontend limpia, modular y escalable.

---

## Tecnologías utilizadas

* Angular 17
* TypeScript
* HTML / SCSS
* ChangeDetectionStrategy.OnPush
* RxJS
* APP_INITIALIZER
* Git / GitHub
* Firebase Hosting o GitHub Pages

---

## Arquitectura

El proyecto implementa decisiones técnicas enfocadas en claridad, rendimiento y escalabilidad:

* Uso consistente de `OnPush` en todos los componentes para optimización de Change Detection.
* Sistema de internacionalización (i18n) personalizado con:

  * Carga dinámica de archivos JSON.
  * Caché en memoria.
  * Persistencia de idioma en localStorage.
  * Inicialización previa al bootstrap mediante APP_INITIALIZER para evitar renderizado intermedio.
* Estado de idioma centralizado en un servicio reactivo.
* Diseño modular y componentes reutilizables.
* Separación clara entre capa de estado y capa de presentación.

El objetivo fue mantener una arquitectura simple pero sólida, sin dependencias externas innecesarias.

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone [https://github.com/PabloAlejandroVidal/pablo-vidal-portfolio.git](https://github.com/PabloAlejandroVidal/pablo-vidal-portfolio.git)
cd pablo-vidal-portfolio

### 2. Instalar dependencias

npm install

### 3. Ejecutar en modo desarrollo

ng serve

Disponible en:
[http://localhost:4200](http://localhost:4200)

---

## Deploy

### GitHub Pages

npm run deploy

El script construye la aplicación con la configuración `production`, valida el
`base href`, genera `404.html` y publica `dist/pablo-vidal-portfolio/browser`
en la rama `gh-pages`.

En GitHub, la fuente de Pages debe estar configurada como:
Settings → Pages → Deploy from a branch → `gh-pages` → `/ (root)`.

La social preview se publica como
`src/assets/pablo-vidal-social-preview.webp` y se referencia desde Open Graph
y Twitter/X mediante la URL pública bajo `/pablo-vidal-portfolio/assets/`.

---

## Contacto

* Email: [pabloalejandrovidal@gmail.com](mailto:pabloalejandrovidal@gmail.com)
* GitHub: [https://github.com/PabloAlejandroVidal](https://github.com/PabloAlejandroVidal)
* LinkedIn: [https://www.linkedin.com/in/pablo-vidal-2970b6195/](https://www.linkedin.com/in/pablo-vidal-2970b6195/)

---

## Licencia

Este proyecto está bajo licencia MIT. Puede utilizarse como referencia para portfolios personales.

---

Si querés, después podemos hacer una versión aún más sintética y orientada a recruiters (más impacto y menos detalle técnico).
