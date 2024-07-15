# hackhub.nl API   
    
> Events driven hackerspace communities in the Netherlands.   
         
REST API Proof of Concept for hackhub.nl in Node.js/TypeScript.     

> [!NOTE]
> Under construction - development only.            
   
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

## Requirements
Node.js, NPM and PostgreSQL installed.    

## Instructions:
Create `hackhub` database in PostgreSQL.   
    
Copy `.env.example` into `.env` and set values.    
            
Install dependencies:    
```
npm install
```    

Start the server: 
```
npm start
```    
           
Start the server only for development: 
```
npm run dev
```    
    
Start the server only for build: 
```
npm run build
```    
             
Run all tests:    
```
npm test
```    
        
## Test the API    
For testing with Postman import [postman_collection.json](./postman_collection.json)    
   
## License:   
[MIT](./LICENSE)   