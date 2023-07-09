# Set the base image to NODE.JS
FROM node:18.14.2-alpine

# Set Local time
ENV        TZ ETC/Utc
RUN        ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR  /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

COPY ./dist ./dist

CMD ["npm", "run", "start"]