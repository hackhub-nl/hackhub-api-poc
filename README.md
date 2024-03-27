# hackerspaces-api-demo  
    
### Instructions:
- Install all dependencies: ```npm install``` 
- Create ```.env``` file in the root directory of the project and set following values:    
     
    ```POSTGRES_HOST```=...    
    ```POSTGRES_PORT```=...    
    ```POSTGRES_USER```=...    
    ```POSTGRES_PASSWORD```=...   
    ```POSTGRES_DB```=...   
        
    ```CLIENT_URL```=...   
        
    ```JWT_SECRET_KEY```=...    
    ```JWT_EXPIRES_IN```=...   
         
- Start the server: ```npm run start-dev```
  
### API Endpoints:
    
- Hackerspaces:
    - **GET** ```api/v1/hackerspaces``` Get all hackerspaces      
    - **GET** ```api/v1/hackerspaces/:id``` Get hackerspace by id   
    - **POST** ```api/v1/hackerspaces``` Create a new hackerspace   
    - **PUT** ```api/v1/hackerspaces/:id``` Update the hackerspace by id   
    - **DELETE** ```api/v1/hackerspaces/:id``` Remove hackerspace by id  
        
- Events:
    - **GET** ```api/v1/events``` Get all events      
    - **GET** ```api/v1/events/:id``` Get event by id   
    - **POST** ```api/v1/events``` Create a new event     
    - **PUT** ```api/v1/events/:id``` Update the event by id   
    - **DELETE** ```api/v1/events/:id``` Remove event by id  
        
### Database association:
- Hackerspace ```@HasMany``` Events
    
### Libraries: 
- [sequelize](https://github.com/sequelize/sequelize)   
- [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)   
- [zod](https://github.com/colinhacks/zod)    
     
### License:     
[MIT](/LICENSE)