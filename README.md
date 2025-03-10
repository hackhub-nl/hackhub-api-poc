# hackhub.nl API   
            
REST API Proof of Concept for hackhub.nl in Node.js/TypeScript.     
             
## Instructions:    

### 1. Postman setup:    
- Add environment (give it a name) in Postman (top right corner).   
- Import Postman collection: [postman_collection.json](./postman_collection.json).      
    
### 2. Project setup:    
- Copy `.env.example` into `.env`.      
- Generate public and private keys and set in `.env` file.     
    
### 3. Start Docker:    
- Start app and pgAdmin in Docker: `docker-compose up`        
           
### 4. Database setup (configure database in pgAdmin4):             
- Navigate to: `localhost:5050`       
- Create new server: `postgres`                
- Set the server parameters:     
```
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=hackhub
```   
- Create db: `hackhub`      

### 5. Restart Docker to create the database:    
`docker-compose up`     
            
## ER Diagram:
```mermaid
erDiagram
    HACKER-EVENTS-ORGANIZERS {
        number id
        number hackerEventId
        number organizerId
    }
    HACKER-EVENTS ||--o{ HACKER-EVENTS-ORGANIZERS : has-organizers 
    HACKER-EVENTS {
        number id
        string name
        string description
        number hackerSpaceId
    }
    HACKER-SPACES ||--o{ HACKER-EVENTS : hosts 
    HACKER-SPACES {
        number id
        string name
        string city
        string province
        string website
    }
    ORGANIZERS ||--o{ HACKER-EVENTS-ORGANIZERS : organizes
    ORGANIZERS {
        number id
        string name
        string description
    }
    USER ||--o{ SESSIONS : logs-in
    USER {
        number id
        string email
        string name
        string password
    }
    SESSIONS
    SESSIONS {
        number id
        boolean valid
        string userAgent
        number userId
    }     
```   
   
## Routes and requests:   
- Admin routes: `http://localhost:7000/api/admin/...`    
- Visitor routes: `http://localhost:7000/api/...`        

## License:   
[MIT](./LICENSE)   