El diseño de la aplicación tiene una vulnerabilidad relacionada con el acceso al servidor WebSockets, ¿puedes indicar cuál es? ¿Cómo la solucionarías?

Una posible vulnerabilidad podría ser que cualquier cliente, incluso los no autenticados, pueden conectarse al servidor WebSocket. Esto podría permitir a usuarios malintencionados enviar o recibir mensajes sin autenticación.
Solución: Podría requerir que los clientes proporcionen un token JWT válido al intentar establecer una conexión WebSocket. El servidor entonces verificaría este token antes de permitir la conexión.


¿Que habría que hacer para validar que los usuarios de esta aplicación fueran mayores de 13 años? ¿Dónde controlarías esa condición? ¿Qué habría que agregar en el frontend

Se podría hacer esto al momento del registro. Cuando un usuario proporciona su fecha de nacimiento, calcula su edad y verifica si es mayor de 13 años. Si no lo es, rechaza el registro.
Dónde controlarías esta condición: Lo controlarías en el backend, específicamente en el endpoint de registro antes de insertar el nuevo usuario en la base de datos.
Qué habría que agregar en el frontend: En el frontend, podrías agregar un mensaje de error que informe al usuario si no cumple con el requisito de edad y también podrías agregar un selector de fecha de nacimiento en el formulario de registro.