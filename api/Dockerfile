FROM node:10-alpine

USER node
WORKDIR /home/node
COPY package*.json ./
RUN npm install
COPY dist/ .

EXPOSE 8080
CMD ["npm", "start" ]