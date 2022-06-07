# Api-Be-Fit

<h3> Exemplo de .env </h3>

```
APP_PORT="express_port"
PGUSER="database_user"
PGPORT="port"
PGPASSWORD="database_pass"
PGHOST="host"
PGDATABASE="database_name"
DATABASE_URL="url"
TOKEN="token"
```

<h3> Postgres Docker </h3>

```
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=admin -d postgres:14
```

<h3> Adminer Docker </h3>

```
 docker run --name adminerP --link postgres:db -p 8080:8080 -d adminer
```

<h2> Projeto </h3>
<p> Iniciar aplicação

```
npm install
npm start
```

<h2> Rotas </h3>

<h3> [POST]Login /api/login</h3>
<p> Body Obrigatório:

```
{
    "email": "string",
    "password": "string",
    "useType": "string" // P (personal) ou G (gym student)
}
```

<h3> [GET]Personal /api/personal/list/:id</h3>

```
Header: Authorization obrigatório
Params: id

```

<h3> [PUT]Personal /api/personal/update/:id</h3>

```
Header: Authorization obrigatório
Params: id
Body:
{
    "email": "string",
    "name": "string"
    "password": "string",
}
```

<h3> [POST]GymStudent Create /api/gymstudent/create</h3>
<p> Body Obrigatório:

```
Header: Authorization obrigatório

{
    "name": "string",
    "email": "string",
    "password": "string",
    "goals": "string",
    "PersonalId": "string"
}
```

<h3> [POST]GymStudent update /api/gymstudent/update/:id</h3>
<p> Body Obrigatório:

```
Header: Authorization obrigatório
Params: id
Body:
{
    "name": "string",
    "password": "string"
}
```

<h3> [POST]GymStudent delete /api/gymstudent/delete</h3>
<p> Body Obrigatório:

```
Header: Authorization obrigatório

{
    "id": "string"
}
```

<h3> [POST]GymStudent Get /api/gymstudent/load</h3>
<p> Body Obrigatório:

```
Header: Authorization obrigatório

{
    "id": "string"
}
```

<h3> [GET]GymStudent list for Personal /api/gymstudent/list/:id</h3>

```
Header: Authorization obrigatório
Params: id

```
