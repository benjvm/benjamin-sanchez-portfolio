# Animación de profundidad y escritura

## Cambios
- Añadir profundidad en la primera sección: la cuadrícula, los nodos y el contenido responderán suavemente al movimiento del cursor en capas distintas.
- Limitar el efecto al área inicial y reiniciarlo al salir para evitar movimientos bruscos.
- Animar “BENJAMIN SÁNCHEZ” con una aparición progresiva tipo tecleo y un cursor discreto.
- Mostrar el nombre completo sin animación cuando el usuario tenga activada la reducción de movimiento.

## Detalles técnicos
- Usar variables CSS actualizadas desde eventos de puntero, sin librerías adicionales.
- Mantener el comportamiento táctil actual y aplicar la profundidad solo en dispositivos con puntero preciso.
- Verificar la animación y el aspecto en la vista de escritorio.
