# Dockerfile para el Backend
# Usar Node.js versión 20 como imagen base
FROM node:20  

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias (package.json y package-lock.json si existe)
COPY package*.json ./  

# Instala las dependencias de la aplicación
RUN npm install  

# Copia el resto de la aplicación al directorio de trabajo
COPY . .  

# Expone el puerto en el que tu aplicación escucha
EXPOSE 5000  

# Comando para iniciar la aplicación
CMD ["node", "app.js"]  
