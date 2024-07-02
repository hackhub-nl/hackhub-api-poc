# hackhub-api-poc  

### Requirements
Node.js, NPM and PostgreSQL installed.    

### Instructions:
- Create `hackhub` database in PostgreSQL.   
- Rename `.env.example` to `.env` and set values.    
     
- Install dependencies:    
```
npm install
```            
- Start the server: 
```
npm run dev
```          
- Run all tests:    
```
npm test
```  
    
### ER Diagram:
```mermaid
erDiagram
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
```