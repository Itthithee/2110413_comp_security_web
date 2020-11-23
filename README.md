# 2110413_comp_security_web

## Docker Compose

To start docker compose :

```bash
$ docker-compose up
```

For rebuild container:
```bash
$ docker-compose up --build
```

To stop docker compose :

```bash
$ docker-compose down
```

## PS1 
*** Don't panic if you see a bunch of warning when you first build container (most of it is about dependency) ***

## PS2
*** url : localhost:8000/ ***

## PS3
to initialze users, you can do it by try using following method
1.  install curl
2.  using this command
curl -X POST -H "Content-Type: application/json" -d '{"username": "Admin", "password": "1234", "isAdmin": true}' http://localhost:8000/api/users
PS. You can try it on Postman or other tool.
PS2. isAdmin is boolean, please dont send it as string.
