# Pablo Vidal – Portfolio Web

## Descripción

Este es mi portfolio personal, desarrollado en Angular, donde presento mis proyectos, trabajos prácticos, habilidades y experiencia como desarrollador fullstack.

El sitio está pensado para:

* Mostrar mi crecimiento profesional
* Organizar mis proyectos de forma clara
* Servir como carta de presentación para oportunidades laborales
* Integrarse fácilmente con nuevos trabajos a medida que los voy creando

Incluye un diseño moderno, navegación fluida y componentes reutilizables.

---

## Tecnologías utilizadas

* Angular 17
* TypeScript
* HTML / SCSS / CSS
* Ionic (opcional para UI y responsividad)
* Firebase Hosting / GitHub Pages (pendiente de definir)
* Git / GitHub

---

## Arquitectura

* Estrategia OnPush para optimización de Change Detection.
* Sistema de internacionalización personalizado con carga dinámica y caché.
* Persistencia de preferencias de usuario (idioma).
* Inicialización previa al bootstrap mediante APP_INITIALIZER.
* Diseño modular y componentes reutilizables.

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```
git clone https://github.com/PabloAlejandroVidal/pablo-vidal-portfolio.git
cd pablo-vidal-portfolio
```

### 2. Instalar dependencias

```
npm install
```

### 3. Ejecutar en modo desarrollo

```
ng serve
```

El sitio quedará disponible en:
[http://localhost:4200](http://localhost:4200)

---

## Deploy

### GitHub Pages

```
ng build --output-path docs --base-href /pablo-vidal-portfolio/
git add .
git commit -m "Deploy"
git push
```

En GitHub:
Settings → Pages → Branch: main → Folder: /docs

---

### Firebase Hosting

```
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

(Deploy pendiente hasta definir hosting final.)

---

## Contacto

* Email: [pabloalejandrovidal@gmail.com](mailto:pabloalejandrovidal@gmail.com)
* GitHub: [https://github.com/PabloAlejandroVidal](https://github.com/PabloAlejandroVidal)
* LinkedIn: [https://www.linkedin.com/in/pablo-vidal-2970b6195/](https://www.linkedin.com/in/pablo-vidal-2970b6195/)

---

## Licencia

Este proyecto está bajo licencia MIT. Podés usarlo como referencia para tus propios portfolios.
