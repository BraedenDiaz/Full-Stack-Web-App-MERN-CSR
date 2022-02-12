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
