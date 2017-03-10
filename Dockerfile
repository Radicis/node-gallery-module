FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install nodemon -g

# Install dependancies
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
EXPOSE 8080

RUN nodemon