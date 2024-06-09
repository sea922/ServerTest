FROM node:latest

########### Setup Path ############
RUN mkdir -p /usr/src/project
WORKDIR /usr/src/project

########### Copy Resources ############
COPY package.json /usr/src/project/
COPY process.json /usr/src/project/
COPY . /usr/src/project

########### Install Dependencies ############
RUN npm install

########### Install PM2 ############
RUN npm install pm2 -g

########### Execute ############
EXPOSE 7500 5443
CMD [ "pm2-runtime", "process.json", "--env", "production" ]
