var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//To handle the currency symbol in the price field
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Defining the new Schema 
var promoSchema = new Schema({

	name       : {type: String, required: true,unique: true},
	image      : {type: String, required: true},
	label      : {type: String, default: ''},
	price      : {type: Currency, required: true},
	description: {type: String, required: true}

},{timestamps:true});

//Defining the Model
var Promos     = mongoose.model("promo", promoSchema);

module.exports = Promos;