
FROM node:15.12.0
WORKDIR /app/frontend
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT npm start
