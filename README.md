# Playea: Sprint 3 - Resumen de Desarrollo

## 📌 Integrantes del Proyecto - Grupo 3

- **Miguel Ángel Rodríguez Ruano**  
- **Gorka Eymard Santana Cabrera**  
- **Sergio Acosta Quintana**

## 📝 Resumen del Sprint

Durante este sprint, el equipo de **Playea** ha adaptado el sitio web para utilizar **Angular** como framework principal, siguiendo las directrices del Sprint 3. Se ha trabajado en la integración con **Firebase** como backend, la implementación de formularios autenticados, y la carga dinámica de contenido. A continuación, se detallan los avances realizados.

## 🚀 Tareas Realizadas

### 1️⃣ Adaptación a Angular

- **Descripción:** La estructura incluye componentes y servicios para gestionar dinámicamente el contenido.

### 2️⃣ Carga Dinámica de Datos desde JSON y Firebase

- **Descripción:** Se implementó un servicio en Angular para cargar contenido desde un archivo JSON local y, posteriormente, desde **Firebase Firestore**. Esto permite gestionar datos de manera eficiente y escalable.

### 3️⃣ Implementación de Formularios con Autenticación

- **Descripción:** Se creó un formulario de registro y autenticación utilizando **Angular Forms** y **Firebase Authentication**. Los usuarios se registran y autentican contra Firebase, permitiendo contenido diferenciado según su estado o rol.

### 4️⃣ Diseño Responsivo (RWD)

- **Descripción:** Se utilizó **CSS Grid** y **Flexbox**, para asegurar que el diseño sea adaptable a distintos dispositivos, cumpliendo con los requisitos de RWD.

### 5️⃣ Integración de APIs Externas para Datos Meteorológicos y Mareas (PERSONAL EXTRA)

**Descripción:**  
Como funcionalidad adicional, se integraron dos APIs externas para proporcionar datos en tiempo real y mejorar la experiencia del usuario en la plataforma. Esto incluye:

- **API de Open-Meteo:**  
  Utilizada para obtener datos meteorológicos actualizados, como temperatura, precipitación y pronósticos diarios. Estos datos se muestran dinámicamente en la interfaz donde se observan las condiciones climáticas (temperatura, mínimas, y un pronóstico semanal).

- **API de Mareas:**  
  Implementada para mostrar información sobre las mareas, específicamente la altura de la marea en metros a lo largo del día. La gráfica incluida en la imagen refleja las variaciones de la marea, con datos proporcionados por el **Instituto Hidrográfico de la Marina (2025)**.

**Implementación:**  
Se crearon dos servicios en Angular:
- `weather.service.ts` para manejar la obtención de datos meteorológicos.
- `tide.service.ts` para las mareas.

Estos servicios se integran en componentes como `beachDetail`, que muestran información contextual y útil para los usuarios sobre las condiciones de cada playa.

## 🔥 Uso de Firebase en el Proyecto

### Firebase Authentication

- **Uso:** Gestiona el registro y autenticación de usuarios. Los formularios en la página `/auth` (definida en `pages/auth`) utilizan este servicio para registrar nuevos usuarios y autenticar los existentes.
- **Implementación:** El servicio `auth.service.ts` (en `pages/services`) maneja las interacciones con Firebase Authentication, permitiendo verificar el estado del usuario logueado y personalizar el contenido según su rol. Además podemos observar el estado en el que se encuentra el usuario con `àuth-state.service.ts` donde podemos permitir acciones a los usuarios registrados que otros no registrados no podrían realizar.

### Firebase Firestore

- **Uso:** Almacena el contenido dinámico del sitio, como información de playas, categorías, y comentarios, también datos generales de los usuarios.
- **Implementación:** Servicios como `beach.service.ts`, `comments.service.ts`, etc (en `app/services`) se encargan de leer y escribir datos en Firestore, utilizados por componentes como `beach-card`, `comment-item` y más.


## 📂 Estructura del Código del Proyecto Web

### Directorio Raíz: `PLAYA-FRONT-ANGULAR`

#### `src/app`: Directorio principal del código fuente de Angular

##### `src/components/`: Componentes reutilizables para la interfaz

- `beach-card`: Muestra información básica de una playa (usada en `/home` y `/beaches`)
- `beach-comments`: Gestiona los comentarios de una playa (en `/beachDetail`)
- `category-list`: Lista las categorías para filtrar playas (en `/search`)
- ...

#### `src/pages/`: Páginas principales de la app

-  `beachDetail`, `home`, `profile`, `ranking`, `search`, `favourites`
-  `pages/auth`: donde se definen más páginas relacionadas con la autenticación de usuarios

##### `src/services/`: Servicios para interactuar con Firebase y datos

