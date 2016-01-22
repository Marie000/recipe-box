var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var recipes = [
    {
        key:"101",
        name: "Squirmy Pasta",
        ingredients: ["live worms","pasta sauce"],
        instructions: ["heat up pasta sauce","top live worms with pasta sauce","enjoy!"]
    },
    {
        key:"102",
        name: "BBQ squirrel",
        ingredients: ["1 large squirrel","BBQ sauce"],
        instructions: ["catch squirrel","cover squirrel with BBQ sauce","cook squirrel on BBQ until crunchy"]
    },
    {
        key:"103",
        name: "Compost Soup",
        ingredients: ["rotten apple cores","moldy banana peel","water","egg shells, crushed"],
        instructions: ["mix apple cores, banana peels and water","bring to a boil","simmer for 4-5 hours","served with crushed egg shells"]
    }
    ];


app.get('/recipes', function(req, res) {
    console.log("GET From SERVER");
    res.send(recipes);
});

app.post('/recipes', function(req, res) {
    var newRecipe = req.body;
    console.log("recipe sent");
    recipes.push(newRecipe);
    res.status(200).send("Successfully posted new recipe");
});

app.listen(6069);
