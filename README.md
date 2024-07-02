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
        string email
        string name
        string password
    }
    SESSIONS
    SESSIONS {
        boolean valid
        string userAgent
    }
    HACKER-EVENTS-ORGANIZERS {}
    HACKER-EVENTS ||--o{ HACKER-EVENTS-ORGANIZERS : has-organizers 
    HACKER-EVENTS {
        string name
        string description
    }
    HACKER-SPACES ||--o{ HACKER-EVENTS : hosts 
    HACKER-SPACES {
        string name
        string city
        string province
        string website
    }
    ORGANIZERS ||--o{ HACKER-EVENTS-ORGANIZERS : organizes
    ORGANIZERS {
        string name
        string description
    }
```