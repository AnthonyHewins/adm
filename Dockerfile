# compile
FROM node:latest

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

# prod build
FROM nginx:latest
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
