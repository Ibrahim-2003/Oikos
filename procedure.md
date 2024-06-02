# Steps to Make a Website

1) Create a folder for the project
2) Enter the directory of the folder and execute "npm init"
3) Execute "npm -i express"
4) Execute "npm i --save-dev nodemon"
5) Go to the package.json file and add the following to the "scripts" section:
    "devStart": "nodemon server.js"
6) Create the server.js file
7) Create the "uploads" folder
8) Import libraries as shown below:

    ```
    const express = require('express');
    const path = require('path');
    const multer = require('multer');
    const fs = require('fs');
    const util = require('util');
    const { join, resolve } = require("path");
    const mysql = require("mysql");
    var bodyParser = require('body-parser');
    const { append } = require('express/lib/response');
    const { range } = require('express/lib/request');
    const { query } = require('express');
    ```
9) Initialize MySQL Server code as shown below:

    ```
    // Set storage engine
    const storage = multer.diskStorage({
        destination: "uploads/",
        filename: function(req, file, cb) {
        // null as first argument means no error
        cb(null, file.originalname);
        },
    });

    const upload = multer({storage,
        dest: 'uploads/'});

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        //port: "3306",
        // password: "mytOUrnEysql2003$",
        password: "password",
        database: "oikos_db",
        timezone: 'utc'
    });

    connection.connect(function(error){
        if (error) throw error
        else console.log(`Connected to database successfully. Open port ${port}`);
    });

    const app = express();
    const port = 4800;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, '')));

    makeQuery = function(query,vals){
        return new Promise(function(resolve,reject){
            if(vals){
                connection.query(
                    query,
                    vals,
                    function(err,rows){
                        if(rows === undefined){
                            console.log(new Error(`Error, the query was not successful - ${err}`));
                            reject(0);
                        }else{
                            resolve(rows);
                        }
                    }
                )
            }else{
                connection.query(
                    query,
                    function(err,rows){
                        if(rows === undefined){
                            console.log(new Error(`Error, the query was not successful - ${err}`));
                            reject(0);
                        }else{
                            resolve(rows);
                        }
                    }
                )
            }
            
        })
    }
    ```
10) To make a page, first write an `app.get` command as shown below:

    ```
    app.get('/', async function(req, res) {

        res.render('pagename.ejs', {ejs_variable: computed_variable,
                                    ejs_variable: computed_variable,
                                    ejs_variable: computed_variable,
                                    ejs_variable: computed_variable});
    })
    ```
    Then create a folder titled "views" and create the ejs file for the page with the preamble as below:
    ```
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="css/style.css">
            <link  rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </head>
        <body style="margin: 0;">

            PLACE HTML CODE HERE

            <script src="PLACE ANY LOCAL .JS SCRIPTS HERE"></script>
        </body>
    </html>
    ```

    Finally, create a folder titled "css" and create a "stylesheet.css" file for all the CSS code. Also, add a folder in the "css" folder titled "fonts". Next, define the color pallette and font families in the stylesheet.css file as below:

    ```
    :root{
    --rice-blue: #00205B;
    --rice-gray: #7C7E7F;
    --bright-blue: #9FDDF9;
    --light-gray: #E0E2E6;
    --dark-gray: #44474F;
    --midnight-blue: #13133E;
    --bright-green: #A5C151;
    --grass-green: #359245;
    --rich-blue: #0A509E;
    --brick-red: #C04829;
    --warm-yellow: #E9A139;
    --burgundy: #68132E;
    }


    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-Bold.woff2') format('woff2'),
        url('fonts/SFProDisplay-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: 'Rice';
    src: url('fonts/EnglishTowne.ttf');
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-var(--rice-blue)Italic.woff2') format('woff2'),
        url('fonts/SFProDisplay-var(--rice-blue)Italic.woff') format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-HeavyItalic.woff2') format('woff2'),
        url('fonts/SFProDisplay-HeavyItalic.woff') format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-ThinItalic.woff2') format('woff2'),
        url('fonts/SFProDisplay-ThinItalic.woff') format('woff');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-LightItalic.woff2') format('woff2'),
        url('fonts/SFProDisplay-LightItalic.woff') format('woff');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-Regular.woff2') format('woff2'),
        url('fonts/SFProDisplay-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-UltralightItalic.woff2') format('woff2'),
        url('fonts/SFProDisplay-UltralightItalic.woff') format('woff');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-SemiboldItalic.woff2') format('woff2'),
        url('fonts/SFProDisplay-SemiboldItalic.woff') format('woff');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
    }

    @font-face {
    font-family: 'SF Pro Display';
    src: url('fonts/SFProDisplay-Medium.woff2') format('woff2'),
        url('fonts/SFProDisplay-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    }

    body{
    font-family: 'SF Pro Display';
    font-weight: 500;
    font-style: normal;
    color: var(--rice-blue);
    }
    ```
    Note: for css classes, use .class_name and for specific element IDs use #id_name

* Delete Comp Note