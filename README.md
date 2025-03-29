# Playea: Sprint 2 - Resumen de Desarrollo

## 📌 Integrantes del Proyecto

- **Miguel Ángel Rodríguez Ruano**  
- **Gorka Eymard Santana Cabrera**  
- **Sergio Acosta Quintana**

## 📝 Resumen del Sprint

Durante este sprint, el equipo de **Playea** se centró en la optimización del proyecto, la mejora de la experiencia de usuario en distintos dispositivos y el desarrollo de nuevas funcionalidades dinámicas. A continuación, se detallan los avances logrados en esta iteración, con el objetivo de seguir construyendo una plataforma intuitiva que permita a los usuarios explorar y valorar las playas de las Islas Canarias de manera eficiente.

## 🚀 Tareas Realizadas

### 1️⃣ Refactorización y Modularización de Componentes

- **Objetivo:** Mejorar la mantenibilidad y escalabilidad del código.
- **Descripción:** Se descompusieron los componentes existentes en subcomponentes más pequeños y reutilizables. Esto facilita la implementación de nuevas funcionalidades y optimiza la estructura del código, alineándose con el requisito no funcional **RNF01** (interfaz intuitiva y fácil de usar).
    - Se puede observar bien en la página de **detalles de una playas** (`/beaches/:slug`)

### 2️⃣ Creación de Nuevos Componentes y Vistas

- **Objetivo:** Ampliar la interfaz del usuario con nuevas secciones.
- **Descripción:** Se diseñaron y desarrollaron nuevas páginas en **Figma**, trasladándolas posteriormente a **HTML y CSS**:
  - **Página de búsqueda** (`/search`)
  - **Vista de perfil de usuario** (`/view-profile/:username`)

### 3️⃣ Adaptación de Diseños para Móviles y Tablets

- **Objetivo:** Garantizar una experiencia de usuario óptima en cualquier dispositivo.
- **Descripción:** Se actualizaron los diseños en **Figma** para incluir versiones específicas para móviles y tablets, asegurando una visualización y usabilidad consistentes. Esto cumple con el requisito no funcional **RNF02** (diseño responsivo para distintos dispositivos). Puedes ver los diseños en el siguiente enlace: [Figma - Playea](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1).

### 4️⃣ Implementación de RWD (Responsive Web Designe)

- **Objetivo:** Optimizar la interfaz para su correcto funcionamiento en múltiples tamaños de pantalla.
- **Descripción:** Se aplicaron técnicas de desarrollo web como **CSS Grid, Flexbox y Media Queries** para asegurar la adaptabilidad del sitio. Además, se utilizó la extensión **Responsive Viewer** en Google Chrome para validar el diseño en distintos dispositivos.

### 5️⃣ Carga Dinámica de Datos desde JSON

- **Objetivo:** Incorporar datos dinámicos sobre las playas y sus categorías.
- **Descripción:** Se implementó la carga de información de las playas (ubicación, tipo de arena, servicios, etc.), las principales categorías para filtrar (las propias 'islas canarias') y los comentarios desde un archivo **JSON**. Esto permite una mejor gestión de la información y facilita la escalabilidad de la base de datos, cumpliendo con los requisitos funcionales **RF04** (explorar todas las playas) y **RF05** (información detallada de cada playa).

### 6️⃣ Implementación y Validación de Formularios con LocalStorage

- **Objetivo:** Desarrollar formularios interactivos con almacenamiento local.
- **Descripción:**
  - Se implementaron formularios reactivos con feedback en tiempo real utilizando **'@angular/forms'**.
  - Se desarrollaron los formularios de **login** (`/login`), **registro** (`/register`) y **recuperación de contraseña** (`/forgot-password`).
  - Se utilizó **LocalStorage** para gestionar la autenticación, permitiendo a los usuarios iniciar y cerrar sesión sin necesidad de una base de datos remota.
  - Se actualizó el **header** de la plataforma para que muestre un diseño adaptado según el estado de sesión del usuario.
  - Se cubrieron los requisitos funcionales **RF01** (registro mediante email y contraseña), **RF02** (autenticación de usuario).

### 7️⃣ Tareas Adicionales del Sprint

- **Objetivo:** Mejorar la funcionalidad general del sistema.
- **Descripción:**
  - Implementación de un sistema de búsqueda sobre un dataset de **60 playas** en formato JSON.
  - Integración de una API de mapas para mostrar la ubicación de cada playa en su página de detalles.
  - Implementación de un sistema local para que los usuarios puedan añadir comentarios y visualizarlos en la web sin necesidad de una base de datos remota.

## 🔗 Enlaces Relevantes

- **Figma (Diseños Actualizados):** [Ver en Figma](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1)  
- **Trello (Seguimiento de Tareas):** [Ver en Trello](https://trello.com/invite/b/67a26c5803a681c1f3cd86b6/ATTI5be2f01e866d062d285809669037fb44D193B19C/playea)
