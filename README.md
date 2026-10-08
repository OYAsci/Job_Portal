# Job Portal

A small full-stack job_portal project with a static HTML/CSS/JavaScript frontend, an Express API, and a MariaDB database.

## Current features

- Register an employee/job-seeker account
- Log in with email and password
- View a basic dashboard
- Delete an account

The current backend stores accounts in the `Employee` table. Employer accounts, job listings, and job applications are not implemented yet.

## Technology

- Frontend: HTML, CSS, browser JavaScript
- Backend: Node.js and Express 5
- Database: MariaDB/MySQL
- Password hashing: bcrypt
- Database driver: mysql2

## Project structure

```text
Job_Portal/
├── .gitignore
├── README.md
├── job_seeker_schema.sql
├── Backend/
│   ├── Server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
└── Frontend/
    ├── index.html
    ├── Login.html
    ├── Login.js
    ├── Register.html
    ├── Register.js
    ├── dashboard.html
    └── styles.css
```


## Requirements

- Node.js 18 or newer
- npm
- MariaDB or MySQL
- Git

## Clone the repository


```sh
git clone https://github.com/OYAsci/Job_Portal.git
cd Job_Portal
```

## Setup

### 1. Create the database

Make sure `job_seeker_schema.sql` is in the project root. Open the MariaDB/MySQL client:

```sh
mariadb -u root -p
```

Then run the schema file from the client. Replace the path with its full path on your computer:

```sql
SOURCE C:/path/to/Job_Portal/job_seeker_schema.sql;
```

The script creates the `Job_seeker` database and the `Employee` table.

### 2. Configure the backend

Create `Backend/.env` with your local database settings:

```env
DB_HOST=localhost
DB_USER=your_mariadb_username
DB_PASSWORD=your_mariadb_password
DB_NAME=job_seeker
PORT=3000
```


### 3. Install dependencies and start the server

In a terminal, run:

```sh
cd Backend
npm install
node Server_updated.js
```

The server should report that MariaDB connected and that it is listening on port 3000.

### 4. Open the app

Visit [http://localhost:3000/](http://localhost:3000/). Express serves the static files from the sibling `Frontend` directory, and the frontend sends API requests to the backend.

## API routes

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Serves the frontend home page |
| `POST` | `/api/register` | Creates an employee account |
| `POST` | `/api/login` | Checks email and password |
| `DELETE` | `/api/users/:id` | Deletes an employee account by ID |

Registration accepts `first_name`, `last_name`, `email`, and `password`. It can also accept `age`, `location`, `sex`, and `experience`; those fields may be null.

## Database

The schema file creates one table, `Employee`, with an auto-incrementing ID, name and profile fields, a unique email address, a bcrypt password hash, and an account creation timestamp.

## Development status

This is a learning/demo project. The current login flow does not establish a server-side session or issue an authentication token. Add server-side authentication and authorization before using protected actions such as account deletion in a deployed application.
