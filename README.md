# Phonebook

Web application that provides a phonebook

## Documentation

You can find the documentation [here](https://github.com/PKriwin/phonebook/wiki)

## Setup & Use

### 1. requirements

+ **Nodejs >= v8** 
+ **Npm**
+ **A dbms server (mysql, mssql, postgres) or a sqlite .db file**

### 2. Clone the project

ssh:
```
$ git clone git@github.com:PKriwin/phonebook.git
```

https:
```
$ git clone
```
### 3. Configure your config files

Create  a `config.json` file in each specified directory like below:

#### backend/api/config.json
```
{
  "host": "localhost",        // Server host
  "port": "3000",             // Server port

  "dbAdapter": {              // Database adapter config

    "dbName": "test",         // DB name
    "dbUsername": "user",     // DB username
    "dbPassword": "pswd",     // DB password
    "dbHost": "localhost",    // DB Host
    "dbDialect": "sqlite",    // DBMS dialect (mysql | sqlite | postgres | mssql)

    /* Absolute path to sqlite database file (only for sqlite of course) */
    "dbStorage": "/path/to/sqlite/database.db",    

    "dbLogging": "false"      // Display SQL logs in terminal
  }
}
```

#### backend/assets/web_app_server/config.json
```
{
  "host": "localhost",   // Server host
  "port": 8080,          // Server port

  /* Absolute path to frontend directory */
  "frontend_dir_path": "/path/to/frontend/dir"
}
```

#### frontend/config.json
```
{
  "apiUrl": "http://localhost:3000"  // REST API Server address
}
```

### 4. Installing dependencies
In `backend/api`, `backend/assets/web_app_server`,  `frontend` directories run in each:
```
$ npm install
```

### 4. Compile frontend

in `frontend` directory  run
```
$ npm run build
```

### 5. Start Servers
Open two terminals, one in `backend/api` and another in `backend/assets/web_app_server` and run in each:
```
$ npm start
```
## Tests
In `backend/api` run
```
npm test
```

## License
MIT
