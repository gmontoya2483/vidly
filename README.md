# Vidly

Movies Restful API.

### install
``npm init``

### Endpoints

#### genres

+ /api/genres (get, post)
+ /api/genres/:id (get, put, delete)

##### Genre Model

```javascript
{
name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}
```


### customers

+ /api/customers (get, post)
+ /api/customers/:id (get, put, delete)

```javascript
{
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}

```


