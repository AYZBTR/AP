This is our high-quality Jokes API. You can use this API to request
and remove different jokes.

### Random joke

Retrieve a random joke from all jokes in the database

```endpoint
GET /jokes/random
```

#### Example request

```curl
$ curl http://localhost:3000/jokes/random
```
#### Example response

```json
[
"joke": {
        "id": 9,
        "content": "What do you call a group of musical engineers? A bandwidth!",
        "likes": 0,
        "dislikes": 0
    }
]
```

 ### Random joke from a category of jokes

Retrieve a random joke from a category of jokes

```endpoint
GET /jokes/random/:category
```

#### Example request

```curl
curl http://localhost:3000/jokes/random/your_category
```

#### Example response

```json
{
    "joke": {
        "id": 2,
        "content": "Why don't airplanes ever tell the truth? Because they always wing it!",
        "likes": 0,
        "dislikes": 0
    }
}
```

### List all categories

Retrieve a list of categories

```endpoint
GET /jokes/categories
```

Retrieve all categories in database

#### Example request

```curl
curl http://localhost:3000/jokes/categories
```

#### Example response

```json
{
    "categories": [
        {
            "category": "Engineering"
        },
        {
            "category": "Xylophone"
        },
        {
            "category": "Programming"
        },
        {
            "category": "Airplane"
        }
    ]
}
```

### List jokes of a category

Retrieve all jokes for a category

```endpoint
GET /jokes/category
```

#### Example request

```curl
curl http://localhost:3000/jokes/Programming
```

#### Example response

```json
{
    "jokes": [
        {
        "id": 5,
        "category": "Programming",
        "content": "Why do programmers prefer dark mode? Less syntax highlighting!",
        "likes": 0,
        "dislikes": 0
    },
    {
        "id": 7,
        "category": "Programming",
        "content": "Why do Java developers wear glasses? Because they don't see sharp!",
        "likes": 0,
        "dislikes": 0
    },
    {
        "id": 8,
        "category": "Programming",
        "content": "Why do programmers prefer dark mode? Because the light attracts bugs.",
        "likes": 0,
        "dislikes": 0
    }
    ]
}
```

### Joke by ID

Retrive a joke by ID

```endpoint
GET /jokes/id/:id
```

#### Example request

```curl
curl http://localhost:3000/jokes/id/14
```

#### Example response

```json
{
    "id": 14,
    "category": "Xylophone",
    "content": "Why did the xylophone go to therapy? It had too many emotional bars!",
    "likes": 0,
    "dislikes": 0
}
```

### Add a new category

Add a new category of jokes 

```endpoint
POST /jokes/categories
```

#### Example request

```curl
curl -X POST -H "Content-Type: application/json" -d "{ \"category\": \"Old School Joke\" }" http://localhost:3000/jokes/categories
```

#### Example request body

```json
{
    "category":"Old School Joke"
}
```

Property | Description
---|---
`category` | Name of the category

#### Example response

```json
{
    "category": "Old School Joke"
}
```

### Add a new joke to a category

Add a new joke to a category 

```endpoint
POST /jokes/category/{category}
```

#### Example request

```curl
curl -X POST -H "Content-Type: application/json" -d "{ \"joke_content\": \"Why don't skeletons fight each other? They don't have the guts.\" }" http://localhost:3333/v1/jokes/category/Dad%20jokes
```

#### Example request body

```json
{
  "joke_content": "Why don't skeletons fight each other? They don't have the guts."
}
```

Property | Description
--- | ---
`joke_content` | the content of the joke

#### Example response

```json
{
  "joke_content": "Why don't skeletons fight each other? They don't have the guts."
}
```

### Add existing joke to a category by joke id

Adds already existing joke to a category by its id.

```endpoint
POST /v1/jokes/{id}/category/{category}
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/11/category/Science%20jokes
```

#### Example response

```json
{
    "id_joke": "11",
    "category": "Science jokes"
}
```

Property | Description
---|---
`id_joke` | Joke of id
`category` | Category of a joke

### Give joke a like

Give joke a like

```endpoint
POST /v1/jokes/{id}/like
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/1/like
```

#### Example response

```json
{
  "id_joke":"1"
}
```
Property | Description
---|---
`id_joke` | Joke of id

### Give joke a dislike

Give joke a dislike

```endpoint
POST /v1/jokes/{id}/dislike
```

#### Example request

```curl
curl -X POST http://localhost:3333/v1/jokes/1/dislike
```

#### Example response

```json
{
  "id_joke":"1"
}
```

Property | Description
---|---
`id_joke` | Joke of id
