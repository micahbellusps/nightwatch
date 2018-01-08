var math = require("mathjs");
var _ = require('underscore');

var arr = [-3,5,6,-2];
var avg = _.reduce(arr,function(memo,num){ return memo + num }) / arr.length;
console.log('Avg'+avg);
var variance = _.reduce(arr,function(memo,num){ return memo + Math.pow((num - avg),2)}) / arr.length;
console.log(Math.sqrt(variance,2));



