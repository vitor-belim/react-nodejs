# React + NodeJS + Sequelize project

This project is based off of the [Full Stack Web Development Course - ReactJS, NodeJS, Express, MySQL](https://youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&si=XVJfbOLg0zes3G2F) YouTube tutorial by [Pedro Tech](https://www.youtube.com/@PedroTechnologies).

## Lesson 1 - Project introduction and server setup

The setup for the server part of this project required setting up `npm`, `NodeJS`, `Nodemon`, `MySQL` and `Sequelize`. At the end, the `NodeJS` app was up and running, while synchronizing changes to the DB schema automatically.

### Problems

- `MySQL` needed to be installed locally and permissions on Mac are annoying.
- `MySQL Workbench` is not necessary, `WebStorm` provides a better DB management tool.
- `sequelize-cli` needed to be installed globally for the command `sequelize init` to work.
- `Sequelize`'s DB setup requires the user and password to be stored in a text file, which is a clear security problem. The change to a .env approach was not straightforward.
