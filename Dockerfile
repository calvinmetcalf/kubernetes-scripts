FROM node:5.1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package2.json /usr/src/app/
RUN mv package2.json package.json
RUN npm install --production
RUN rm package.json
COPY . /usr/src/app

EXPOSE 8080

CMD ["node", "index.js"]
