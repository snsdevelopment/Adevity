# Technical Documentation

**If you are viewing this directly from VSCode Install the `Markdown Preview Enchanced extension`. After that rght click on the file and click Markdown Preview Enchanced option.**



## Package.json
```
"scripts": {
    "start": "node app.js",
    "compile:sass": "node-sass sass/main.scss public/style.css -w",
    "test": "set PORT=3000&&jest --runInBand",
    "lint": "eslint --ext .js --verbose true --ignore-path .gitignore ."
},
```
`runInBand` is needed to run the tests sequentially. Until I find out a way to run the puppeteer tests in parallel. Without them interfering with each other.

## What environment variables are needed?
#### First create a .env file in the root directory.
#### Then add the following variables to it.
```.env
session_secret=SOMESECRET

db_dev_user= sth
db_dev_password = sth
db_dev_server = sth
db_dev_database = sth
db_dev_instanceName= sth



db_prod_user= sth
db_prod_password = sth
db_prod_server = sth
db_prod_database = sth
db_prod_instanceName= sth

PORT=80
dbState=dev
env = TESTING



test_webadmin_username=sth
test_webadmin_password=sth


AMAZON_ACCESS_KEY_ID=sth
AMAZON_SECRET_ACCESS_KEY=sth
AMAZON_BUCKET_NAME=sth

DEV_AMAZON_ACCESS_KEY_ID=sth
DEV_AMAZON_SECRET_ACCESS_KEY=sth
DEV_AMAZON_BUCKET_NAME=sth

updateSchema='NO'
```

`updateSchema='NO'` is used to update the database schema. If you want to update the schema set it to `YES` and run the server. After the schema is updated set it back to `NO`. I am doing it this way because we do not want to accidentally update the schema when switching between branches. This will also act as a final safeguard if you accidentally upload code to production server. It won't update the schema and it will be easier to revert the code changes then to revert the schema changes.

## Formatting guidelines ESLINT
``` json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": [
        "airbnb-base","plugin:jest/recommended"
    ],
    "parserOptions": {
    },
    "rules": {
        // Functions and classes are hoisted, so it's not necessary to define them before using them
        // But as we get things cleaned up, we can turn this rule back on to be up to the Airbnb style guide
        "no-use-before-define": ["error", {"functions": false, "classes": false}],
        "no-console": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "linebreak-style": 0   // <----------
    },
    "globals": {
        // It may be worth noting that you set the global variable to true if you can assign 
        // the variable to something else and false if it shouldn't be reassigned
        "createGenericMessage":false,
        "$":false,
        "glbObj":false,
        "moment":false,
        "setDateToTodaysDate":false
    }
}
```

In addition to setting the above file you also need to create a `.settings.json` file in vscode and add the following code to it.
``` json
{
    "terminal.integrated.profiles.windows": {
        "PowerShell": {
          "source": "PowerShell",
          "icon": "terminal-powershell",
          "args": ["-ExecutionPolicy", "Bypass"]
        }
      },
      "terminal.integrated.defaultProfile.windows": "PowerShell",
      
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.validate": ["javascript"],
}
```

`editor.codeActionsOnSave` option will try to autofix format issues when it can. If it can't it will show you the errors in the editor.

The global variables like `glbObj`, `moment` etc are used throughout the project. So I have added them to the global variables. If you are using a variable throughout the project add it to the global variables. If you are using a variable only in a single file add it to the `globals` object in the file. 

We are using the airbnb style guide. So please follow it. If you are using VSCode install the `eslint` extension. It will show you the errors in the code. If you are using a different editor you can use the `eslint` command to check for errors.

Remove error Expected linebreaks to be 'LF' but found 'CRLF' linebreak-style
Adding  `linebreak-style": ["error", "windows"]` to eslint Config worked. 

