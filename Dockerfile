# ---------- Build stage ----------
#FROM node:20-alpine AS build
#WORKDIR /app

#COPY package*.json ./
#RUN npm ci --no-audit --no-fund

#COPY . .
#RUN npm run build -- --configuration=production

# ---------- Runtime stage ----------
#FROM nginx:alpine

# Remove default nginx config
#RUN rm -rf /etc/nginx/conf.d/*

# Copy Angular build output
#COPY --from=build /app/dist/angular-ui-cli/browser /usr/share/nginx/html

# Copy nginx config
#COPY nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# ---------- Build stage ---------- Below is for Jenkins pipeline ----------
FROM nginx:alpine

# Remove default config
RUN rm -rf /etc/nginx/conf.d/*

# Copy pre-built Angular files from Jenkins
COPY dist/angular-ui-cli/browser /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
