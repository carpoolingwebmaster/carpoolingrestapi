var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./model/mongo");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

router.get("/", function (req, res)
{
//    res.json({"error": false, "message": "Welcome to CarPoolingRESTApi site. Webservice is set not available at the moment due to maintenance work is in progress. [Gayan]"});
      res.json({"error" : false, "message" : "Welcome to CarPoolingREST-API"});
});

router.route("/users")
        .get(function (req, res)
        {
            var response = {};
            mongoOp.find({}, function (err, data)
            {
                if (err)
                {
                    response = {"error": true, "message": "Error fetching data"};
                } else
                {
                    response = {"error": false, "message": data};
                }
                res.json(response);
            });
        })
        .post(function (req, res)
        {
            var db = new mongoOp();
            var response = {};

            db.userEmail = req.body.email;
            db.userPassword = require("crypto").createHash("sha1").update(req.body.password).digest("base64");
            db.save(function (err)
            {
                if (err)
                {
                    response = {"error": true, "message": "Error adding data"};
                } else
                {
                    response = {"error": false, "message": "Data Added"};
                }
                res.json(response);
            });
        });

router.route("/users/:id")
        .get(function (req, res)
        {
            var response = {};
            mongoOp.findById(req.params.id, function (err, data)
            {
                if (err)
                {
                    response = {"error": true, "message": "Error in fetching data"};
                } else
                {
                    response = {"error": false, "message": data};
                }
                res.json(response);
            });
        })
        .put(function (req, res)
        {
            var response = {};
            mongoOp.findById(req.params.id, function (err, data)
            {
                if (err)
                {
                    response = {"error": true, "message": "Error in fetching data"};
                } else
                {
                    if (req.body.userEmail !== undefined)
                    {
                        data.userEmail = req.body.userEmail;
                    }
                    if (req.body.userPassword !== undefined)
                    {
                        data.userPassword = req.body.userPassword;
                    }
                    data.save(function (err)
                    {
                        if (err)
                        {
                            response = {"error": true, "message": "Error in fetching data"};
                        } else
                        {
                            response = {"error": false, "message": "Data is updated for " + req.params.id};
                        }
                        res.json(response);
                    });
               }
            });
        })

        .delete(function (req, res)
        {
            var response = {};
            mongoOp.findById(req.params.id, function (err, data)
            {
                if (err)
                {
                    response = {"error": true, "message": "Error in fetching data"};
                } else
                {
                    mongoOp.remove(req.params.id, function (err)
                    {
                        if (err)
                        {
                            response = {"error": true, "message": "error in deleting data"};
                        } else
                        {
                            response = {"error": false, "message": "data associated with id :" + req.params.id + " is deleted"};
                        }
                        res.json(response);
                    });
                }
            });

        });

app.use('/', router);
console.log("Listening to default port and CarPoolintRestAPI is running!..");
