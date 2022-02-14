# Full-Stack Web App (MERN Stack)

The goal of this project was to create a website as an example of an implementation of a full-stack web application using the MERN stack.


## The Web Stack (MERN)

This web app uses the MERN stack.

Specifically, it uses the following technologies and frameworks:

### Front-End
- HTML
- CSS
- TypeScript/JavaScript
- React
- React Router

### Back-End
- ExpressJS
- TypeScript/JavaScript
- Mongoose (for MongoDB)

## Client-Side Rendering (CSR)

Additionally, this web application uses Client-Side Rendering for the rendering of its static and dynamic interfaces.

## Technical Features

- A front-end RESTful API used to access the web server's API endpoints and perform the CRUD (Create, Read, Update, and Delete) operations on the web server's resources.
- A back-end RESTful API on the back-end route endpoints to allow the performing of CRUD operations on web server resources.
- A database API created with Mongoose to access and work with a functioning MongoDB database server.
- Full user registration and login functionality.
- Secure user session creation and management using the MongoDB database as the session store.

### Security

- Password hashing and salting with bcrypt.
- Front-end and back-end authentication and authorization for performing CRUD operations on web server resources.
- Cryptographically randomly generated secrets for user session cookies and MongoDB database communication.
- Use of Cross-Site-Scripting (XSS) protection middleware to set various security-based HTTP headers to protect against some XSS attacks.
- Validation, santization, and stripping of user input to protect against additional XSS attacks.
- Use of Cross-Site Request Forgery (CSRF) middleware and tokens on user input forms to protect against CSRF.
- Additional security-based middleware to protect against other attacks such as HTTP parameter pollution.

## The Web App

As for the website itself, it represents a forum-based website where users can create their own discussion forums about a topic of their choosing such that other users can come in and dsicuss that topic.

With that said, this website is a "toy site" in that it isn't meant to be a website deployed to production. Instead, it was created to help me as the web developer to practice and showcase my full-stack web development skills along with my experience specifically in the MERN stack.

Nevertheless, although the website isn't intended for production-level use, it was still developed with the assumption that it could be a production level website and so I still implemented code and features that would support this possibility. Some examples of this can be seen from the Technical Features section above.

## Website Features

### Main Pages

- A homepage providing similar information as shown in this README document.
- A "Forums" page allowing users to access the website's forums.
- An "About" page showing the project's licensing information.
- A "Contact" page displaying contact information for the developer of the web app (me).

### User Accounts
- User account registration, login, sessions, and logout.
- User account management. E.g. Users can change their account information such as their username and password.
- User account deletion.

### Forums
- Ability for users to create new forums.
- Ability for users to view (read) all existing website forums.
- Ability for users to edit (update) the forums that they created.
- Ability for users to delete the forums they created.

### Froum Comments
- Ability for users to create comments on any forum.
- Ability for users to view (read) all the comments on any given forum.
- Ability for users to edit (update) the comments they created on any forum.
- Ability for users to delete the comments they created on any forum.
- Ability for forum authors to delete any comment only on the forums that they created.
- Ability for forum authors to delete all comments only on the forums that they created.

## Run the Web App

This section will explain how to run the web application.

### Prerequisites

The following are required to run this web application:

- NodeJS runtime environment and NPM which you can get on the [NodeJS website](https://nodejs.org/en/download/).
- A running MongoDB server. The free community version can be downloaded from the [website for MongoDB](https://www.mongodb.com/try/download/community).

### Steps

Perform the following steps to run this web application.

1. Fork/download the files in this GitHub project.

2. In your terminal, change into the `/backend` directory and perform an NPM install to install the dependencies for the back-end.

```
npm install
```

3. Change into the `/frontend` directory and do the same.

```
cd ../frontend
npm install
```

4. A `.env` file is provided at `/backend/.env`. This file can be used to set configurations for the back-end such as the web server port, database server information, session configuration, etc.

- If you are running everything on your localhost (web server, MongoDB database server, etc) and don't have any security settings on your MongoDB database server, you do NOT need to change this file.

- If your MongoDB database has security configurations, change the `MONGODB_HOST` environment variable as needed.

- NOTE: The `.env` file is provided in this repository as an example since this is not a production web application. NEVER put the `.env` file or any secrets for an actual production web application in your repository. Instead, add it to your `.gitignore` file for your projects.

5. First, run the back-end for the web application.

```
cd /backend
npm run start
```

6. Next, run the front-end for the web application.

```
cd ../frontend
npm run start
```

This will open the web application in your default web browser and you can now use the application as desired.

7. Use the application.

- Try creating an account and logging in.
- Navigate to the 'forums' page and try creating a forum.
- Navigate into the forums you create and add some comments to the forum.
- Create different user accounts and create forums, add comments, etc.
- Click on your username in the navigation bar to open a sidebar that will allow you to go to a page where you can edit your account information or delete your account.
- See if you can access, modify, or edit the accounts, forums, comments of other users by attempting to navigate to their pages or sending modified HTTP requests.


