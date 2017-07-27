var express     = require('express');
var bodyParser  = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req,res,next){

	res.writeHead(200,{"cotent-type":"text/plain"});

	next();

})
.get(function(req,res,next){

	res.end("Will send all Leaders to you");
})

.post(function(req,res,next){

	res.end("Will add the Leaders with name: " + req.body.name + " with description: " + req.body.description);

})

.delete(function(req,res,next){

	res.end("Deleting all Leaders");
});

leaderRouter.route('/:leaderId')
.all(function(req,res,next){

	res.writeHead(200,{"cotent-type":"text/plain"});

	next();

})

.get(function(req,res,next){

	res.end("here are the details for leader: " + req.params.leaderId);
})

.put(function(req,res,next){

	res.end("Modifying the Leader with Id: " + req.params.leaderId + '\n');
	res.end("Updated name: " + req.body.name + " with description : " + req.body.description);
})

.delete(function(req,res,next){

	res.end("Deleting the leader with ID: " + req.params.leaderId);
});

module.exports = leaderRouter;