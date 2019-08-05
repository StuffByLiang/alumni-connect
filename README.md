
# shad_connect
Node.js &amp; React prototype app for the shad alumni network
Made by Liang and Patrick

## Get Started
Navigate into a directory you would like to put the project folder in and then clone the project

    git clone https://github.com/StuffByLiang/shad_connect.git

Then install dependencies. Will take a couple of minutes... be patient

    npm i
    npm run setup

Install knex globally

    npm i -g knex

Fill in MySQL database details by creating ./backend/knexfile.js

    module.exports = {
      development: {
        client: 'mysql',
        connection: {
          host : '',
          user : '',
          password : '',
          database : ''
        }
      }
    };

Migrate Databases by typing in

    knex migrate:latest

You're done!

## How the fuck is this project structured???
There are two node.js applications. One is the express backend located in /backend, and the other is a frontend React application located on /frontend.
