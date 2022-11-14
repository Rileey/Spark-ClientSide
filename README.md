# Getting started with Spark

## Introduction
Spark is an online video platform where content creators and filmmakers can upload, display, and share their talents with others.
Our main goal is to create original content via a community of creators where collaboration is encouraged.

This Project is divided into three sub-projects.
-   Admin
-   Client
-   Server 

## Admin
The Admin sub-project is created for chosen Administrators with certain privileges to perform administrative tasks.

## Client
The Client sub-project is the platform where users can watch content.
[Spark-Client](https://github.com/Rileey/Spark-Client)

## Server
The Server sub-project is where the content, user and administrator data are being stored and manipulated. 

You are in the Server Repository.


This client project was created with >> [Node JS](https://nodejs.org/en/).
[Express](https://expressjs.com/en/).
[MongoDB](https://www.mongodb.com/).

# Product Overview

## Objectives
This is the first version of the spark project.

Created with express and exposed locally to the port 8001. 
This current version is about creating data structures for the Spark application. We made use of MongoDB for the database. >> [MongoDB database](https://www.mongodb.com/)

## Required tools
These are the required tools and packages to run the server.
-   Multer: Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
Learn More >> [here](https://expressjs.com/en/resources/middleware/multer.html)
-   Cloudinary: Cloudinary is an end-to-end image and video-management solution for websites and mobile apps, This is where our videos and images are going to be stored. >> [cloudinary](https://cloudinary.com/)
-   MongoDB Database: MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
Learn More >> [here](https://www.mongodb.com/what-is-mongodb)
-   .env File: Environment variables offer information on the process's operating environment (producton, development, build pipeline, and so on). Environment variables in Node are used to store sensitive data such as passwords, API credentials, and other information that should not be written directly in code. Environment variables must be used to configure any variables or configuration details that may differ between environments
Learn More >> [here](https://www.npmjs.com/package/dotenv)

### Database Connection
A database connection is needed to begin the project. A .env file is would be required to keep personal details away from the public.

These are the following sensitive information that we suggest to create in the file

MONGO_URL: This is the private URL given to you by MongoDB Once a connection has been established.
It contains the given name of the created databse and the password which would have to be created. 

### Cloudinary
Cloudinary is an end-to-end image and video-management solution for websites and mobile apps, This is where our videos and images are going to be stored. >> [cloudinary](https://cloudinary.com/)

Learn More >> [here](https://cloudinary.com/documentation/admin_api)

Once a cloudinary ------ has been created. You will be given the following information in order to make use pof cloudinary just like mongodb will give you its URL.

SECRET_KEY=talentcroft
1.  CLOUD_NAME: The cloudname of the service
2.  API_KEY
3.  API_SECRET

The Api key and Secret require authentication so do well to remember them 

The spark project would need different collections that can serve the user in the database. The model are as follows.
-   Users: This collection contains the users information.
-   Content: This collection contains the content information. => This would contain the movie content. (like the Video files)
-   Movies: This collection contains the movies information. => This would contain the movie data. (like images e.t.c)
-   MovieList: This collection contains the movielist information.

## Users collection
{
    username: String
    phoneNumber: Number,
    email: String,
    password: String,
    profilePicture: Array,
    about: String,
    followers: Array,
    following: Array,
    _posts: [{type: Schema.Types.ObjectId, ref: 'Post'}], => relationship with Post Collection
    isAdmin: Boolean,
    timestamps: true 
}

This is what the user collection looks like

## Content collection and Data Type
{
    title: String
    video: Array,
    year: Number,
    ageLimit: Number,
    duration: String,
    description: String,
    director: String,
    genre: String,
    timestamps: true 
}

## Movie collection and Data Type
{
    title: String,
    image: Array,
    thumbnail: Array,
    trailer: Array,
    video: Array,
    year: Number,
    ageLimit: Number,
    duration: String,
    description: String,
    director: String,
    content: [{type: Schema.Types.ObjectId, ref: 'Content'}], => relationship with Content Collection
    genre: String,
    isSeries: Boolean,
    timestamps: true 
}

## Movie List collection and Data Type
{
    title: String,
    description: String,
    type: String,
    genre: String,
    content: Array,
    timestamps: true 
}

This is what the user collection looks like

# The source code.
The Spark Server was created using NodeJS[Node JS](https://nodejs.org/en/), in application with [Express](https://expressjs.com/) Framework.

# Routes
## Auth
These Routes Contain the software logic for User login and Sign Up.
The defualt url is {{LOCAL_URL}}/api/auth created in the index.js page.
### Features:
-   Log in: Contains the Logic used to confirm if a record exist in the User collection.
-   Sign Up: Contains the Logic used to insert new records into the User collection.

## Users
-   The cloudinary logic in the utils folder called cloud enables us to store images and videos in a folder our choosing. I have decided to name this one views.
Import the logic in your user route in order to manipilate your cloudinary database as well as your mongodb database when you are updating the user on order to update things such as profile picture e.t.c.

Contains the software Logic for other CRUD (create, read, update and delete) operations such as:
-   Update User:
-   Delete User:
-   Get User:
-   Get All Users:
-   Follow User:
-   Unfollow User:
-   Get User Statistics:

## Content
Contains the software logic to manipulate the Content collection using cloudinary since this is where we would store our video and Image files.

-   The cloudinary logic in the utils folder called cloud enables us to store images and videos in a folder our choosing. I have decided to name this one views.
Import the logic in your content route in order to manipilate your cloudinary database as well as your mongodb database when you are creating the content route.

The Content Route contains the following logic
-   Create Content:
-   Update Content:
-   Delete Content:
-   Get all Contents:
-   Get One Content:

## Movies
Contains the software logic to manipulate the Movie collection using cloudinary since this is where we would store our video and Image files.

-   The cloudinary logic in the utils folder called cloud enables us to store images and videos in a folder our choosing. I have decided to name this one views.
Import the logic in your movie route in order to manipilate your cloudinary database as well as your mongodb database when you are creating the movie route.

The Movie Route contains the following logic
-   Create Movie:
-   Update Movie:
-   Delete Movie:
-   Get all Movies:
-   Get a random Movie:
-   Get random Movies (10): => Featured.
-   Get One Movie:

## List
Contains the software logic to manipulate the List collection.

The List Route contains the following logic
-   Create List:
-   Get All List:
-   Update List:
-   Delete List:

## Testing the routes
In order to test the Server Routes, I suggest making use of [Postman](https://www.postman.com/).
This is what the api routes in my Postman looks like >> [here](https://www.getpostman.com/collections/ecebe42e396249e1fe95) 

# Web Token
Web Tokens are most commonly used to identify an authenticated user. They are issued by an authentication server and are consumed by the client-server (to secure its APIs)

The web token logic protects the api from unauthenticated users.
The web token requires a secret key which I recommend should be named in the .env file.

SECRET_KEY: You can give it any name you want.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8001](http://localhost:8001) to view it in your browser.

The page will reload when you make changes.\

Hope you find this very helpful.


To learn React, check out the [React documentation](https://reactjs.org/).