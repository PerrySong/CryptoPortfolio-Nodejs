#CryptoTracker API Documentation

1. $ cd yourprojectdir, and run: npm install.
2. Go to the config/config.json file to set up your local postgresql.
3. Drop the previous table of your using database 
4. Run $ sequelize db:migrate
5. Run $ npm run start, and you are ready to go  


The following shortcuts represent:

    API:
        req: request format
        res: response format
        <object>: object
        post: request type

This API contains following routes:

*Register 
    *Request*

    `POST /register`

    Parameters   | Data Type     | Required / Optional | Description
    ------------ | ------------- | ------------------- | -----------
    email        | string        | Required            | your email 
    password     | string        | Required            | your password
    firstname    | string        | Required            | your first name
    lastname     | string        | Required            | your last name

    you are calling this API from
    URL: /register 
          post: req: body: 
                            {
                                email: <email>, 
                                username: <username>, 
                                password: <password>, 
                                firstname: <firstname>, 
                                lastname: <lastname>，
                                public： <false||true>
                            }  

                res: 
                        {
                            user: <user>,
                            jwttoken: <jwttoken>
                        }

    URL: /login 
            post: 
                req: body : 
                            {
                                email || username: <email || username>,
                                password
                            }

                res: 
                    {
                        user: <user>
                        jwttoken: <jwttoken>
                    }    

    URL: /user/public
            get: 
                req : header { authorization: <jwttoken> }
                 
                 res : redirect back to privious route
                            
                    //This request will change a user's status to public
            

    URL: /user/private
            get: 
                req : header { authorization: <jwttoken> }
                 
                res : redirect back to privious route
                
                    //This request will change a user's status to private

    URL: /user/setting
            get: 
                req : header { authorization: <jwttoken> }
                        {
                            email: <email>, 
                            username: <username>, 
                            password: <password>, 
                            firstname: <firstname>, 
                            lastname: <lastname>，
                            public： <false||true>
                        }  
                
                res : user

            put: 
                req : header { authorization: <jwttoken> }
                
                res : user(updated)     

    URL: /list
            get: 
                res : users (All the users in the database)  

    URL: /verify/register
            post:
                res: { message: a link is send to your email... }  

    URL: /user/profile  
            
            post : 
                req :  header: { authorization: <jwttoken> }
                       body: {
                                email: req.body.email,
                                github: req.body.github,
                                interest: req.body.interest,
                                investment: req.body.investment
                            }

                res :  {
                            email: req.body.email,
                            github: req.body.github,
                            interest: req.body.interest,
                            investment: req.body.investment
                        }

            get :
                req :  header: { authorization: <jwttoken> }

                res : {
                            email: req.body.email,
                            github: req.body.github,
                            interest: req.body.interest,
                            investment: req.body.investment
                        }
                
            update : 
                req :  header: { authorization: <jwttoken> }
                       body: 
                            {
                                email: req.body.email,
                                github: req.body.github,
                                interest: req.body.interest,
                                investment: req.body.investment
                            }

                res :   
                        {
                            email: req.body.email,
                            github: req.body.github,
                            interest: req.body.interest,
                            investment: req.body.investment
                        }

            delete : 
                req :  header: { authorization: <jwttoken> } 

                res : 
                        {
                            message: "Your profile has been destoried" 
                        }    

    URL: user/profile/clear

            get : 
                req : header: { authorization: <jwttoken> }  

                res : {
                            email: req.body.email,
                            github: req.body.github,
                            interest: req.body.interest,
                            investment: req.body.investment
                        }                           

Administration:
    This feature is for setting up adminstrator and website management. Right now administrator can view all the users in the database.

    URL: /adminregister:
        post : 
            req : {
                        email: <email>, 
                        username: <username>, 
                        password: <password>, 
                        firstname: <firstname>, 
                        lastname: <lastname>，
                        public： <false||true>
                    }  

            res : {
                        email: <email>, 
                        username: <username>, 
                        password: <password>, 
                        firstname: <firstname>, 
                        lastname: <lastname>，
                        public： <false||true>
                    }       

    URL: /administrator/list
        get : 
            res : {
                    users (All the users in the database) 
                }
                 
    To be continue...            

    Authorization logic:

        Every route start with baseURL/user/ will check the token sent by client, and 
        server will recognize the token and know which user you are. If you update your
        email or username or password, the token will expire.


Issue:
    We are currently using gmail for sending email, which could cause problems when it comes to sending bulk emails.      