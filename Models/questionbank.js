var mongoose=require('mongoose');
var schema=mongoose.Schema;
var dataSchema=new schema(
{       qno:{type:Number},
        questionName:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correct:{type:String},
});
module.exports=mongoose.model('questions',dataSchema);