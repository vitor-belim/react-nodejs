# React + NodeJS + Sequelize project

This project is based off of the [Full Stack Web Development Course - ReactJS, Node.js, Express, MySQL](https://youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&si=XVJfbOLg0zes3G2F) YouTube tutorial by [Pedro Tech](https://www.youtube.com/@PedroTechnologies).

## Lesson 1 - Project introduction and server setup

The setup for the server part of this project required setting up `npm`, `NodeJS`, `Nodemon`, `MySQL` and `Sequelize`. At the end, the `NodeJS` app was up and running, while synchronizing changes to the DB schema automatically.

### Notes

- `MySQL` needed to be installed locally and permissions on Mac are annoying.
- `MySQL Workbench` is not necessary, `WebStorm` provides a better DB management tool.
- `sequelize-cli` needed to be installed globally for the command `sequelize init` to work.
- `Sequelize`'s DB setup requires the user and password to be stored in a text file, which is a clear security problem. The change to a .env approach was not straightforward.
- Unintentionally committed `.env` and `.idea` files to `GitHub`. Recreating repository was easier than force-pushing changes.

## Lesson 2 - Server requests

This lesson was about setting up routes and requests. It was mostly around `Sequelize` and how it works with `Node.js`.

### Notes

- Setup router and routes for Posts.
- Configured `Postman` for API requests' management.
- Created requests GET and POST for `/posts`. Used generated random data for the POST request.

## Lesson 3 - Client setup and connection to server

The client was setup using `React`, and `Axios` was used to request data from the server. A basic page setup was done to show the list of posts retrieved.

### Notes

- `React` was setup using the command `npx create-react-app .`.
- Turning on both client and server using `npm start` sometimes fails without a message, likely to be a problem with figuring out where the command should run.
- The `cors` library had to be used as a middleware to be able to establish communication between the client and the server.

