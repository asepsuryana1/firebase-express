var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */

  //Fetch instances
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
});

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


module.exports = router;
