var express      = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var Promos       = require('../models/promotions');
var Verify     = require('./verify');

var promoRouter  = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){

    Promos.find({},function(err, dish){
        if (err) throw err;
        res.json(dish); 
    });
})

.post(Verify.verifyAdmin, function(req,res,next){
    
    Promos.create(req.body,function(err,dish){
        
        if (err) throw err;
        console.log('Promo Created');
        
        var id = promo._id;
        
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Added the Promotion with an ID: ' + id);
    });    
})

.delete(Verify.verifyAdmin, function(req,res,next){

    Promos.remove({},function(err,resp){
        
        if (err) throw err;
        console.log("All Promos are deleted");
        res.json(resp);
    });
});

//---------------------------------------------------------------------

promoRouter.route('/:promoId')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    
    Promos.findById(req.params.promoId,function(err,promo){
        
        if (err) throw err;
        res.json(promo);
    });
})

.put(Verify.verifyAdmin, function(req,res,next){

    Promos.findByIdAndUpdate(req.params.promoId, {
        
        $set : req.body
        
    }, {new:true},           
    function(err,promo){
        if (err) throw err;
        console.log(promo);
        res.json(promo);
    });
})

.delete(Verify.verifyAdmin, function(req,res,next){

    Promos.findByIdAndRemove(req.params.promoid, function(err,resp){
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promoRouter;