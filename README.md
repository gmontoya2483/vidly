# Vidly

Movies Restful API.

### install
``npm init``

### Run in Dev
```
> SET vidly_jwtPrivateKey=<ANY KEY> 
> nodemon
```

### Endpoints

#### genres

+ /api/genres (get, post)
+ /api/genres/:id (get, put, delete)

##### Genre Model

```javascript
{
        name: Joi.string()
            .min(5)
            .max(55)
            .required()
    }
```


### customers

+ /api/customers (get, post)
+ /api/customers/:id (get, put, delete)

```javascript
    {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(5).max(50)
    }

```

### movies

+ /api/movies (get, post)
+ /api/movies/:id (get, put, delete)

```javascript
        {
            title: Joi.string().min(5).max(255).required(),
            genreId: Joi.objectId().required(),
            numberInStock: Joi.number().min(0).max(255).required(),
            dailyRentalRate: Joi.number().min(0).max(255).required()
        }
```

### rentals

+ /api/movies (get, post)

```javascript
        {
            customerId: Joi.objectId().required(),
            movieId: Joi.objectId().required()
        }


### users
+ /api/users (post)
+ /api/users/me (get)
```javascript
    {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(passwordComplexityOptions).required(),
        isAdmin: Joi.boolean()
    }
```

### auth

+ /api/users (post)

```javascript
    {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required()
    }
```


