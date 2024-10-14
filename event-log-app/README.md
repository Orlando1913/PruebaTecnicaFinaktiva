# Event Log API

## Descripción

La API de Event Log permite registrar y buscar eventos en una aplicación de gestión de eventos. Proporciona endpoints para registrar nuevos eventos y buscar eventos existentes en la base de datos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework web para construir APIs.
- **MongoDB**: Base de datos NoSQL para almacenar registros de eventos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **Swagger**: Para la documentación de la API.

## Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MongoDB](https://www.mongodb.com/) (instalado localmente o acceso a MongoDB Atlas)

### Clonar el Repositorio

```bash
git clone https://github.com/Orlando1913/PruebaTecnicaFinaktiva.git
cd event-log-api


npm install


MONGODB_URI=mongodb://localhost:27017/event-log
PORT=5000


node app.js

La API estará disponible en http://localhost:5000


Endpoints
1. Registrar Evento
URL: /register
Método: POST
Descripción: Registra un nuevo evento.
Cuerpo de la Solicitud:
{
  "description": "Descripción del evento",
  "eventType": "Tipo de evento"
}
Respuestas:
201: Evento registrado con éxito.
400: Solicitud incorrecta, todos los campos son obligatorios.
500: Error interno del servidor.


Buscar Eventos
URL: /search
Método: GET
Descripción: Busca eventos según el tipo de evento y el rango de fechas.
Parámetros de Consulta:
eventType: (opcional) Tipo de evento.
startDate: (opcional) Fecha de inicio en formato YYYY-MM-DD.
endDate: (opcional) Fecha de fin en formato YYYY-MM-DD.
Respuestas:
200: Lista de eventos que coinciden con los criterios.
500: Error interno del servidor.


La documentación de la API está disponible en Swagger. Puedes acceder a ella en:
http://localhost:5000/api-docs


Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar, por favor abre un issue o envía un pull request.

Licencia
Este proyecto está bajo la MIT License.

Autor : https://github.com/Orlando1913


### Personalización

- **Reemplaza los lugares marcados** (`tu_usuario`, `Tu Nombre`, etc.) con tu información.
- **Ajusta los detalles** sobre la instalación, configuración y características de tu API según sea necesario.
- Si tienes más endpoints o características, agrégalas a la sección de endpoints.

### Guardar el Archivo

1. **Crea un archivo** llamado `README.md` en la raíz de tu proyecto backend.
2. **Copia y pega** el contenido de la plantilla en ese archivo.
3. **Guarda los cambios**.

### Conclusión

Un buen archivo `README.md` ayuda a otros desarrolladores a entender y utilizar tu API de manera más efectiva. Si necesitas más ayuda o ajustes específicos en la plantilla, ¡no dudes en preguntar!
