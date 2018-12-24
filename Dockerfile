FROM node:dubnium
EXPOSE 80

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}

CMD ["npm", "start"]
