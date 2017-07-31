var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var Dishes     = require('../models/dishes');
var Verify     = require('./verify');

// Declaring the Router. And all parsing the request.

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){

    Dishes.find({}, function(err,dish){
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyAdmin, function(req,res,next){
    console.log("Dish not Created yet");
    Dishes.create(req.body,function(err,dish){
        if (err) throw err;
        console.log("Dish Created");
        
        var id = dish._id;  
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Added the Dish with an ID: ' + id);
    });

})

.delete(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.remove({},function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
});

//----------------------------------------------------------------------------------------------
// Passing the Req Params

dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err, dish){
        if (err) throw err;
        res.json(dish);
        
    });
})

.put(Verify.verifyAdmin, function(req,res,next){

    Dishes.findByIdAndUpdate(req.params.dishId,{
        
        $set : req.body
        
    },{new: true
    },function(err,dish){
        if (err) throw err;
        res.json(dish);
    });
})


.delete(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.findByIdAndRemove(req.params.dishId,function(err, resp){
        if (err) throw err;
        res.json(resp);
    });
});

//-----------------------------------------------------------------------------------------------

dishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        if (err) throw err;
        
        dish.comments.push(req.body);
        
        dish.save(function(err, dish){
            if (err) throw err;
            console.log('comments updated');
            res.json(dish); 
        });
    }); 
})

.delete(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        if (err) throw err;
        
        for (var i = 0; i < dish.comments.length; i++ ){
            
            dish.comments.id(dish.comments[i]._id).remove();
            
        }
        
        dish.save(function(err, dish){
            if (err) throw err;
            res.writeHead(200, {'content-type':'text/plain'});
            res.end('ALl comments are deleted');
        });
    });
    
});

//------------------------------------------------------------------------------------------------

dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId)); 
    });
})
.put(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        
        dish.comments.id(req.params.commentId).remove();
        
        dish.comments.push(req.body); 
                              
        dish.save(function(err,resp){
            if (err) throw err;
            console.log('Updated the Commment');
            console.log(resp);
            res.json(resp);
        });
    });
})
.delete(Verify.verifyAdmin, function(req,res,next){
    
    Dishes.findById(req.params.dishId, function(err,dish){
        
        dish.comments.id(req.params.commentId).remove();
                               
        dish.save(function(err,resp){
            if (err) throw err;
            res.json(resp);
        }); 
    });
});


module.exports = dishRouter;