# hackerspaces-api-demo 

### Install all dependencies:  
```yarn install```  
### Start the server: 
```yarn start-dev```   
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