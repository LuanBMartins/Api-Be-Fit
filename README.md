# Api-Be-Fit

<h3> Exemplo de .env </h3>

```
DB_HOST="host"
DB_PORT="port"
DB_NAME="database_name"
DB_PASSWORD="database_pass"
DB_USER="database_user"
APP_PORT="express_port"
```


<h3> Postgres Docker </h3>

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=admin -d postgres:14
```

<h3> Adminer Docker </h3>

```
 docker run --name adminerP --link postgres:db -p 8080:8080 -d adminer
```