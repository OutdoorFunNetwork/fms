FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN npm i --silent
ADD . /user/src/app

RUN npm run postinstall

EXPOSE 3000 8002
# You can change this
CMD npm run dev
