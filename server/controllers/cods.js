console.log('Cod controller');

// require mongoose
var mongoose = require('mongoose');

// create a model instance of any referenced models
var Cod = mongoose.model('Cod');

// export controller functions in an object
module.exports = function codsController(){
    this.index = function(req,res){
        //your code here
        console.log("codsController.index ran");
        Cod.find({}, function(err, data){
            // console.log("friend data:", data);
            res.json({data:data});
        });
    }
    this.create = function(req,res){
        //your code here
        console.log('codsController create req.body: ', req.body);
        var newCod = new Cod(req.body);
        console.log('codsController newCod: ', newCod);
        newCod.save();
        res.json({cod:newCod});
    }
    // this.update = function(req,res){
    //     console.log("friendsController update req.body: ", req.body);
    //     Friend.findByIdAndUpdate({_id:req.params.id}, {$set: req.body}, function(err, friend){
    //         if(err){
    //             console.log("friendsController update error: ", err);
    //         } else {
    //             console.log("friendsController update ran");
    //             console.log("friendsController friend after update: ", friend);
    //         }
    //     })
    //     res.json({placeholder:'updated'});
    // }
    this.delete = function(req,res){
        Cod.findByIdAndRemove(req.params.id, function(err, cod){
            if(!err){
                console.log(cod._id + "removed");
                res.json({deletion: cod._id + 'deleted'});
            } else {
                console.log("Error on delete: ", err);
                res.json({deletion: 'failed: ' + err});
            }
        })
    }
    // this.show = function(req,res){
    //     //your code here
    //     console.log("friendsController show ran");
    //     Friend.findOne({_id:req.params.id},function(err, data){
    //         console.log("friendsController show find data: ", data);
    //         res.json({data:data});
    //     })
    // }
}
