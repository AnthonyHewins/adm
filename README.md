ADM
===

1. [Development](#development)
2. [Build](#build)
3. [Production](#production)

### Development

Note: out of personal choice, `docker-compose` is not used for development and is only
for prod

1. Clone
2. `npm start`
3. Check [localhost:3000](localhost:3000). Stop here if you're only using the
   react frontend. Continue if you plan on using the backend as well
4. Visit [adm-backend](https://github.com/AnthonyHewins/adm-backend) repo and follow that README

### Build

Uses multi-stage builds in docker. End image is from nginx to combine the server
and the webapp into one

1. `docker build -t ahewins/adm-server:$TAG .`
2. `docker push ahewins/adm-server:$TAG`

Compressed into one command:

``` sh
TAG=something;docker build -t ahewins/adm-server:$TAG && docker push ahewins/adm-server:$TAG
```

### Production

1. Make sure you have generated TLS certs on the prod server, and have
   appropriate permissions to use the privkey and cert
2. Edit the `./nginx.conf`, replacing the environment variables with the paths
   to your TLS info and also the server name
3. `sftp` in and drop `nginx.conf` and `docker-compose.yml` into the server,
   then back out
4. `ssh` into your server and `docker-compose up -d`
