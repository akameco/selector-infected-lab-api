FROM node:latest

RUN mkdir /src

WORKDIR /src
Add package.json /src/package.json
RUN npm install -q
Add . /src
RUN npm run build

EXPOSE 8080

CMD npm start
