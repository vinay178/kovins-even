## Organization API

NodeJS Microservice API
Clean Architecture

### How to deploy

-  Run `npm run build`. This will create a folder `dist` in the root directory.
-  Copy the `.env` and `.sequelizerc` files to this folder.
-  Also copy the `Dockerfile` and `.dockerignore` files to same folder.
-  Build the docker image using `docker build -t <your username>/organization-app`.
-  Run the image with `docker run -p 8080:3000 -d <your username>/organization-app`. Docker mapped the 3000 port inside of the container to the port 8080 on your machine.
   For more information about the dockerizing Node.js project read the official documentation on [nodejs.org](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/ 'nodejs.org')

### mysql Setup

-  Install `mysql` server based on your operating system. And start the `mysql` service.
-  You can choose username and password. The default username is `root` and password is `password`
-  To login to the mysql run command `mysql -u user -p` in terminal. This will prompt to enter the user password. Replace the `user` with your username. eg: `mysql -u root -p`.
-  Create a database. This database will be used by the system and must be given in `.env` file. Use the command `create database database_name` name to create database. The `.env` config is given below.
-  The default url of the `mysql` server is `127.0.0.1` and port is `3306`

#### 1. Clone the repo and install dependencies3306

```
git clone
cd organization-app
npm i
npm i nodemon
```

#### 2. Create .env file in the root folder

The .env file fields are following. The .env file also contains configuration for the firebase account. You can down oad the firebase config json file from the firebase console. The keys are same as in the json file.

The terms starts with `DB` relates to the database configuration. You can configure database for `Production, Development, and Testing`.

A sample .env file look like

```
PORT=3000
NODE_ENV=development
API_BASE=/api/v1

DB_PRO_URL=127.0.0.1
DB_PRO_USERNAME='root'
DB_PRO_PASSWORD=password
DB_PRO_DATABASE=project

DB_DEV_URL=127.0.0.1
DB_DEV_USERNAME='root'
DB_DEV_PASSWORD=password
DB_DEV_DATABASE=project

DB_TEST_URL=127.0.0.1
DB_TEST_USERNAME='root'
DB_TEST_PASSWORD=password
DB_TEST_DATABASE=project

#Firebase config

type= <--Account type-->
project_id= <--Project id-->
private_key_id= <--Private Key Id-->
#Use double quotes for private_key bcz then only the new line character works
private_key= "<--Private Key-->"
client_email= <--Client Email-->
client_id=<--Client Id-->
auth_uri= <--Auth Uri-->
token_uri= <--Toke Uri-->
auth_provider_x509_cert_url= <--Auth provider cer uri-->

```

#### 3. Create babel configuration file '.babelrc' in root folder

Copy the following into .babelrc file

```
{
    "presets": [
        "es2015",
        "stage-2"
    ],
    // To keep async function run without an error "ReferenceError: regeneratorRuntime is not defined"
    "plugins": [
        [
            "transform-runtime",
            {
                "polyfill": false,
                "regoenerator": true
            }
        ]
    ]
}
```

#### 4. Run development

```
npm run dev
```

#### 5. Start project

```
npm start
```

#### 6. Run test

```
npm test
```

> Test for usecases runs on the test database. It is expected that there is enough data in the test DB to run the test properly. If data are missing in database or not properly configured the test may fail.
> Please ignore the error logs on the console while you run test. Its very normal

> Note : if .env is not created the port will be 8000 and every URL fill be prefixed by '/api'
