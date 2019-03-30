let express = require("express");
let bodyParser = require('body-parser');
const CrawlerTmdn = require('./service/CrawlerTmdn');
const JsonValidator = require('./helper/JsonValidator');

let CrawlerService = new CrawlerTmdn();
let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let Port = 3000;

app.listen(Port, () => {
    console.log("Server running on port " + Port + " - RUNNING");
});

app.get("/", (req, res) => {
    res.status(500).send(
        JSON.parse("{\"error\":\"no route\"}")
    );
});

app.get("/trademark", (req, res) => {
    if (req.body == null) {
        res.status(500).send("Missing request body");
    }

    CrawlerService
        .run(req.body)
        .then(function (value) {
            return new JsonValidator(() => {
                res.json(JSON.parse(value));
            }, () => {
                res.status(500).send("Error response not JSON");
            }).validate(value);
        });
});