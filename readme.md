# Qronos-CMS-Backend

Qronos is an new and emerging CMS for young and enthusiastic developers want to build their websites using a CMS for emcommerce or informational websites. 

## Contents
---

- Installation: 
    - To install run "npm install" to install the project on your local machine.
- Requirements: 
    - Activate Caching: To enable cahing on your local system run Redis Cli on the local maching.
- Technology Stack: 
    - NodeJs
    - MongoDB
    - Redis
    - JWT
- Authors: 
    - [Varanshu Agrawal]('https://github.com/Varanshu')
    - [Ashwanth Reddy]('https://github.com/ashwanth-kumarD')

## Test credentials
---

- Email Address: 
    demo@pestoproject.com

- Password:
    Password@123

## .env File
---

- BASE_URL = < PORT NO >  
- JWT_SECRET_KEY = < JWT SECRET KEY >  
- ENV = < MODE >  
- MONGODB_URI = < MONGODB URI LINK >  
- REDIS_USERNAME = < REDIS SERVER USERNAME >  
- REDIS_PWD = < REDIS SERVER PASSWORD >  
- REDIS_HOST = < REDIS SERVER HOST >  
- REDIS_PORT = < REDIS SERVER PORT > 

### External API Calls
---

- Get All Entries
    ```js
    // Send a POST request
    axios({
        method: 'get',
        url: 'https://backend-qronos.onrender.com/api/v1/all?database_id={Database_ID}',
        headers: { 
            'Authorization': 'Bearer {Access Token}'
        }
    });
    ```

- Get All Product Entries
    ```js
    // Send a POST request
    axios({
        method: 'get',
        url: 'https://backend-qronos.onrender.com/api/v1/product?database_id={Database_ID}',
        headers: { 
            'Authorization': 'Bearer {Access Token}'
        }
    });
    ```

- Get All Blog Entries
    ```js
    // Send a POST request
    axios({
        method: 'get',
        url: 'https://backend-qronos.onrender.com/api/v1/blog?database_id={Database_ID}',
        headers: { 
            'Authorization': 'Bearer {Access Token}'
        }
    });
    ```