- `auth.service.ts`: Maneja autenticación con Firebase Authentication
- `beach.service.ts`: Gestiona datos de playas desde Firebase Firestore
- `comments.service.ts`: Administra comentarios
- ...

#### `src/utils/`: Utilidades

- `toggle-password-view.ts`, `validators.ts` para formularios

#### Otros Archivos

- `app.routes.ts`: Configuración de rutas de la aplicación
- `environments/`: Archivos de configuración (`environment.ts`, `environment.development.ts`)
- `styles.css`: Estilos globales
- `index.html`: Archivo base de la aplicación
- `main.ts`: Punto de entrada de Angular

#### Otros Directorios

- `constants/`: Constantes globales (por ejemplo: las islas canarias en `categories.ts`)
- `core/`: Lógica central de la aplicación, incluyendo:
  - `auth.guards`: Guardias de autenticación
- `models`: Modelos como `beach.ts`, `comment.ts`, `users.ts`, `weather.ts`
- `public/`: Archivos estáticos accesibles directamente

## 📊 Estructura de los Datos en Firebase

- **Usuarios:** Almacenados en Firebase Authentication (email, nombre, rol)
- **Contenido:** Firestore con colecciones:
  - `beaches`: Información de playas (nombre, ubicación, servicios, URL de imagen)
  - `comments`: Comentarios asociados a playas
  - `Users`: Datos generales de los usuarios (nombre, foto, playas favoritas, etc)

## 🌐 Tour por la Página Web

### Puntos Importantes

- **Página de Inicio (`/`)**  
  Accesible a través de `MainLayoutComponent`, muestra un catálogo de playas cargado desde Firestore, destacado por el componente `home`.

- **Detalles de Playa (`/beach/:slug`)**  
  Muestra información detallada de una playa específica, incluyendo imágenes y comentarios, gestionada por `BeachDetailPageComponent`.

- **Búsqueda (`/search`)**  
  Permite buscar playas con filtros avanzados a través de `SearchComponent`.

- **Clasificación (`/ranking`)**  
  Exhibe un ranking de playas utilizando `RankingPageComponent`.

- **Favoritos (`/favourites`)**  
  Accesible solo para usuarios autenticados (protegido por `privateGuard`), gestionado por `FavouritePageComponent`.

- **Perfil (`/profile`)**  
  Área personalizada para usuarios autenticados (protegido por `privateGuard`), manejada por `ProfilePageComponent`.

- **Páginas de autenticación (`/auth/...`)**  
  Se encuentran bajo `NoHeaderLayoutComponent`

  - **Registro (`/auth/register`)**  
    Formulario para nuevos usuarios, implementado con `RegisterPageComponent`.

  - **Inicio de Sesión (`/auth/login`)**  
    Permite autenticación de usuarios con `LoginPageComponent`.

  - **Verificación OTP (`/auth/otp-verification`)**  
    Proceso de verificación de dos factores con `OTPVerificationComponent` (NO IMPLMENTADO, sólo el formulario).

  - **Recuperación de Contraseña (`/auth/forgot-password`)**  
    Opción para restablecer contraseñas con `ForgotPasswordComponent` (NO IMPLEMENTADO, sólo el formulario).


### Visualización Dinámica

El catálogo en `/` y en las otras páginas, como en las protegidas (`/favourites`, `/profile`) se actualizan dinámicamente con datos de **Firestore**, reflejando cambios en tiempo real.

## 🔑 Configuración de Firebase Claves

Para configurar el proyecto correctamente con Firebase, sigue estos pasos tras descargar el código:

1. Ejecuta el siguiente comando en la raíz del proyecto para generar los archivos de entorno:

```bash
ng g environments
```

2. Añade la siguiente configuración en ambos archivos: environment.ts y environment.development.ts:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    projectId: 'xxx,
    appId: 'xxx',
    storageBucket: 'xxx',
    apiKey: 'xxx',
    ...
  },
  apiBaseUrl: 'https://playea.eu' // URL base en producción
};
```
- **⚠️ Importante**:
  - Asegúrate de usar los mismos nombres de variables **(firebaseConfig, apiBaseUrl, etc.)** para evitar errores. **Esta configuración es esencial para conectar el frontend con los servicios de Firebase**.
  - **Debido a que configuramos el SSR la app tarda un buen rato en cargar, no se asuste al ver que no carga rápido. Dele tiempo, y si es necesario, recargue la página en el navegador con f5 si tarda más de 1 minuto.**


## 📅 Evolución o Enlace a Trello

- **Trello (Seguimiento de Tareas):** [Ver en Trello](https://trello.com/invite/b/67a26c5803a681c1f3cd86b6/ATTI5be2f01e866d062d285809669037fb44D193B19C/playea)

## 🔗 Enlaces Relevantes

- **Figma (Diseños Actualizados):** [Ver en Figma](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1)  


