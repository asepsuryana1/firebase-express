# firebase-express (API)

#### instalasi

```bash
$ express <file.Name> --no-view 
$ npm install
$ npm install nodemon -D
$ npm install firebase -S
$ npm install firebase-admin -S
```
### config 
```js
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: '<your-api-key>',
    authDomain: '<your-auth-domain>',
    databaseURL: '<your-database-url>',
    projectId: '<your-cloud-firestore-project>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-sender-id>'
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
```
### Router Get
```js
router.get('/', function (req, res) {
  const userReference = firebase.database().ref("/Users/");
  //Attach an asynchronous callback to read the data
  userReference.on("value", function(snapshot) {
    console.log(snapshot.val());
    res.json(snapshot.val());
    userReference.off("value");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send("The read failed: " + errorObject.code);
  });

  ```
  ####  firebase realtime
  ```
  nuuby-co
          - Users
                - hero
                        Age: 12
                        Name: "ujang"
  ```  
### Router POST
```js
router.post('/', function (req, res) {
  const userName = req.body.username;
  const name = req.body.name;
  const age = req.body.age;

  const referencePath = '/Users/'+userName+'/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({Name: name, Age: age}, function(error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send("Data saved successfully.");
    }
  });
});
```
#### POSTMAN
#### POST localhost:3000
|key          |value        |
|-------------|-------------|
|userName     |Hero         |
|name         |superman     |
|age          |12           |

