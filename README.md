# React + NodeJS + Sequelize project

This project is based off of the [Full Stack Web Development Course - ReactJS, Node.js, Express, MySQL](https://youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&si=XVJfbOLg0zes3G2F) YouTube tutorial by [Pedro Tech](https://www.youtube.com/@PedroTechnologies).

### Quick-start instructions

- Start the MySQL service: `/usr/local/mysql/support-files/mysql.server start`
- Start the Node.js app: `cd $PROJECT_URL/server && npm start`
- Start the React app: `cd $PROJECT_URL/client && npm start`

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

The client was set up using `React`, and `Axios` was used to request data from the server. A basic page setup was done to show the list of posts retrieved.

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

## Lesson 6 - Comments server setup

Created the comments table, created association between posts and comments and implemented create/get comments by post.

### Notes

- The `Sequelize` ORM creates capitalized foreign keys by default.
- Although we're using `/comments/:postId`, I feel like `/posts/:id/comments` would be a better endpoint. Might change to it later.

## Lesson 7 - Comments client setup

Created the add comment and list comments components (although tutorial did not modularize them) and added functionality.

### Notes

- Had to organize everything into components because the tutorial project is getting messy.
- (personal preference) Added a `<form>` around the add comment input and button to be able to submit when the enter key is pressed.
- (personal preference) List of comments sorted from newest to oldest.

## Lesson 8 - Registration and login

Added authentication server endpoints (`/auth/sign-up` and `/auth/login`) and client pages (`/sign-up` and `/login`). Actual authentication (using tokens) was not implemented yet.

### Notes

- Added library `bcrypt` for password hashing.
- Authentication will be refactored after next lesson.
- (personal preference) Improved organization and styling of authentication pages.

## Lesson 9 - JWT authentication

Added JWT authentication/middleware and corresponding changes in front-end to support it.

### Notes

- Added library `jsonwebtoken` for JWT token handling.
- Associating an entity to multiple other entities has to be within the same `associate` function.
- Added a default scope definition to allow the retrieval of associated entities on all requests. It needs to be done within the `associate` function to make sure all models have been defined already.
- The definition of capitalized sequelize models (e.g. `define('Posts', ...)`) introduced problems with foreign key automatic generation (foreign key as `PostId` instead of `postId`) and associated entities binding (e.g. in posts, returning field `User` instead of `user`). Changed sequelize models to lowercase and adapted code where needed.
- Removed the `username` field from the add post page because it is no longer needed.
- (personal preference) Excluded `createdAt` and `updatedAt` fields from being returned.
- (personal preference) Added redirect to `/login` when a 401 error occurs, keeping track of initial page to redirect back to once authentication is successful.

## Lesson 10 - Authentication in the client

Lesson was mostly focused on adding a consistent authentication state in the client using the `createContext` and `useContext` hooks.

### Notes

- The tutorial added a `username` property to the `comments` table, to keep track of which user created the comment (a terrible solution IMO). Since I had already implemented the one-to-many relationship between a user and a comment, I didn't have to change anything.
- The session storage was changed to local storage. Since I did a separate service for it, the changes were contained to 3 lines in 1 single file.
- Added a new server route `/auth/refresh`, currently used to check if the access token is still valid but should be refactored in the future to extend the access token's duration (hence its current name).
- Protected `NavBar` routes according to the `authenticated` state. 
- (personal preference) Refactored the `AuthContext` implementation to better reflect what is being stored.
- (future work) The `Login` and `SignUp` components need to be refactored soon, there's too much code repetition.

## Lesson 11 - Logging out + delete comment

The first part of this lesson focused on changing the client's auth context to include the user object, and using that information to show the logged-in user's username in the nav bar. The second part was adding the delete comment functionality to both the server and the client.

### Notes

- Server authentication endpoints changed to include user object.
- Logged-in user's username added to nav-bar's "logout" button.
- Delete comment functionality added to server and client.
- (personal preference) Refactored some code in both the server and the client.
- (personal preference) Created a `ResponseHelper` class in the server to handle generic responses.

## Lesson 12 - Adding likes

This lesson focused on adding a like system to both the server and the client.

### Notes

- Implemented a liking system for posts on the endpoint `/likes/:postId`. The same endpoint can be used to like and unlike.
- I attempted to implement a field `likes` in the `post` model that would reflect the count of all likes a given post has. I also attempted to do the same with a `liked` field, this time to return a boolean signaling if the logged-in user had liked the given post. After I finally achieved both (although for `liked` I was not able to convert the field to a boolean), it was such a "customized" solution that I decided against using it (see [here](https://sequelize.org/docs/v6/other-topics/sub-queries/#using-sub-queries-for-complex-ordering) for proposed solution). It took me about 2 minutes to manually write the needed SQL query, and 3-4 hours attempting to make it work using sequelize commands, options and functions.
- Linked posts to likes on the server via their models, so all posts will automatically have a `likes` array field, with each only containing the like id and the user who triggered it.
- The client implementation was quite simple since it only required creating a new `LikesService` and adding the needed changes to the `Post` component.
- (personal preference) Added empty catch statements to requests that require authentication, allowing the `ApiService` to handle 401 errors but still throw the error. Rethrowing is required because otherwise the initial request's `.then()` runs as if an exception never happened in the first place. There's likely a better way to do this, so I'll investigate deeper in the future.
- (personal preference) Added logging to `Sequelize` queries for easier debugging.

## Lesson 13 - Page not found

Most of this lesson focused on adding material UI icons and updating the like button to use different shades according to the user-associated state. A smaller part of it was dedicated to implementing a "page not found" route and component.

### Notes

- I did not add `MaterialUI` to the project, since I am already using `FontAwesome`.
- The current implementation of the liking system is already done in a way that allows for everything that was discussed in this lesson regarding the like/unlike feature, hence there were no changes.
- Implemented a very simple `PageNotFound` component.

## Lesson 14 - Delete a post

In this lesson, there were a couple of different features implemented:
- A sort of authentication guard to redirect the user to `/login` when not authenticated, for both home and create post pages.
- Authentication validation for nav-bar buttons.
- Changed the "create post" form to not require the field `username`, and instead extract the username from the authentication info in the server.
- A "delete post" button in the client, along with a `DELETE /posts/:id` endpoint in the server.

### Notes

- Had already implemented the authentication guard for pages that require login, the authentication validation for nav-bar buttons and changed the post's username to not be required, instead using a table association between `posts` and `users`.
- Implemented the "delete post" button on the header of the `Post` component. The server endpoint was already implemented previously.
- Refactored some styling in the `Post` component to adjust to the new feature.
- (personal preference) Added a new `AuthContext` field called `checked`, to be able to know when the authentication state has been confirmed by any `/auth` requests. This can eventually be refactored into a 3-state status: `unchecked`, `logged-in` and `logged-out`.
- (personal preference) Added a "no posts yet" message on the home page when no posts are available.

## Lesson 15 - Profile page

This lesson focused on adding a profile page for users, with a basic info section and a posts section.

### Notes

- Created the `/users/:id` and the `/users/:id/posts` endpoints in the server.
- Created the `Profile` page in the `/profile/:id` route in the client.
- Added a `Link` in the post's username to navigate to that user's profile.
- (personal preference) Refactored the nav-bar to better separate routes.

## Lesson 16 - Edit post + update password

The first part of this lesson focused on adding the "edit post" functionality. The second part focused on implementing the "update password" functionality.

### Notes

- The tutorial implemented the edit functionality by clicking on either the title or the body to directly change it using a `window.prompt()` dialog. Although it works for the most part, this approach completely bypasses form validation, so I decided against it.
- Added an edit button to the `Post` component, visible only when the user is the post's owner.
- Added an `EditPost` component, along with the post's edit route `/posts/:id/edit`. Implemented guards to validate that the post exists, the user is logged in and the user is the post's owner. The server endpoint to update a post was already done previously, so there was no need for changes there.
- Added an `UpdatePassword` component, along with the client route `/change-password`. Implemented the server endpoint `/auth/update-password`.
