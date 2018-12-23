FROM node:dubnium
EXPOSE 8080

WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm install
COPY . .

ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}

CMD ["npm", "start"]