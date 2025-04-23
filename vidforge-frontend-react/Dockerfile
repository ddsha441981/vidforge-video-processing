FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

FROM nginx:alpine


# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
