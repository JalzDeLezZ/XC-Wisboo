# Next.js OpenJira App By Jalz
Para correr localmente, necesita la DV:

```
docker-compose up -d
```

* El -d, significa __detached__, :: es decir, que el proceso no se ejecuta en una terminal.

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entrorno

Renombrar el archivo __.env.template__ a __.env__ y editarlo para que coincida con los valores de la base de datos.

* Reconstruir los módulos de Node y levantar Next

```
yarn install
yarn dev
```

## Llenar la DB con la información de Pruebas

```
http://localhost:3000/api/seed
```