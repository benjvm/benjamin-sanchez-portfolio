# Portfolio Benjamin

Portfolio personal de **Benjamin Sánchez**, desarrollador junior con formación en Desarrollo de Aplicaciones Web (DAW) y Desarrollo de Aplicaciones Multiplataforma (DAM). Aquí presento mis proyectos, las tecnologías con las que trabajo y mi evolución como desarrollador.

**[Live preview · bnjasanchez.com](https://bnjasanchez.com)**

## Sobre mí

Disfruto convirtiendo ideas en aplicaciones útiles y aprendiendo durante el proceso. Mis principales fortalezas están en el desarrollo de interfaces con **React y JavaScript**, la integración de servicios y el trabajo en proyectos web y móviles de principio a fin.

Mi formación también abarca backend con Java, PHP, Python y Node.js, bases de datos y consumo de APIs REST. Utilizo Git y GitHub para organizar el código y seguir la evolución de mis proyectos.

Me interesa seguir creciendo en desarrollo web, backend y aplicaciones móviles. Actualmente exploro **Blockchain y Web3**, especialmente Solidity, Ethereum y contratos inteligentes, como una nueva dirección de aprendizaje.

## Stack del portfolio

| Área                   | Tecnologías y uso                                                              |
| ---------------------- | ------------------------------------------------------------------------------ |
| Interfaz               | React 19, TypeScript y JavaScript                                              |
| Framework y rutas      | TanStack Start y TanStack Router, con renderizado en servidor                  |
| Estilos y componentes  | Tailwind CSS 4, componentes shadcn/ui y primitivas Radix UI                    |
| Formulario de contacto | Resend para el envío de correos desde el servidor y Zod para validar los datos |
| Idiomas                | i18next y react-i18next, con contenido en español e inglés                     |
| Iconos                 | Lucide React y React Icons                                                     |
| Herramientas           | Vite, npm, ESLint, Prettier y Git                                              |

## Proyectos destacados

### [InternHub](https://github.com/benjvm/InternHub)

Plataforma web que conecta a estudiantes, empresas y profesores durante el proceso de prácticas. Incluye ofertas, solicitudes, perfiles y gestión de empresas.

- **Tecnologías:** React, JavaScript, Firebase y Cloudinary.
- **Reconocimiento:** Premio a la Excelencia en 2025 al mejor proyecto del curso. El certificado está disponible en el portfolio.

### [WTFood](https://github.com/benjvm/WTFood)

Aplicación móvil para descubrir recetas a partir de los ingredientes disponibles. Explora el reconocimiento de alimentos asistido por IA y las recomendaciones personalizadas.

- **Tecnologías:** Flutter, Dart y Firebase, con funcionalidades asistidas por IA.

## Qué puedes encontrar en la web

- Presentación de mi perfil y tecnologías organizadas por categorías.
- Proyectos con imágenes, vídeos de demostración y enlaces al código.
- CV descargable y enlaces a mis perfiles profesionales.
- Formulario de contacto con validación y envío de correo.
- Diseño adaptable a móvil y escritorio, temas claro y oscuro, y selector de idioma.

## Ejecutar en local

Necesitas una versión de Node.js compatible con Vite 8 (20.19+ o 22.12+) y npm.

```sh
npm ci
npm run dev
```

Para configurar el formulario de contacto, copia `.env.example` a `.env.local` y completa las variables:

| Variable            | Uso                                                         |
| ------------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY`    | Clave de API de Resend, utilizada únicamente en el servidor |
| `CONTACT_TO_EMAIL`  | Dirección que recibirá los mensajes                         |
| `RESEND_FROM_EMAIL` | Remitente de un dominio verificado en Resend                |

El formulario necesita estas variables tanto en local como en el entorno de producción. `.env.local` está excluido de Git.

```sh
npm run build   # Genera la versión de producción
npm run lint    # Revisa el código con ESLint
```

## Contacto

Puedes contactarme a través del [formulario del portfolio](https://bnjasanchez.com/#contact) o de [LinkedIn](https://www.linkedin.com/in/benjvm). También puedes consultar otros proyectos en [mi perfil de GitHub](https://github.com/benjvm).
