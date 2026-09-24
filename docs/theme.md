# Temas del portfolio

El primer acceso utiliza oscuro, independientemente de la preferencia del sistema.
El selector guarda `portfolio-theme` en localStorage. Un script en el head aplica
la preferencia antes de pintar el body. `useSyncExternalStore` conserva un snapshot
oscuro para la hidratación y después sincroniza los controles con el atributo
`data-theme`. Solo ese atributo del documento puede diferir intencionadamente del
HTML del servidor. Si el almacenamiento está bloqueado, el cambio sigue funcionando.

## Paleta

Perla cálido mantiene el fondo y el hero en la misma familia #F2F0EC, con superficies
#E7E4DE y texto principal #1D2934. #D94B14 queda para geometría y decoración;
#AF380C es la variante de tinta para pequeños textos sobre superficies cálidas.
Los botones usan #C9410D con blanco. Gris editorial y Beige suave no se exponen:
Perla cálido sigue la preferencia del brief y mantiene el carácter naranja existente.

Contrastes calculados con luminancia relativa sRGB:

| Par | Ratio |
| --- | --- |
| Blanco / botón #C9410D | 4,95:1 |
| #1D2934 / fondo #F2F0EC | 13,00:1 |
| #576270 / superficie #E7E4DE | 4,89:1 |
| #AF380C / superficie #E7E4DE | 4,88:1 |
| Error #AD2828 / superficie #E7E4DE | 5,32:1 |
| Borde de campo #827D75 / superficie #E7E4DE | 3,22:1 |

Las 24 variables originales del bloque oscuro y los dos degradados de body/hero
se compararon con HEAD: permanecen idénticos. El foco explícito y el nuevo selector
se añaden a ambos temas. El selector muestra solo luna o sol según el tema activo,
sin texto visible, borde, tooltip ni hover; mantiene una zona táctil de 44 px
y el nombre accesible de la acción siguiente. Los iconos de marca claros reciben un pequeño respaldo
marino solo en claro, sin recolorear sus marcas.

## Giro de página

View Transitions captura el viewport completo, incluida la navegación fija. La
captura antigua levanta la esquina superior derecha desde un apoyo inferior
izquierdo, sobre el tema nuevo, en 780 ms. Usa un eje diagonal, giro de -112 grados,
perspectiva de 1600 px, borde que se curva progresivamente y dos sombras que
se separan al levantar la hoja. La luz cambia suavemente durante el giro. No se clona
el árbol React ni se reinician el formulario, los vídeos o la vista de tecnologías.
El scroll, el redimensionado y las nuevas interacciones interrumpen la captura.

El navegador puede suspender el hit-testing de elementos capturados durante una
[transición de documento](https://www.w3.org/TR/css-view-transitions-1/).
Si intercepta un clic, se finaliza el giro y se entrega la acción al control vivo
en esa posición. Los callbacks de cambios anteriores no pueden sobrescribir la
elección más reciente; los listeners se eliminan al finalizar.

Con `prefers-reduced-motion: reduce` se usa un fundido de 120 ms sin perspectiva
en movimiento. Sin API o si falla, el tema se aplica igualmente, sin giro.
No se añade ninguna dependencia de producción.

La referencia renlenon.vercel.app permitió activar el selector y capturar una
hoja oscura inclinada descubriendo el fondo claro. El resultado es una
interpretación propia: no se verificaron su curva exacta, duración ni geometría
fotograma a fotograma. Esta implementación aproxima la flexión con el contorno, la inclinación y la luz;
no realiza una simulación física de la curvatura del papel.

## Validación

- `npm run build`: correcto.
- `npx tsc --noEmit`: correcto.
- `node --test tests/theme.test.mjs`: siete pruebas, incluyendo almacenamiento
  bloqueado, preferencia inicial, fallback, callbacks fuera de orden, scroll,
  fallo de la API y entrega/limpieza de clics interceptados.
- ESLint sobre los archivos TS/TSX modificados y el test: correcto.
- `npm run lint`: falla por problemas previos de formato/CRLF y scripts de la
  skill. Antes del trabajo: 12.620 errores y 6 avisos. Tras normalizar los archivos
  modificados: 11.743 errores y 6 avisos; no se reformatea el resto del repositorio.
- Navegador local: escritorio de 1440 px, ancho intermedio de 1024 px y móvil de
  390 px; hero, navegación y menú, vistas de tecnologías, superficies de proyectos,
  contacto y pie; foco por teclado, nombres ES/EN, cambios consecutivos, recarga
  clara/oscura y conservación de datos escritos. Sin overflow horizontal en los
  anchos comprobados ni errores de hidratación registrados.
- Formulario: validación nativa de correo inválido y conservación de campos al
  cambiar de tema. No se envió correo real ni se forzaron estados de éxito/error
  del servicio Resend. Sus colores se revisaron en código. El autofill y la ruta
  de movimiento reducido se revisaron en CSS; no se emularon en el navegador.

La comprobación móvil utiliza un viewport reducido, no un dispositivo físico.
