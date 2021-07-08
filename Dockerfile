### STAGE 1: Build ###
FROM node:latest as node
WORKDIR /instazoo-client-app
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=node /instazoo-client-app/dist/client /usr/share/nginx/html
