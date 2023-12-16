# Job Board Platform API Documentation

## Overview
The Job Board Platform API is designed to provide a comprehensive set of endpoints for creating, retrieving, updating, and deleting data related to employers, job listings, seekers, and user management. This API serves as the backend for a job board platform, facilitating communication between clients and the server.This project aims to create a web application for managing job listings and applications. It provides a platform for employers to post job listings, seekers to apply for jobs, and administrators to manage the system.

## Technologies Used
The Job Board Platform API is built using the following technologies:
- Express.js: (Backend web framework )A lightweight and flexible Node.js web application framework for handling HTTP requests and building APIs.
- Prisma: A modern database toolkit that provides an Object-Relational Mapping (ORM) layer for interacting with the MySQL database.
- MySQL: A widely-used open-source relational database management system.
- Postman: API documentation and testing tool.
- VS code: A Source-code editor.
-MySQL Workbench: A visual database design tool.

##

###  &#x2611; We use RESTAPI principle as architectural style 

We used RESTAPI to build the project, which is an API that conforms to the REST design principles, or Representational State Transfer Architectural Pattern. For this reason, REST APIs are sometimes referred to as RESTful APIs. At the beginning, we chose it because it supports dealing with CRUD operations in a smooth and understandable way so that any programmer in the team can understand and deal with it, in addition to that it is based on the HTTP (Hypertext Transfer Protocol), which is the basis for communication on the World Wide Web. They use HTTP methods, such as GET, POST, PUT, DELETE, etc., to perform various operations on resources, and it is nice that they are separate from the design of the front-ends, and thus it is easy for us to work in the back-end and front-end separately, regardless of the number of programmers in the project.
In addition, this syntax is easy to handle while using nodejs because it returns the response in the form of a json file which is easy to handle and parse in this language.
Honestly, all team members have dealt with this technology before, so the suggestion was to deal with it to avoid any problems that may occur due to lack of time.

## Project Structure
The API follows RESTful design principles, allowing clients to interact with the server through various endpoints,the project follows a modular structure with the following components:

- `employer` folder: Contains API endpoints for managing employers. It includes features such as creating, updating, and deleting employers. The endpoints are implemented in the `services.js` file.

- `joblistings` folder: Contains API endpoints for managing job listings. It includes features such as creating, updating, and deleting job listings. The endpoints are implemented in the `jobListing.js` file.

- `seekers` folder: Contains API endpoints for managing job seekers. It includes features such as creating, updating, and deleting job seekers. The endpoints are implemented in the `seek.js` file.

- `user` folder: Contains API endpoints for managing user authentication and authorization. It includes features such as user registration and login. The endpoints are implemented in the `user.js` file.


- `Application.js`: This file includes features such as creating, updating, and deleting Applications  The endpoints are implemented in it.


## API Documentation
The API endpoints are documented using Postman. You can import the Postman collection available in the repository to explore and test the APIs. The collection includes detailed descriptions of each endpoint, request examples, and expected responses.

To access the API documentation in Postman:
1. Install Postman on your local machine if you haven't already.
2. Import the Postman collection file provided in the repository.
3. You will find a list of API endpoints with their respective documentation, including request formats and response structures.

## Database Schema
The API relies on the following database schema defined in `schema.prisma`:

// List of models:
- employer
- joblistings
- seekers
- Application
- user

// Relationships between models:
- employer has many job listings.
- seekers has many applications.
- joblistings has many applications.


The schema captures the relationships between different models, enabling efficient querying and manipulation of data.

## Security
To ensure the security of the Job Board Platform API, the following measures have been implemented:
- User Authentication: Users can register and log in to the platform using secure authentication mechanisms.
- User Authorization: Access to certain API endpoints is restricted based on user roles and permissions, ensuring that only authorized users can perform sensitive operations.

## How to run the project in your PC 

- Download all the programs you need: **the visual code** , **MySQL Server** , **MySQL WorkBench** and **Postman** .
- Clone the project in Visual Studio Code.
- write the MySQL server port 8081 in the `test.js` file.

```js
// Listen to port
app.listen(8081, () =>
  console.log("🚀 Server ready at: http://localhost:8081")
);
```

- Add the database name that you use in MySQL Workbench and your password in the `.env` file.

```js
 DATABASE_URL="mysql://root:{Your database Password}@localhost:3306/{your database name}"
```

- Run the project by typing `node test.js` in your terminal .

- if the project doesn't work maybe it needs some downloads, open the terminal and download what they need, we use this command when we build the 
project:
    - `npm i` : This command is used to install all the dependencies listed in the `package.json` file. It downloads and installs the required packages 
      from the npm registry into the `node_modules` directory.

    - `npx prisma migrate dev --name create-applications-table` : This command is specific to Prisma, a database toolkit. It runs a migration to create a 
       new table called applications in the database. The --name flag provides a name for the migration.

    - `npx prisma migrate dev` : This command runs any pending database migrations that have not been applied yet. It applies the migrations to the 
       database, updating the schema and data as necessary.

    - `npm i express mysql` : This command installs the Express framework and the MySQL driver as dependencies. Express is a popular web framework for 
       Node.js, and the MySQL driver enables communication with the MySQL database from your Node.js application.

    



## Documentation and Testing
The API is documented using Postman, which provides detailed descriptions of each endpoint, their expected inputs, and response formats. Postman also enables easy testing of API functionality, allowing developers to validate and troubleshoot their API requests and responses.

To execute the tests:
1. Set up the project and ensure all dependencies are installed.
2. Run the testing command specified in the project's documentation .
3. The tests will be executed, and the results will be displayed, indicating the success or failure of each test case.

## Conclusion
The Job Board Platform API provides a robust set of endpoints for managing employer, job listing, seeker, and user data. By following RESTful design principles, implementing security measures, and leveraging modern technologies, the API offers a reliable and scalable solution for building a job board platform.
