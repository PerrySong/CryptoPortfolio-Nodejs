#API Documentation


---

##USER

* Login

    *Request*
    `POST /register`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | string        | Required            | your email 
    password     | string        | Required            | your password
    firstname    | string        | Required            | your first name
    lastname     | string        | Required            | your last name
    public       | string        | Optional, default is true | If you willing to share you profile
    
    *Response*
```json
    {
        "success": true,
        "token": "xxx"
    }
```

```json
    {
        "success": false,
        "error": "This user does not exist!"
    }
```

* Registration

    *Request*
    `POST /signup`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | string        | Required            | your email address
    password     | string        | Required            | your password
    device       | string        | Required            | the device you are calling this API from
    nickname     | string        | Optional            | Your nickname
    birthday     | string        | Optional            | Must be in `YYYY-MM-DD`format, otherwise will be put `NULL`
    gender       | string        | Optional            | Must be either `Male`, `Female` or `Neutral`, otherwise will be put `NULL`
    fromCity     | string        | Optional            | Your hometown
    avatorUrl    | string        | Optional            | put avator link here
    
    *Response*
```json
    {
        "success": true,
        "token": "xxx"
    }
```

```json
    {
        "success": false,
        "error": "Error message showing that why it didn't sign up successfully"
    }
```

---

##Businesses

* Add Business

    *Request*
    `POST /business/add`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    token        | string        | Required            | this operation must be authorized
    name         | string        | Required            | name of your business
    city         | string        | Required            | city where your business located
    address      | string        | Required            | address of your business
    state        | string        | Optional            | state of your business
    description  | string        | Optional            | write something about your business
    
    *Response*
```json
    {
        "success": true,
        "id": "id of your business"
    }
```

```json
    {
        "success": false,
        "error": "reason why your request failed"
    }
```

* Get Business

    *Request*
    `GET /business/get`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    limit        | Int           | Optional            | The number of businesses you want to fetch, if you're not specifying this param, it will be set to 10 by default, and it has a maximum of 50. 
    city         | string        | Optional            | city where you want to fetch businesses from
    id           | int           | Optional            | id of your business, if this param is specified, `city` `name` will be ignored
    
    *Response*
    
> Nothing matched

```json
    []
```

> Businesses that matched

```json
    [
      {
        "address": "Clement",
        "city": "San Francisco",
        "latitude": 0.0,
        "businessID": 12,
        "businessName": "The Taste of Jiangnan",
        "rating": 0.0,
        "state": "CA",
        "categories": null,
        "avatar": null,
        "longitude": 0.0
      },
      {
        "address": "484 Ellis St, Tenderloin",
        "city": "San Francisco",
        "latitude": 37.7847191,
        "businessID": 42,
        "businessName": "Tadu Ethiopian Kitchen",
        "rating": 0.0,
        "state": "CA",
        "categories": "Food",
        "avatar": "http://s3-media3.fl.yelpcdn.com/bphoto/pUg-HAc0dCxV4iORG8NJZA/ms.jpg",
        "longitude": -122.414172
      },
    ]
```

##Reviews

* Post Review

*Request*
    `POST /review/post`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    token        | string        | Required            | this operation must be authorized
    businessID   | Int           | Required            | id of the business
    starRating   | Int           | Optional            | from 1 - 10
    reviewText   | string        | Optional            | your review
    
    *Response*
    
```json
    {
        "success": true,
    }
```

```json
    {
        "success": false,
        "error": "reason why your request failed"
    }
```

* Get Review

*Request*
    `POST /review/get`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    limit        | Int           | Optional            | the number of reviews you want to fetch, 10 by default
    businessID   | Int           | Optional            | id of the business
    userEmail    | string        | Optional            | user who wrote this review
    userID       | Int           | Optional            | user who wrote this review by ID
    sortBy       | string        | Optional            | 'vote' or something else
    
    *Response*

```json
    [
      {
        "reviewDate": "2015-12-12",
        "userNickname": "scott",
        "userEmail": "scott@gmail.com",
        "starRating": 5,
        "reviewText": "First review!!!",
        "reviewVote": 0
      },
      {
        "reviewDate": "2015-12-13",
        "userNickname": "scott",
        "userEmail": "newUserWithTOken@gmail.com",
        "starRating": 10,
        "reviewText": "This is awosome!!",
        "reviewVote": 0
      }
    ]
```