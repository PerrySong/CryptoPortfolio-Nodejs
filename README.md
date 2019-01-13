# API Documentation
This is a  RESTful API for cryptotracker-like web site, it provides user authentication, cryptocurrencies information query and more! 

For more information,see the documantion below. 

Go to  [cryptotracker.rocks](http://cryptotracker.rocks) to try our API!   
Note: currently not available   


### Important!  
* Price Historical route is not available for now    
* For local usage you need to set up Postgresql and Redis:
* [Set Up Redis](#set-up-redis)  
### Routes  
 
 * Authentication  
    * [Register](#register)  
	* [Register with email verification](#register-with-email-verification)
	* [Login](#login)

 * Setting  
  	* [Public](#public)  
	* [Private](#private)  
	* [Update Setting](#update-setting)  
	* [Get Setting](#get-setting)



* Profile  
  	* [Post Profile](#post-profile)  
	* [Get Profile](#get-profile)  
	* [Update Profile](#update-profile)  
	* [Clear Profile](#clear-profile) 

* Friend List (new)
	* [Friends List](#friends-list)
	* [Add Friends](#add-friends)
    * [Search Friends](#search-friends)
	* [List Friends](#list-friends)
	* [Delete Friends](#delete-friends)
	* [Display Friend Asset](#display-friend-asset)

 * Administration  
  	* [Administration](#administration)  
	* [Administration Registration](#administrator-register)  
	* [Administrator List Users](#administrator-list-users)  
	* [Administrator Send Email to All Users](#administrator-send-email-to-all-users)  

* Transaction
    * [Make Tansaction](#make-transaction)
    * [Asset](#asset)
    * [List Transactions](#list-transactions) (new)


* Crypto Information  
  	* [List Coins](#list-coins)  
	* [Exchange List](#exchange-list)  
	* [Price](#price)  
	* [Price Multi](#price-multi)  
    * [Price Historical](#price-historical)

* Subscribe
    * [Subscribe](#subscribe)
    * [Unsubscribe](#unsubscribe)

* Recommendation
    * [Recommendation](#recommendation) (new)


* Test
    * [Make a Transaction](#make-a-transaction) (new)

### Logics

[Authorization](#authorization)  
[Notification](#notification)  
[Issues](#issues) 



---

* # Set Up Redis:

```
    npm install redis redis-server --save
```
Install redis using brew:
```
    $ brew install redis
```

Run redis in terminal:

```
    $ redis-server
```
Congratulation! You are all set.

---

* # Register

    *Request*
    `POST /register`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    username     | string        | Required            | length 6-30, no space
    email        | string        | Required            | your email 
    password     | string        | Required            | length 8-20, must have upper, lower case and digits, no space 
    firstname    | string        | Required            | your first name
    lastname     | string        | Required            | your last name
    public       | string        | Optional, true by defualt| If you willing to share you profile
    
    *Response*
```json
    {
        "user": {
            "email": "your email",
            "password": "your password",
            "firstname": "your first name",
            "lastname": "your last name",
            "public": "true/false",
            "administrator": "true/false",
            "createAt": "some date",
            "upedateAt": "some date"
        },
        "token": "xxx"
    }
```

```json
    {
        "error": "Some error message"
    }
```

---

* # Register with email verification

    *Request*
    `POST /verify/register`

    Parameters   | Data Type     | Required / Optional | Description 
    ------------ | ------------- | ------------------- | -----------
    username     | string        | Required            | length 6-30, no space 
    email        | string        | Required            | your email 
    password     | string        | Required            | length 8-20, must have upper, lower case and digits, no space 
    firstname    | string        | Required            | your first name 
    lastname     | string        | Required            | your last name 
    public       | string        | Optional, true by defualt| If you willing to share you profile 

    *Response*

```json
    {
        "success": "true",
        "message": "We sent a link to your email, please check your email and activate your account"
    }
```

```json
    {
        "error": "Some error message"
    }
```

---

* # login

    *Request*
    `POST /login`
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email/email  | string        | Required            | your email or username
    password     | string        | Required            | your password


```json
    {
        "user": {
            "email": "your email",
            "password": "your password",
            "firstname": "your first name",
            "lastname": "your last name",
            "public": "true/false",
            "administrator": "true/false",
            "createAt": "some date",
            "upedateAt": "some date"
        },
        "token": "xxx"
    }
```

```json
    {
        "error": "Error message showing that why it didn't login successfully"
    }
```

---

* # Public

	*Purpose:* Set your account to public

    *Request*
    `GET /user/public`
    
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    *Response*
```json
    {
        "message": "Your status has been changed to public"
    }
```

```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Private

	*Purpose:* Set your account to private

    *Request*
    `GET /user/private`
    
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    *Response*
```json
    {
        "message": "Your status has been changed to private"
    }
```

```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Update Setting

	*Request*
    `PUT /user/setting`
    
	header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token
    
    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | string        | Required            | your email 
    password     | string        | Required            | your password
    firstname    | string        | Required            | your first name
    lastname     | string        | Required            | your last name
    public       | string        | Optional, true by defualt| If you willing |
    
	*Response*
	
    
```json
    {
        "email": "your email",
        "password": "your password",
        "firstname": "your first name",
        "lastname": "your last name",
        "public": "true/false",
        "administrator": "true/false",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```

```json
    {
        "error": "reason why your request failed"
    }
```



---

* # Get Setting

	*Request*
    `GET /user/setting`

   header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token
    
    
   *Response*

```json
    {
        "email": "your email",
        "password": "your password",
        "firstname": "your first name",
        "lastname": "your last name",
        "public": "true/false",
        "administrator": "true/false",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```
```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Post Profile

	*Request*
    	`POST /user/profile`

    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | String        | Optional            | Your contact email
    github       | String        | Optional            | Your github account
    interest     | String        | Optional            | Your interest areas
    investment   | String        | Optional            | Your current investment


   *Response*

```json
    {
        "email": "your email",
        "github": "your github account",
        "interest": "your interest areas",
        "investment": "req.body.investment",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```
```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Get Profile

	*Request*
  	  `GET /user/profile`

    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    
   *Response*

```json
    {
        "email": "your email",
        "github": "your github account",
        "interest": "your interest areas",
        "investment": "req.body.investment",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```

```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Update Profile

	*Request*
    	`PUT /user/profile`

    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | String        | Optional            | Your contact email
    github       | String        | Optional            | Your github account
    interest     | String        | Optional            | Your interest areas
    investment   | String        | Optional            | Your current investment


   *Response*

```json
    {
        "email": "your email",
        "github": "your github account",
        "interest": "your interest areas",
        "investment": "req.body.investment",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```
```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Clear Profile

	*Request*
    	`GET /user/profile/clear`

    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    
   *Response*

```json
    {
        "email": "",
        "github": "",
        "interest": "",
        "investment": "",
        "createAt": "some date",
        "upedateAt": "some date"
    }
```
```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Friends List:
    This feature is for users managing their list of friends.

---

* # Add Friends:

    *Request*
        `POST /user/profile/friends`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    userId       | string        | Required            | user id of the friend



   *Response*

```json
    {
        "id": 1,
        "email": "test01@email",
        "github": "test01.github",
        "interest": "coding",
        "investment": "10000",
        "friends": [
            "user-5b4h5w8jjki83tj",
            "user-5b4h5w8jjki80es",
            "user-5b4h5w8jjki7wl7"
        ],
        "createdAt": "2018-07-13T21:52:23.566Z",
        "updatedAt": "2018-07-17T04:44:22.660Z",
        "userId": "user-5b4h5w8jjki7sq9"
    }
```

---

* # Search friends
    *Request*
        `POST /user/profile/friends/searchname`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    username     | string        | Required            | username of the friend

   *Response*
   All users' information which matches given Username
```json
[
    {
        "id": "user-5b4h5w8jjki7wl7",
        "email": "test02@gmail.com",
        "username": "test02",
        "password": "35bacce75bdb5c98e3a2afbe6c1b57df",
        "firstname": "Test",
        "lastname": "01",
        "public": true,
        "administrator": false,
        "createdAt": "2018-07-13T21:38:27.643Z",
        "updatedAt": "2018-07-13T21:38:27.643Z"
    }
]
```

---

* # List Friends:

    *Request*
        `GET /user/profile/friends`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    userId       | string        | Required            | user id of the friend



   *Response*
 ```json
    [
      {
          "username": "test04",
          "id": "user-5b4h5w8jjki83tj"
      },
      {
          "username": "test03",
          "id": "user-5b4h5w8jjki80es"
      },
      {
          "username": "test01",
          "id": "user-5b4h5w8jjki7sq9"
      },
      {
          "username": "test02",
          "id": "user-5b4h5w8jjki7wl7"
      }
	]
```

---


* # Delete Friends:

    *Request*
        `DELETE /user/profile/friends/delete`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    userId       | string        | Required            | user id of the friend


---


* # Display Friend Asset:

    *Request*
        `POST /user/profile/friends/portfolio`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    userId       | string        | Required            | user id of the friend



---

* # Administration:
    This feature is for setting up adminstrator and website management.

---

* # Administrator Registration:

    *Request*
        `POST /adminregister`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | string        | Required            | your email 
    password     | string        | Required            | your password
    firstname    | string        | Required            | your first name
    lastname     | string        | Required            | your last name
    public       | string        | Optional            | If you willing to share you profile

    
   *Response*

```json 
    {
        "user": {
            "email": "your email",
            "password": "your password",
            "firstname": "your first name",
            "lastname": "your last name",
            "public": "true/false",
            "administrator": "true",
            "createAt": "some date",
            "upedateAt": "some date"
        },
        
        "token": "xxx"
    }
```
```json
    {
        "error": "reason why your request failed"
    }
```

---

* # Administrator List Users:

    list all the users in database 

    *Request*
        `GET /administrator/list`
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

     *Response*

```json 
    [
        {
            "email": "your email",
            "password": "your password",
            "firstname": "your first name",
            "lastname": "your last name",
            "public": "true/false",
            "administrator": "true",
            "createAt": "some date",
            "upedateAt": "some date"
        },
        {
            
        }, 
        
    ]
```

```json 
    {
        "error": "error messages"
    }
```

---

* # Administrator Send Email to All Users:
    *Request*
        `POST /administrator/sendall`
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    subject      | string        | Optional            | subject
    message      | string        | Optional            | message
    content      | string        | Optional            | html content included in email
    
---

* # Transaction:
    This feature is for users to make trasaction and check their current assets.

---

* # Make Transaction:

    Make a transaction

    *Request*
        `POST /user/make-transaction`
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token


   Parameters   | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
    sell_type 	|	string		| 	required		  | Selling coin's type
    sell_price	|	double      | 	required	      | Coin's value in USD
    sell_amount |  double 		|	required   		  | Selling coins amount
    income_type |  string		|	required		  | Income type (USD for example)
    income_price|  double		|	required		  | Currency's value in USD
    income_amount| double		|	required		  | Income amount
    
     *Response*

```json 
    [
        {	
        	"id": "transaction id",
            "sell_type": "BTC",
            "sell_price": "6000",
            "sell_amount": "2",
            "income_type": "USD",
            "income_price": "1",
            "income_amount": "12000",
            "createAt": "some date",
            "upedateAt": "some date",
            "portfolioId": "The associate portfolio id",
        }
        
    ]
```

```json 
    {
        "error": "error messages"
    }
```
---

* # Asset:
	
    Check user's current assets (All the currency type and amount the user recently hold) 

    *Request*
        `GET /user/asset`	
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token
        
     *Response*

```json 
    [
        {	
        	"id": "transaction id",
            "type": "BTC",
            "amount": "2",
            "createAt": "some date",
            "upedateAt": "some date",
            "portfolioId": "The associate portfolio id",
        },
        {
            
        }, 
        
    ]
```  

```json 
    {
        "error": "error messages"
    }
```
---

* # List Transactions:
	
    List all the transactions the user has made
 
    *Request*
        `GET /user/transactions`	
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token

     *Response*
```json     
     [
        {
            "id": 6,
            "sell_type": "BTC",
            "sell_price": 6000,
            "sell_amount": 10,
            "income_type": "USD",
            "income_price": 1,
            "income_amount": 6000,
            "createdAt": "2018-07-10T00:32:56.310Z",
            "updatedAt": "2018-07-10T00:32:56.310Z",
            "portfolioId": 7
        }, 
        {
            "id": 7,
            "sell_type": "BTC",
            "sell_price": 6000,
            "sell_amount": 10,
            "income_type": "USD",
            "income_price": 1,
            "income_amount": 6000,
            "createdAt": "2018-07-11T00:32:56.310Z",
            "updatedAt": "2018-07-11T00:32:56.310Z",
            "portfolioId": 7
        },
    ]
```

```json
    {
        "error": "Some error message"
    }
```
---
* # List Coins:

    Get the current list of all cryptocurrencies and the following information about each coin.

    *Request*
        `GET /user/coinlist`
        
    header       | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    authorization| jwt token     | Required            | Your jwt token
    
     *Response*

```json 
      {
        "BTC": {
               "Id": "1182",
               "Url": "/coins/btc/overview",
               "ImageUrl": "/media/19633/btc.png",
               "Name": "BTC",
               "Symbol": "BTC",
               "CoinName": "Bitcoin",
               "FullName": "Bitcoin (BTC)",
               "Algorithm": "SHA256",
               "ProofType": "PoW",
               "FullyPremined": "0",
               "TotalCoinSupply": "21000000",
               "PreMinedValue": "N/A",
               "TotalCoinsFreeFloat": "N/A",
               "SortOrder": "1",
               "Sponsored": false
      		},
        "ETH": {},
    }
```  
```json 
    {
        "error": "error messages"
    }
```    
---

* # Exchange List:

Returns all the exchanges that CryptoCompare has integrated with.

*Request*
        `GET /user/exchange-list`
        
   header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   *Response*
   
```json 
      {
        "Cryptsy":
                  {
                    "42":["BTC","XRP"],
                    "EMC2":["BTC","XRP"],
                    "POINTS":["BTC"],
                    "VTC":["BTC","LTC","XRP"]
                    
                  }
                  
	  }
```  

```json 
    {
        "error": "error messages"
    }
```
---

* # Price

Get the current price of any cryptocurrency in any other currency.

*Request*
        `POST /user/price`
        
   header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   fsym         | string | required |  From symbal
   tsyms 		| array of strings | required | To Symbol(s)
   
    
   *Response*
   
```json    
   { 
   		"USD": 1100.24,	
       	"BTC": 0.16
   }
```

```json 
    {
        "error": "error messages"
    }
```
---

* # Price Multi

Works like price, except it allows you to specify a matrix of From Symbols.

*Request*
        `POST /user/price-multi`
        
   header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   fsym         | array of strings | required |  From symbal
   tsyms 		| array of strings | required | To Symbol(s)
   
    
   *Response*
   
```json    
   { 
   		"BTC": {"USD": 6213.54}
   }
```

```json 
    {
        "error": "error messages"
    }
```

---

* # Price Historical

Get all the current trading info (price, vol, open, high, low, etc.) of any list of cryptocurrencies in any other currency.

*Request*
        `POST /user/price-historical`


 header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   fsym         | array of strings | required |  From symbal
   tsyms 		| array of strings | required | To Symbol(s)
   time (Date)  | date             | required | Date in history that you want price data for
   
   *Response*


```json

{
    "BTC": {
      "USD": {
        "TYPE": "5",
        "MARKET": "CCCAGG",
        "FROMSYMBOL": "BTC",
        "TOSYMBOL": "USD",
        "FLAGS": "4",
        "PRICE": 1152.42,
        "LASTUPDATE": 1487865689,
        "LASTVOLUME": 0.21,
        "LASTVOLUMETO": 242.20349999999996,
        "LASTTRADEID": 1224703,
        "VOLUME24HOUR": 53435.45299122338,
        "VOLUME24HOURTO": 60671593.843186244,
        "OPEN24HOUR": 1119.31,
        "HIGH24HOUR": 1170,
        "LOW24HOUR": 1086.641,
        "LASTMARKET": "itBit",
        "CHANGE24HOUR": 33.11000000000013,
        "CHANGEPCT24HOUR": 2.958072383879366,
        "SUPPLY": 16177825,
        "MKTCAP": 18643649086.5
       },
       "EUR": "..."
     },
    "ETH": "..."
 }

```
----
* # Subscribe:
    Subscribe a currency that user like
     *Request*
        `POST /user/subscribe`

    header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token

    Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   symbol       | String      | required            | coin's symbol



    *Response*

    ```json
        message: some success message
    ```
    ```json
        error: some error message
    ```
----
* # Unsubscribe:
    Subscribe a currency that user like
     *Request*
        `POST /user/unsubscribe`

    header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token

    Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   symbol       | String      | required            | coin's symbol



    *Response*

    ```json
        message: some success message
    ```
    ```json
        error: some error message
    ```    
----
* # Recommendation:

    Recommend Users or Coins base on user's current portfolio

    For this function you need to install redis and its server, and run redis in backend


    ```
        npm install redis redis-server --save
    ```
    Install redis using brew:
    ```
        $ brew install redis
    ```

    Run redis in terminal:

    ```
        $ redis-server
    ```
    Congratulation! You are all set.

* # Recommendation Coins

   Returns an ranked sorted array of Coins' symbol which represent the top recommendations
   for that individual user based on knn. number is the number of recommendations you want to receive.
   asking for recommendations queries the 'recommendedZSet' sorted set for the user.
   
    *Request*
        `POST /user/recommend/coins`

    header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------
   number       | Integer       | required            | How many coins do you want to recommend to user



   *Response*


```json
    [
        "BTC",
        "ETH"
    ]
``` 


```json
    {
        "error": "error message"
    }
```
---

* # Recommendation Users
    *Request*
        `POST /user/recommend/users`

    header       | Data Type     | Required / Optional | Description
   ------------ | ------------- | ------------------- | -----------
   authorization| jwt token     | required            | Your jwt token
    
   Parameters   | Data Type     | Required / Optional | Description
   -------------|---------------|---------------------|-------------

---
    returns an array of the 'similarityZSet' ranked sorted set for the user which
   represents their ranked similarity to all other users given the
   Jaccard Coefficient. the value is between -1 and 1. -1 means that the
   user is the exact opposite, 1 means they're exactly the same.
   ex. results = ['garyId', 'andrewId', 'jakeId']

   *Response*
```json
    [
        "Huang Xiaoming",
        "Sun Zhongshan",
        "Li Bai"
    ]
``` 
```json
    {
        "error": "error message"
    }
```
---

# Test

--
* # Make a Transaction
    
    * To make a random transaction for every user in the DB:
        
        1. Go to your project's folder
        2. run: ``` $ npm run make_a_transaction ```
        3. control + c to exit the script


---
* # Authorization

    * Every route start with baseURL/user/ will check the token sent by a client, and the server will recognize the token and know which user you are. If you update your email, username or password, the token will expire. Also, the token will expire after it was generated 24h.

    * Our backend will send a confirmation link when user registers his/her account. The link contains an encrypted parameter which includes user registration information. When the user clicks the link backend verify and decode the parameter    using a private key to acquire the user's registration information then create an    account accordingly.
 

---
* # Notification  
    * Administrators can manually send notifications to every user's email. Whereas
    at every day 8 am users will receive an email containing the latest news about the coin they hold the most. 

---

* # Issues:
   * We are currently using Gmail for sending email, which could cause problems when it comes to sending bulk emails.   

   * When sending notifications, server traverses the every user. And traverse every coin the user has. The time complexity will be O(n * m), which should be improved.

   * All the array parameters are not available, you can only pass one single parameter instead!

   * Update setting can set username and email but does not check if they are duplicated. 

   * For recommendation, we use user-based recommendation. The problems with this method are that in the early stage of the product, there is no sufficient user's behaviors data. Second, how to store the users' similarity to the relational database is a question. The space complexity of the data will be O(n^2).
