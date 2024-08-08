# Final-react


e-commerce app

api : sign up
http://localhost:5000/api/v1/react/auth/signup

req body :
{
"fullName":"react",
"age":60,
"email":"admin3@gmail.com",
"address":"fayoum",
"password":"admin1234567",
"gender":"male",
"role":"admin"
}
res : data

{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "data": {
        "user": {
            "fullName": "react",
            "age": 60,
            "email": "ragab@gmail.com",
            "address": "fayoum",
            "gender": "male",
            "role": "admin",
            "_id": "66b4926d85ea80e0ec6081c8",
            "__v": 0,
            "createdAt": "2024-08-08T09:39:57.751Z",
            "updatedAt": "2024-08-08T09:39:57.751Z",
            "id": "66b4926d85ea80e0ec6081c8"
        }
    }
}

///////////////////////////////////////////////////
api : login
http://localhost:5000/api/v1/react/auth/login

req body :
{
"email":"admin3@gmail.com",
"password":"admin1234567"

}

res data:
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ",
    "data": {
        "user": {
            "_id": "66b36deca47092390358ca84",
            "fullName": "react",
            "age": 60,
            "email": "admin3@gmail.com",
            "address": "fayoum",
            "password": "$2a$08$iKTQtgGlT7Rv6uZBTfSKv.pWJ1UQ6kfjS/KD3S0ZaGAhA94vE6twC",
            "gender": "male",
            "role": "admin",
            "__v": 0,
            "createdAt": "2024-08-07T12:51:56.471Z",
            "updatedAt": "2024-08-07T12:51:56.471Z",
            "id": "66b36deca47092390358ca84"
        }
    }
}