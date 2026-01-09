# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build -- --configuration=production

# Runtime stage
FROM nginx:alpine
COPY --from=build /app/dist/angular-ui-cli/browser /usr/share/nginx/html

# Gateway reverse proxy support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
