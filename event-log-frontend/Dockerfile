# Usa la imagen base de Node.js para construir la aplicación
FROM node:20 AS build

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build --prod

# Usa NGINX para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la construcción anterior al directorio de NGINX
COPY --from=build /app/dist/event-log-frontend /usr/share/nginx/html

# Copia el archivo de configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que NGINX escucha
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
