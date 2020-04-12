var mongoose=require('mongoose');
var schema=mongoose.Schema;
var dataSchema=new schema(
{
        name:{type:String},
        password:{type:String},
        dob:{type:Date},
        branch:{type:String},
        semester:{type:String},
        uid:{type:String},
});
module.exports=mongoose.model('students',dataSchema);