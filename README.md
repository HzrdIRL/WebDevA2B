# WebDevA2B
Node.js movies blogsite

------Notes------

This code was adapted from an existing project from Helen Giapitzakis and Sean Kearney's github repositories. The initial code was created while following a tutorial located at https://thinkster.io/mean-stack-tutorial

Passport configuration is a modified version of files provided during lectures

Password must contain 1 upper case, 1 lower case, 1 number, and be at least 4 characters long


------Node.js Modules------

{
  "name": "nodeproj",
  "version": "1.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "bcrypt-nodejs": "0.0.3", //used for encryption/salting of passwords
    "body-parser": "~1.15.1", 
    "connect-flash": "^0.1.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "express": "~4.13.4", Express core module
    "express-session": "^1.14.1", //extension for user session handling
    "express-validator": "^2.20.10", //used for basic input validation
    "gentelella": "^1.3.0", //non-default bootstrap theme
    "http": "0.0.0", //Request handler
    "https": "^1.0.0", //Request handler
    "jade": "~1.11.0", //styling/template engine to replace syntactically cumbersome HTML
    "mongoose": "*", //handles database transactions from Node.js-MongoDB
    "mongoose-auto-increment": "*", //Number generator for ID's
    "mongoose-type-email": "^1.0.2", //Email validation for login/registration
    "morgan": "~1.7.0", //HTTP request logger
    "moviedb": "^0.2.6", //OMDB API Handler
    "passport": "^0.3.2", //Authentication middleware
    "passport-local": "^1.0.0", //Local authentication extension for passport
    "request": "^2.75.0",
    "serve-favicon": "~2.3.0", 
    "stylus": "0.54.5" //CSS Language Enhancements
  }
}

------Filestructure------

/config - Contains configuration files for passport authentication strategies

/models - Contains MongoDB .js files 

/public/javascripts - exposed files containing functions for AJAXing comments/replies

/public/stylesheets - Contains stylus and generated css files

/routes - Controllers for navigation and invoking javascript/AJAX functionality

/views - Contains .jade pages for front-end design. Layout.jade contains the shared navigation/header, all other view files are for unique purposes.
