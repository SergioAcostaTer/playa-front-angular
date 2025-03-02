# Playea: Plataforma de Valoración de Playas en Canarias 
### (Readme para asignatura-PWM)

## 📌 Integrantes del Proyecto
- **Miguel Ángel Rodríguez Ruano**
- **Gorka Eymard Santana Cabrera**
- **Sergio Acosta Quintana**

## 📝 Descripción del Proyecto
**Playea** es una plataforma web dedicada a la exploración y valoración de las mejores playas de las Islas Canarias. Su objetivo principal es proporcionar una herramienta interactiva donde los usuarios puedan descubrir playas, compartir sus experiencias y acceder a reseñas basadas en valoraciones reales.

## 📋 Características Principales
| Característica | Descripción |
|--------------|------------|
| **Registro e Inicio de Sesión** | Los usuarios pueden crear una cuenta, personalizar su perfil y gestionar sus valoraciones. |
| **Base de Datos Completa** | Información detallada sobre todas las playas de Canarias, incluyendo ubicación, imágenes y datos relevantes. |
| **Sistema de Valoración** | Calificación de playas con puntuaciones de 1 a 5 estrellas y escritura de reseñas detalladas. |
| **Ranking de Playas** | Listado con las playas mejor valoradas en diferentes categorías como las más limpias, visitadas y recomendadas. |

## 📄 Requisitos del Proyecto
### 🔹 Requisitos Funcionales
| ID | Requisito |
|----|----------|
| RF01 | El usuario podrá registrarse mediante email y contraseña. |
| RF02 | El usuario podrá iniciar y cerrar sesión. |
| RF03 | Se permitirá la recuperación de contraseña mediante email. |
| RF04 | Los usuarios podrán explorar todas las playas en la base de datos. |
| RF05 | Cada playa tendrá información detallada, como ubicación, tipo de arena y servicios disponibles. |
| RF06 | Los usuarios podrán calificar playas de 1 a 5 estrellas. |
| RF07 | Los usuarios podrán escribir y leer comentarios sobre las playas. |
| RF08 | Se permitirá a los usuarios subir fotos de playas. |
| RF09 | Se mostrará un ranking de playas mejor valoradas según puntuaciones de usuarios. |

### 🔹 Requisitos No Funcionales
| ID | Requisito |
|----|----------|
| RNF01 | La plataforma debe tener una interfaz intuitiva y fácil de usar. |
| RNF02 | El diseño debe ser responsivo para adaptarse a distintos dispositivos. |
| RNF03 | Las búsquedas y filtrados deben ejecutarse en menos de 2 segundos. |
| RNF04 | La carga de imágenes será optimizada para evitar tiempos de espera largos. |
| RNF05 | Las contraseñas de los usuarios estarán encriptadas. |
| RNF06 | Se implementarán medidas contra spam y contenido inapropiado en comentarios y fotos. |
| RNF07 | La plataforma debe estar disponible al menos el 99.5% del tiempo. |

## 🌍 Rutas y URLs del Proyecto
| Página | URL |
|--------|-----|
| **Página de inicio** | `/` |
| **Ranking de playas mejor valoradas** | `/ranking` |
| **Página de detalles de playa** | `/playa/:nombre-playa` |
| **Mapa interactivo** | `/mapa` |
| **Login** | `/auth/login` |
| **Registro** | `/auth/register` |
| **Recuperación de contraseña** | `/auth/forgot-password` |
| **Perfil de usuario** | `/profile` |
| **Favoritos** | `/favourites` |
| **Popup de usuario** | `/user-popup` |
| **Verificación OTP** | `/auth/forgot-password/otp-verification` |

## 🔗 Enlaces
- **Figma**: [Enlace a Figma](https://www.figma.com/design/r6Gxqsy8sfzuwfJZOIexKR/Playea.com?node-id=0-1&t=liIOWVMREdWDgDs7-1)
- **Trello**: [Enlace a Trello](https://trello.com/b/le5wbuMa/playea)

---


