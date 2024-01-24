### BDD

Feature: Obtener detalles del usuario por ID

Descripción: Como usuario de la aplicación, quiero poder obtener los detalles de un usuario específico mediante su ID para acceder a su información.

Escenario: Usuario solicitado existe

- Dado que tengo acceso a la aplicación
- Y el usuario con ID '123' existe en la base de datos
- Cuando solicito los detalles del usuario con ID '123'
- Entonces recibo los detalles completos del usuario con ID '123'

Escenario: Usuario solicitado no existe

- Dado que tengo acceso a la aplicación
- Y no hay ningún usuario con ID '999' en la base de datos
- Cuando solicito los detalles del usuario con ID '999'
- Entonces recibo un mensaje de error indicando que el usuario no se encontró

Escenario: ID de usuario no válido

- Dado que tengo acceso a la aplicación
- Cuando solicito los detalles del usuario con un ID no válido, como 'abc'
- Entonces recibo un mensaje de error indicando que el formato del ID es incorrecto
