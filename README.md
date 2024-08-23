# hackhub.nl API   
    
> Events driven hackerspace communities in the Netherlands.   
         
REST API Proof of Concept for hackhub.nl in Node.js/TypeScript.     
             
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
## Instructions:    
    
Copy `.env.example` into `.env` and set values.     
    
Start app, db and pgadmin in Docker: `docker-compose up`     
    
Configure database in pgAdmin4:       
- Navigate to: `localhost:5050:80`       
- Create new server: `postgres`                
- Create db: `hackhub`      

## Test the API    
For testing with Postman import [postman_collection.json](./postman_collection.json)    
   
## License:   
[MIT](./LICENSE)   