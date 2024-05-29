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
- The client is firing the `GET /posts` request twice, even though it's wrapped in a `useEffect()`. This is a consequence of using `React.StrictMode` ([\<StrictMode\>](https://react.dev/reference/react/StrictMode#)), which is useful for identifying problems early-on in development.

## Lesson 4 - Client routes and creation form

Pages for listing all posts and creating new ones were created. Lesson focused creating and handling the "create post" form using `Formik` & `Yup`.

### Notes

- Libraries `react-router-dom`, `formik` and `yup` added to client project.
- The `react-router-dom` routing setup was different since the tutorial was using an older version of the library.
- WebStorm is not providing autocomplete for the `Yup` library. It likely works better with TypeScript.
- (personal preference) List of posts sorted from newest to oldest.
- (personal preference) Refactored project folder structure, created isolated components and moved css to component-specific css files.
- (personal preference) Created different services to better manage API requests.
- (personal preference) Adjusted css ids and classes.

## Lesson 5 - Details page

Added a details page for each post, containing the post itself and a future comment section. The lesson focused URL parameters and `useHistory() / useNavigate()`.

### Notes

- The `useHistory()` hook has been deprecated in favour of the `useNavigate()` hook.
- Chose to add a 'large' option to the `Post` component instead of copy-pasting it with different styles.
- (personal preference) Created remaining CRUD methods in the server.
- (personal preference) Refactored routes naming.
