## setup

to setup the database you need to add .env file to a mongodb hosting service..i recommend atlas or mlab

the .env file should look like this

DB_HOST=THE_HOST_URL

DB_USER=THE_DATABASE_USER

DB_PASS=THE_DATABASE_PASSWORD


## running instructions

npm install
npm start

it runs express server on port 9000 ..that could be changed in config/default.json

## POSTMAN

for all the requested urls
I added a postman collection ..the file is called PAPI.postman_collection.json

it will include all the urls,example and should be able to hold the login session cookie
