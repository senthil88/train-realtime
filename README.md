## Local Setup

```sh
git clone https://github.com/senthil88/train-realtime.git
cd train-realtime
npm install
cp .env.example .env
npm start
```

## 100% Production Ready Docker setup with PM2, Nginx & Logrotate

Folder for pm2, nginx & docker configuration
```sh
cd deploy
cat nginx.conf
cat ecosystem.config.js
```

You can also use docker for development. Make sure you run npm install on your host machine so that code linting and everything works fine.

```sh
npm i
cp .env.example .env
```

Start the services

```sh
docker-compose up -d
```

View the logs

```sh
docker-compose logs -f
```

In case you install a npm module while developing, it should also be installed within docker container, to do this first install the module you want with simple `npm i module name`, then run it within docker container

```sh
docker-compose exec node npm i
```

## Run the test cases

```sh
tape tests/**/*.js
```
## Understanding admin

Admin can able to emit the event about the current train status

## Admin Screenshots
![alt text](https://raw.githubusercontent.com/senthil88/train-realtime/master/public/img/admin.png)

## Understanding User/Guest

Guest User can able to check the train status. Whenevner admin have emit the event, guest user will receive the notification.

## Guest User Screenshots
![alt text](https://raw.githubusercontent.com/senthil88/train-realtime/master/public/img/user_alert.png)


## License
MIT
