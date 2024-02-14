FROM node:18
WORKDIR /ADEVITY
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "--inspect=0.0.0.0:9229", "app.js"]
