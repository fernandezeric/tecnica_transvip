```
Prueba técnica Transvip (original)

1. Para realizar esta actividad utilizar NodeJs con Typescript para disponibilizar las apis.
2. Mysql como motor principal.
3. Mongo para el log de peticiones de las apis.
4. Agregar un front sin diseño para listar resultados y agregar datos.
5. Considerar seguridad para el uso de las apis y un patrón.

6. Deberá entregar su código, un archivo sql que considere para que la prueba pueda ser iniciada en un servidor o dockerizado.
7. Además un archivo de texto explicando su solución.
8. Para finalizar enviar un Merge Request a la rama Master.

Endpoints API REST

1. Retornar listado de menus de distintos restaurantes
2. Retornar listados de menus de un restaurante 
3. Agregar restaurantes
4. Agregar menu de un restaurante
```

# Solución

## Contenido
  1. [Consideraciones](#consideradiciones)
  2. [Servidor](#servidor)
  3. [Pendientes]

## Consideradiciones
Para obstraerse y mantener los diferentes componentes separados se utilizo un arquitectura de MVC (modelo-vista-controlador).


Respecto a la API REST; se consideraron dos entidades **Restaurants** y **Menus**,
hay una tercera pero es más auxiliar, **Dishes** pero no esta expuesta para su uso.
La razón de **Dishes** es porque en mysql no se puede tener tener una propiedad que sea un arreglo, y toca crear 
tablas que relacionen **Restaurant con sus respectivos Menus**, y los **Menus con sus Dishes**.
En cualquier caso, tener las tres entidades definidas y separas deja preparado al backend para más posibilidades.
Por ejemplo adaptarlo para un único restaurant o para una adminsitración de varios.

![Imagen entidades de la api rest](/imgs/entidadesApi.png)

**[⬆ vuelve hasta arriba](#contenido)**

## Servidor

```ts
npm run tsc -- --init // inicializa, no necesario
npm install // para instalar las dependencias
npm run tsc // para crear el build (prod)
node run dev // modo develop
```
### Librerías
Versión de node 21.6.2

- **zod:** Validación de datos.
- **express:** Manejo de endpoints.
- **myslq (mysql2)** Base de datos principal.
- **mongodb (mongoose)** Base de datos secundaría para guardar los logs.
- **winston y winston-mongodb** Obtener logs de request ~~(morgan y su formato de loegar me supero)~~.
- **cors** Controlar el clásico problema de cors.
- **dotenv** Variables de entorno

Las librerías de dependencia son para tipos de typescript y un linter.

**[⬆ vuelve hasta arriba](#contenido)**

### Folders a comentar

- **routes**: Solamente están las definiciones de los endpoints.
- **controllers**: Los controladores para manejar el input y output de una request. Por ejemplo validar datos
- **models**: Los modelos para interactuar con bases de datos, en este caso solo está mysql.
- **db**: La conexión a mysql (pendiente ver si es correcto aquí).
- **middlewares**: Middlewares custom para utilizar en express (cors y logger).
- **schemas**: Los esquemas de **zod** para la validacíon de datos.
- **utils**: Código útil e interesante para reutilizar.

### DB

El script de la base de datos populanda esta en **src/db/restaurantsdb.sql**

#### Esquema de mysql
![Imagen Diagrama de relación de mysql](/imgs/sqlDriagram.png)

Al recuperar datos de las tablas de mysql, son un poco diferentes por ejemplo.

La idea es que las respuestas del modelo sigan un contrato con un interfaz, para eso typescript.
De esta forma si todo el modelo sigue una lógica, se podría llegar a abstraer aún más y terminar
con una inyección por dependencia del modelo.

Y el contrato como tal es uno amigable en formato json, para que sea más sencillo en el front.


**Consulta para los menus de un restaurant**

```ts
Menus desde la base de datos

[
  {
    "menu_name": "menú de día viernes",
    "menu_description": "para relajarse un día viernes",
    "menu_id": "554b8cc9-e626-11ee-b8d1-4cebbd0150a9",
    "dish_name": "plato 1 espectacular",
    "dish_price": 3000
  },
  {
    "menu_name": "menú de día viernes",
    "menu_description": "para relajarse un día viernes",
    "menu_id": "554b8cc9-e626-11ee-b8d1-4cebbd0150a9",
    "dish_name": "papas rusticas (papa cruda)",
    "dish_price": 10000
  }
  .
  .
  .
]

Menu luego de dar un formato más amigable

[
  {
    "id": "554b8cc9-e626-11ee-b8d1-4cebbd0150a9",
    "name": "menú de día viernes",
    "description": "para relajarse un día viernes",
    "dishes": [
      {
        "name": "plato 1 espectacular",
        "price": 3000
      },
      {
        "name": "papas rusticas (para cruda)",
        "price": 10000
      }
    ]
  },
  .
  .
  .
]
```

Por si falla la conexión a mongodb en local
```
service mongod start
```

### Endpoints

![Imagen Bosquejo de los endpoints](/imgs/endpoints.png)

Las siguientes consultas están en **./api.http**, en vsc una extensión util es REST Client, permite probar de forma rápida.

No olvidar modificar los origin aceptados.
**Origin: http://localhost:3000**

#### All Restaurants
GET http://localhost:3000/restaurants/

**Response**
```json
[
  {
    "name": "El Parrón Chileno",
    "description": "Especialidades en comida típica chilena",
    "phone": "+56212345678",
    "openTime": "12:00:00",
    "closeTime": "22:00:00",
    "rate": "4.3",
    "id": "c4be1512-e622-11ee-b8d1-4cebbd0150a9"
  },
  {
    "name": "Sabores de Chile",
    "description": "Experiencia gastronómica gourmet con ingredientes chilenos",
    "phone": "+56 2 8765 4321",
    "openTime": "11:00:00",
    "closeTime": "23:00:00",
    "rate": "6.6",
    "id": "c4be1a58-e622-11ee-b8d1-4cebbd0150a9"
  },
  {
    "name": "Mariscos del Pacífico",
    "description": "Especialidades en mariscos frescos del Océano Pacífico",
    "phone": "+56 2 3456 7890",
    "openTime": "10:00:00",
    "closeTime": "21:00:00",
    "rate": "8.1",
    "id": "c4be1c66-e622-11ee-b8d1-4cebbd0150a9"
  }
]
```

#### Get one restaurant by :id
GET http://localhost:3000/restaurants/:id

**Response**
```json
{
  "name": "Mariscos del Pacífico",
  "description": "Especialidades en mariscos frescos del Océano Pacífico",
  "phone": "+56 2 3456 7890",
  "openTime": "10:00:00",
  "closeTime": "21:00:00",
  "rate": "8.1",
  "id": "c4be1c66-e622-11ee-b8d1-4cebbd0150a9"
}
```

#### All menus from one restaurant
GET http://localhost:3000/restaurants/:id/menus

**Response**
```json
[
  {
    "id": "554b8cc9-e626-11ee-b8d1-4cebbd0150a9",
    "name": "menú de día viernes",
    "description": "para relajarse un día viernes",
    "dishes": [
      {
        "name": "plato 1 espectacular",
        "price": 3000
      },
      {
        "name": "patas rusticas (para cruda)",
        "price": 10000
      }
    ]
  },
  {
    "id": "5fccc40d-e626-11ee-b8d1-4cebbd0150a9",
    "name": "menú de día viernes",
    "description": "para relajarse un día viernes",
    "dishes": [
      {
        "name": "plato 1 espectacular",
        "price": 3000
      },
      {
        "name": "patas rusticas (para cruda)",
        "price": 10000
      }
    ]
  },
  {
    "id": "c4bf0895-e622-11ee-b8d1-4cebbd0150a9",
    "name": "Menú de Mariscos Frescos",
    "description": "Selección diaria de mariscos frescos del Pacífico",
    "dishes": [
      {
        "name": "Ensalada de Quínoa y Palta",
        "price": 5500
      },
      {
        "name": "Salmón a la Mantequilla de Limón",
        "price": 9000
      },
      {
        "name": "Tartaleta de Frutos Rojos",
        "price": 6500
      }
    ]
  },
  {
    "id": "c4bf0924-e622-11ee-b8d1-4cebbd0150a9",
    "name": "Menú del Chef",
    "description": "Platos especiales creados por nuestro chef con productos del mar chileno",
    "dishes": [
      {
        "name": "Paila Marina",
        "price": 8500
      },
      {
        "name": "Pescado a lo Macho",
        "price": 7800
      },
      {
        "name": "Arroz Caldoso de Mariscos",
        "price": 9200
      }
    ]
  }
]
```

#### One menu from one restaurant
GET http://localhost:3000/restaurants/:id/menus/:id

**Response**
```json
{
  "id": "c4bf0895-e622-11ee-b8d1-4cebbd0150a9",
  "name": "Menú de Mariscos Frescos",
  "description": "Selección diaria de mariscos frescos del Pacífico",
  "dishes": [
    {
      "name": "Ensalada de Quínoa y Palta",
      "price": 5500
    },
    {
      "name": "Salmón a la Mantequilla de Limón",
      "price": 9000
    },
    {
      "name": "Tartaleta de Frutos Rojos",
      "price": 6500
    }
  ]
}
```

#### All menus from all restaurants
GET http://localhost:3000/menus

**Resquest**
```json
[
  {
    "id": "c4be1512-e622-11ee-b8d1-4cebbd0150a9",
    "name": "El Parrón Chileno",
    "menus": [
      {
        "id": "c4bf0123-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú Tradicional",
        "description": "Platos clásicos de la gastronomía chilena",
        "dishes": [
          {
            "name": "Empanadas de Pino",
            "price": 2500
          },
          {
            "name": "Pastel de Choclo",
            "price": 3500
          },
          {
            "name": "Cazuela de Vacuno",
            "price": 4000
          }
        ]
      },
      {
        "id": "c4bf0605-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú de Parrilladas",
        "description": "Selección de carnes a la parrilla con acompañamientos chilenos",
        "dishes": [
          {
            "name": "Asado de Tira",
            "price": 6000
          },
          {
            "name": "Choripán",
            "price": 3500
          },
          {
            "name": "Costillar de Cerdo",
            "price": 8000
          }
        ]
      }
    ]
  },
  {
    "id": "c4be1c66-e622-11ee-b8d1-4cebbd0150a9",
    "name": "Mariscos del Pacífico",
    "menus": [
      {
        "id": "554b8cc9-e626-11ee-b8d1-4cebbd0150a9",
        "name": "menú de día viernes",
        "description": "para relajarse un día viernes",
        "dishes": [
          {
            "name": "plato 1 espectacular",
            "price": 3000
          },
          {
            "name": "patas rusticas (para cruda)",
            "price": 10000
          }
        ]
      },
      {
        "id": "5fccc40d-e626-11ee-b8d1-4cebbd0150a9",
        "name": "menú de día viernes",
        "description": "para relajarse un día viernes",
        "dishes": [
          {
            "name": "plato 1 espectacular",
            "price": 3000
          },
          {
            "name": "patas rusticas (para cruda)",
            "price": 10000
          }
        ]
      },
      {
        "id": "c4bf0895-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú de Mariscos Frescos",
        "description": "Selección diaria de mariscos frescos del Pacífico",
        "dishes": [
          {
            "name": "Ensalada de Quínoa y Palta",
            "price": 5500
          },
          {
            "name": "Salmón a la Mantequilla de Limón",
            "price": 9000
          },
          {
            "name": "Tartaleta de Frutos Rojos",
            "price": 6500
          }
        ]
      },
      {
        "id": "c4bf0924-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú del Chef",
        "description": "Platos especiales creados por nuestro chef con productos del mar chileno",
        "dishes": [
          {
            "name": "Paila Marina",
            "price": 8500
          },
          {
            "name": "Pescado a lo Macho",
            "price": 7800
          },
          {
            "name": "Arroz Caldoso de Mariscos",
            "price": 9200
          }
        ]
      }
    ]
  },
  {
    "id": "c4be1a58-e622-11ee-b8d1-4cebbd0150a9",
    "name": "Sabores de Chile",
    "menus": [
      {
        "id": "c4bf0765-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú Degustación",
        "description": "Experiencia gastronómica exclusiva con sabores chilenos",
        "dishes": [
          {
            "name": "Camarones al Ajillo",
            "price": 9500
          },
          {
            "name": "Pulpo a la Parrilla",
            "price": 11000
          },
          {
            "name": "Róbalo en Salsa de Mariscos",
            "price": 10500
          }
        ]
      },
      {
        "id": "c4bf0805-e622-11ee-b8d1-4cebbd0150a9",
        "name": "Menú de Temporada",
        "description": "Platos gourmet elaborados con ingredientes frescos de temporada",
        "dishes": [
          {
            "name": "Ceviche de Reineta",
            "price": 7000
          },
          {
            "name": "Risotto de Mariscos",
            "price": 8500
          },
          {
            "name": "Lomo de Cordero al Merlot",
            "price": 12000
          }
        ]
      }
    ]
  }
]
```

#### Create restaurant
POST http://localhost:3000/restaurants

**Resquest**
```json
{
  "name": "Café Neruda (diagonal)",
  "description": "Especialista en café",
  "phone": "+56212666678",
  "openTime": "13:00:00",
  "closeTime": "3:00:00",
  "rate": 9.9
}
```
***Response**
```json
{
  "name": "Café Neruda (diagonal)",
  "description": "Especialista en café",
  "phone": "+56212666678",
  "openTime": "13:00:00",
  "closeTime": "03:00:00",
  "rate": "9.9",
  "id": "f8df523d-e6dc-11ee-acb6-4cebbd0150a9"
}
```

#### Patch restaurant by id
PATCH http://localhost:3000/restaurants/:id

**Resquest**
```json
{
  "openTime": "10:00:00",
  "closeTime": "2:00:00"
}
```
***Response**
```json
{
  "name": "Café Neruda (diagonal)",
  "description": "Especialista en café",
  "phone": "+56212666678",
  "opeTime": "10:00:00",
  "closeTime": "02:00:00",
  "rate": "9.9",
  "id": "f8df523d-e6dc-11ee-acb6-4cebbd0150a9"
}
```

#### Create one menu to specific restaurant
POST http://localhost:3000/restaurants/:id/menus

**Resquest**
```json
{
  "name": "menú de día domingo",
  "description": "para relajarse un día domingo",
  "dishes": [
   {
      "name": "Ensalada de Quínoa y Palta",
      "price": 5500
    }
  ]
}

```
**Response**
```json
{
  "id": "40fa2221-e6dd-11ee-acb6-4cebbd0150a9",
  "name": "menú de día domingo",
  "description": "para relajarse un día domingo",
  "dishes": [
    {
      "name": "Ensalada de Quínoa y Palta",
      "price": 5500
    }
  ]
}
```

**[⬆ vuelve hasta arriba](#contenido)**

## Cliente

```
// dentro del cliente
npm run dev
```

Explicación con capturas (el diseño es mi pasión)


![Imagen Dashboard principal](/imgs/dashboard.png)
![Imagen Restaurant por Id](/imgs/restaurantById.png)
![Imagen Menu de un restaurant especifico](/imgs/menuId.png)
![Imagen Todos los restaurants](/imgs/allRestaurants.png)
![Imagen Todos los menus](/imgs/allMenus.png)


**[⬆ vuelve hasta arriba](#contenido)**

## Pendientes

1. añadir path para restaurant/menu ?.
2. docker.
4. arreglar este readme.
5. ver donde queda mejor la conexión a mysql.
6. terminar de arreglar tipos.
7. crear build y ver si montar todo en algún sitio.
8. documentar bonito.
9. test <3.
10. shorcut '@' para las importaciones.

**[⬆ vuelve hasta arriba](#contenido)**
