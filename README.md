# Playea: Sprint [Número/Nombre del Sprint] - Resumen de Desarrollo

## 📌 Integrantes del Proyecto

- **Miguel Ángel Rodríguez Ruano**  
- **Gorka Eymard Santana Cabrera**  
- **Sergio Acosta Quintana**

## 📝 Resumen del Sprint

En este sprint, el equipo de **Playea** se enfocó en optimizar la estructura del proyecto, mejorar la experiencia de usuario en diferentes dispositivos y avanzar en la funcionalidad dinámica de la plataforma. A continuación, se detalla paso a paso el trabajo realizado para seguir construyendo una herramienta interactiva que permita a los usuarios explorar y valorar las playas de las Islas Canarias de manera eficiente.

## 🚀 Tareas Realizadas

### 1. Atomización de Componentes Existentes

- **Objetivo:** Mejorar la modularidad del código para facilitar futuras modificaciones y mantenimiento.  
- **Descripción:** Se descompusieron los componentes ya creados en partes más pequeñas y reutilizables. Esto permite una mayor flexibilidad al realizar cambios o añadir nuevas funcionalidades, alineándose con el requisito no funcional RNF01 (interfaz intuitiva y fácil de usar) al mantener el código organizado y escalable.

### 2. Adaptación de Diseños en Figma para Móviles y Tablets

- **Objetivo:** Ampliar los diseños existentes para que sean compatibles con dispositivos móviles y tablets, además de los diseños previos para PC.  
- **Descripción:** Se actualizaron los prototipos en Figma para incluir vistas específicas para móviles y tablets, asegurando que la experiencia de usuario sea consistente en todos los dispositivos. Este paso es clave para cumplir con el requisito no funcional RNF02 (diseño responsivo para distintos dispositivos). Puedes revisar los diseños actualizados en el [enlace de Figma](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1).

### 3. Implementación de un Diseño Responsive

- **Objetivo:** Asegurar que la plataforma se visualice correctamente en pantallas de PC, tablets y móviles.  
- **Descripción:** Se adaptaron los mockups a un diseño responsive utilizando técnicas de desarrollo web (como CSS Grid, Flexbox y media queries). Para validar el diseño en diferentes tamaños de pantalla, se utilizó la extensión de Google Chrome **Responsive Viewer**, lo que permitió simular y ajustar la interfaz en tiempo real. Este desarrollo refuerza el cumplimiento del requisito no funcional RNF02.

### 4. Carga Dinámica de Datos de Playas desde JSON

- **Objetivo:** Implementar una carga dinámica de datos para las playas y sus categorías.  
- **Descripción:** Se configuró la plataforma para que los datos de las playas (como ubicación, tipo de arena, servicios disponibles, etc.) y las categorías (como "más limpias" o "más visitadas") se carguen desde un archivo JSON. Esto permite una gestión más eficiente de la información y facilita la escalabilidad de la base de datos, apoyando los requisitos funcionales RF04 (explorar todas las playas) y RF05 (información detallada de cada playa).

### 5. Implementación y Validación de Formularios con LocalStorage

- **Objetivo:** Habilitar el funcionamiento completo de los formularios de login, registro y recuperación de contraseña, con almacenamiento local.  
- **Descripción:**  
  - Se implementaron los formularios de **login** (`/login`), **registro** (`/register`) y **recuperación de contraseña** (`/forgot-password`) para que envíen datos correctamente.  
  - Se utilizó **LocalStorage** para gestionar la autenticación de manera local, permitiendo a los usuarios iniciar y cerrar sesión (RF02).  
  - Además, se modificó el **header** de la plataforma para que muestre un diseño diferente dependiendo de si el usuario está logueado o no, mejorando la experiencia de usuario (RNF01).  
  - Este desarrollo también cubre los requisitos funcionales RF01 (registro mediante email y contraseña) y RF03 (recuperación de contraseña mediante email).

## 🔗 Enlaces Relevantes

- **Figma (Diseños Actualizados):** [Enlace a Figma](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1)  
- **Trello (Seguimiento de Tareas):** [Enlace a Trello](https://trello.com/b/le5wbuMa/playea)
Explicación del Formato
Encabezado YAML: Incluye metadatos como el título, autores, fecha y formato de salida (HTML con tabla de contenidos flotante y tema "united" para un diseño limpio).