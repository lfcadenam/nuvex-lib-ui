# =============================================================================
# Etapa 1: Compilación de la librería nuvex-ui y aplicación showcase
# =============================================================================
FROM node:22-alpine AS build

WORKDIR /app

# Copiar manifiestos de dependencias
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install --no-audit --no-fund

# Copiar código fuente
COPY . .

# Compilar librería nuvex-ui y posteriormente la app showcase
RUN npm run build:lib && npm run build:showcase

# =============================================================================
# Etapa 2: Servidor Web Nginx para servir el Showcase en producción
# =============================================================================
FROM nginx:alpine

# Limpiar archivos predeterminados de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar configuración Nginx optimizada para SPA
COPY docker/showcase/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos estáticos compilados
COPY --from=build /app/dist/showcase/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
