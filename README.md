# ankasa-backend
Ankasa-backend is a RESTful API backend for interfacing ankasa relational database and providing API for ankasa frontend,
ankasa is a website where users can search and buy flight ticket. 

This repository also serves as a learning exercise at team collaboration and management.

## Teams members
This backend API is created by 3 backend team members and 1 support member, where each member have different tasks

[@alifankebima (Alif Anke Bima Putra)] : 
- Relational database design
- Flights CRUD
- Booking CRUD
- Passengers CRUD
- Notification CRUD
- Postman API documentation

[@rrizalyuniar (R. Rizal Yuniar Sutono)] : 
- Airline CRUD
- City CRUD
- Credit Card CRUD
- Email verification implementation

[@andkvnt (Andiko Oktavianto)] : 
- Reviews CRUD
- Flights, airlines, and city dummy data

[@iqbalapredo24 (Muhamad Iqbal Aprido)] (Support member) : 
- Team leader
- Authentication with JWT
- Users CRUD
- Admin CRUD
- Chat CRUD

## Documentation
Documentation files are provided in the [docs] folder
- [Postman API colletion]
- [PostgreSQL database query]
- [Database diagram]

## Installation
Follow this steps to run the server :
1. Clone this repository with `git clone https://github.com/alifankebima/ankasa-backend.git`
2. Change directory to ankasa-be with `cd ankasa-backend`
3. Run `npm install` to install all of the required modules
4. Create PostgreSQL database, query are provided in the [docs] folder
5. Create and configure `.env` file in the root directory, example are provided in `.env.example`
6. Run `npm run server` to run the server, or use `npm run dev` for running in development environment

## Debugging
Run `npm run lint` for debugging errors in this repository

## List of third-party modules
| Modules | Description |
| ------ | ------ |
| [Express] | Backend framework |
| [Nodemon] | Restart server on file change |
| [Morgan] | HTTP request logger |
| [node-postgres] | PostgresSQL interface library |
| [Dotenv] | Load environment variables |
| [CORS] | Enable CORS |
| [ESLint] | Linter for debugging |
| [Http-errors] | Create HTTP errors |
| [Helmet] | Set HTTP headers for security |
| [XSS-Clean] | Sanitize user input |
| [Bcryptjs] | Password encryption and salting |
| [Jsonwebtoken] | Token based user authentication |
| [Multer] | multipart/form-data handling |
| [Path] | Directory and file path handling |
| [UUID] | UUID Generator |
| [Socket.io] | Realtime communication for chat |

[docs]: <docs>
[Postman API colletion]: <docs/ankasa-backend.postman_collection.json>
[PostgreSQL Database Query]: <docs/ankasa-database-query.sql>
[Database Diagram]: <docs/ankasa-database-diagram.drawio.png>
[@alifankebima (Alif Anke Bima Putra)]: <https://www.github.com/alifankebima>
[@rrizalyuniar (R. Rizal Yuniar Sutono)]: <https://github.com/rrizalyuniar>
[@andkvnt (Andiko Oktavianto)]: <https://www.github.com/andkvnt>
[@iqbalapredo24 (Muhamad Iqbal Aprido)]: <https://github.com/iqbalapredo24>

[express]: <https://expressjs.com>
[Nodemon]: <https://nodemon.io/>
[Morgan]: <https://github.com/expressjs/morgan#readme>
[node-postgres]: <https://www.npmjs.com/package/pg>
[Dotenv]: <https://www.npmjs.com/package/dotenv>
[CORS]: <https://github.com/expressjs/cors#readme>
[ESLint]: <https://eslint.org>
[Http-errors]: <https://www.npmjs.com/package/http-errors>
[Helmet]: <https://helmetjs.github.io/>
[XSS-Clean]: <https://github.com/jsonmaur/xss-clean>
[Bcryptjs]: <https://github.com/dcodeIO/bcrypt.js>
[Jsonwebtoken]: <https://jwt.io/>
[Multer]: <https://github.com/expressjs/multer>
[Path]: <https://github.com/jinder/path>
[UUID]: <https://github.com/uuidjs/uuid>
[Socket.io]: <https://socket.io/>