var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");

var DeviceType=mongoose.model("DeviceType");
var Classification=mongoose.model("Classification");

var Model=mongoose.model("Model");
var Color=mongoose.model("Color");

var Service=mongoose.model("Service");


router.post("/addDevice",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {name,picture}=req.body;
    const device=new DeviceType({
        name,
        picture
    })
    device.save().then((result)=>{
        res.json({result,done:true,msg:"Successfully saved new Device Type"});
    }).catch(err=>{
        console.log(err);
        res.json({done:false,msg:"Anything Wrong,Please Check"});
    })
})
router.post("/addClassification",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {name,picture,parentDeviceName}=req.body;
    DeviceType.findOne({name:parentDeviceName})
    .then((found)=>{
        console.log(found._id);
        const classification=new Classification({
            name,
            picture
        })
        classification.save()
        .then((result)=>{
                DeviceType.findOneAndUpdate({name:parentDeviceName},{
                    $push:{subClassifications:result._id}
            })
            .then((update)=>{
                res.json({f:update,done:true,msg:"Successfully saved new Classification"})
            })
            .catch(err=>{
                console.log(err);
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })
        })
        .catch(err=>{
            res.json({done:false,msg:"Anything Wrong,Please Check"});
            console.log(err)
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check parent Device Type"});
        console.log(err)
    })
    

})

router.post("/addModel",(req,res)=>{
    console.log(req.body);
    console.log("now model");
    const {name,picture,parentClassificationName}=req.body;
    Classification.findOne({name:parentClassificationName})
    .then(found=>{
        console.log(found._id);
        const model=new Model({
            name,
            picture,
        })
        model.save()
        .then((result)=>{
            Classification.findOneAndUpdate({name:parentClassificationName},{
                $push:{subModels:result._id}
            })
            .then((updatecateg)=>{
                res.json({f:updatecateg,done:true,msg:"Successfully saved new Model"})
            })
            .catch(err=>{
                console.log(err);
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })
        })
        .catch(err=>{
            res.json({done:false,msg:"Anything Wrong,Please Check"});
            console.log("Can not save");
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check parent Classification"});
        console.log(err)
    })
    
    
})
router.post("/addColor",(req,res)=>{
    console.log(req.body);
    console.log("now colors");
    const name=req.body.name;
    const picture=req.body.picture;
    const parentModelName=req.body.parentModelName;
    console.log(parentModelName);
    Model.findOne({name:parentModelName})
    .then(found=>{
        console.log(found._id);
        const color=new Color({
            name,
            picture
        })
        color.save()
        .then((result)=>{
    
            Model.findOneAndUpdate({name:parentModelName},{
                $push:{childColors:result._id}
            }).then(updat=>{
                res.json({f:updat,done:true,msg:"Successfully saved new Color"})
                console.log(updat);
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
                console.log(err);
            })
        })
        .catch(err=>{
            console.log("Can not save");
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check parent Model"});
        console.log(err)
    })
    
})

router.post("/addServiceToModel",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentName=req.body.parentName;

    console.log(parentName);
    Model.findOne({name:parentName})
    .then(found=>{
        console.log(found._id);
        const service=new Service({
            name,
            picture,
            possibleissues
        })
        service.save()
        .then((result)=>{
        
            Model.findOneAndUpdate({name:parentName},{
                $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
                res.json({f:updat,done:true,msg:"Successfully saved new Issue to Model"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
                console.log(err);
            })
        })
        .catch(err=>{
            console.log("Can not save");
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check Under Model Name"});
        console.log(err)
    })
    
})
router.post("/addServiceToClassification",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentName=req.body.parentName;

    console.log(parentName);
    Classification.findOne({name:parentName})
    .then(found=>{
        console.log(found._id);
        const service=new Service({
            name,
            picture,
            possibleissues
        })
        service.save()
        .then((result)=>{
                
            Classification.findOneAndUpdate({name:parentName},{
                $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
                res.json({f:updat,done:true,msg:"Successfully saved new Issue to Classification"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
            console.log("Can not save");
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check Under Classification Name"});
        console.log(err)
    })
    
})
router.post("/addServiceToDevice",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentName=req.body.parentName;

    console.log(parentName);
    DeviceType.findOne({name:parentName})
    .then(found=>{
        console.log(found._id);
        const service=new Service({
            name,
            picture,
            possibleissues
        })
        service.save()
        .then((result)=>{
            DeviceType.findOneAndUpdate({name:parentName},{
                $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
                res.json({f:updat,done:true,msg:"Successfully saved new Issue to Device-Type"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
            console.log("Can not save");
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    }).catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check Under Device-Type Name"});
        console.log(err)
    })
    
})
router.post("/pushColor",(req,res)=>{
    console.log(req.body);
    console.log("now colors pushing");
    const name=req.body.name;
    const parentModelName=req.body.parentModelName;
    console.log(parentModelName);
    Color.findOne({name:name})
    .then((result)=>{
            console.log(result._id);
            Model.findOneAndUpdate({name:parentModelName},{
                $push:{childColors:result._id}
            }).then((updat)=>{
                res.json({done:true,msg:"Successfully pushed Color to Model"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })

        })
      
    .catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check"});
        console.log("Can not save")
    })
})
router.post("/pushServiceToDevice",(req,res)=>{
    console.log(req.body);
    console.log("now Issue pushing");
    const name=req.body.name;
    const parentDeviceName=req.body.parentDeviceName;
    console.log(parentDeviceName);
    Service.findOne({name:name})
    .then((result)=>{
            console.log(result._id);
            DeviceType.findOneAndUpdate({name:parentDeviceName},{
                $push:{services:result._id}
            }).then((updat)=>{
                res.json({done:true,msg:"Successfully pushed Issue to Device Type"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })

        })
      
    .catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check"});
        console.log("Can not save")
    })
})
router.post("/pushServiceToClass",(req,res)=>{
    console.log(req.body);
    console.log("now Issue pushing");
    const name=req.body.name;
    const parentClassName=req.body.parentClassName;
    console.log(parentClassName);
    Service.findOne({name:name})
    .then((result)=>{
            console.log(result._id);
            Classification.findOneAndUpdate({name:parentClassName},{
                $push:{services:result._id}
            }).then((updat)=>{
                res.json({done:true,msg:"Successfully pushed Issue to Classification"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })

        })
      
    .catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check"});
        console.log("Can not save")
    })
})
router.post("/pushServiceToModel",(req,res)=>{
    console.log(req.body);
    console.log("now Issue pushing");
    const name=req.body.name;
    const parentModelName=req.body.parentModelName;
    console.log(parentModelName);
    Service.findOne({name:name})
    .then((result)=>{
            console.log(result._id);
            Model.findOneAndUpdate({name:parentModelName},{
                $push:{services:result._id}
            }).then((updat)=>{
                res.json({done:true,msg:"Successfully pushed Issue to Model"})
            }).catch(err=>{
                res.json({done:false,msg:"Anything Wrong,Please Check"});
            })

        })
      
    .catch(err=>{
        res.json({done:false,msg:"Anything Wrong,Please Check"});
        console.log("Can not save")
    })
})

// router.post("/createProduct",(req,res)=>{
//     console.log(req.body.details);
//     console.log("now");
//     const {name,mainpic,detailpic,price,actualPrice,companyname,description,mycategoryname,mysubcategory}=req.body.details;
//     console.log(name);
//     console.log(mainpic);
//     console.log(detailpic);
//     console.log(price);
//     console.log(actualPrice);
//     console.log(companyname);
//     console.log(description);
//     console.log(mycategoryname);
//     console.log(mysubcategory)

//     const prdct=new Product({
//         name,mainpic,detailpic,price,actualprice:actualPrice,companyname,description,category:mycategoryname,subcategory:mysubcategory
//     });
//     prdct.save()
//         .then(result=>{
//             console.log(result);
//             SubCategory.findOneAndUpdate({subname:mysubcategory},{
//                 $push:{items:result._id}
//             })
//             .then((updatecateg)=>{
//                 res.json({f:updatecateg})
//             })
//             .catch(err=>{
//                 console.log(err)
//             })   
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// })
router.get("/allDeviceTypes",(req,res)=>{
    DeviceType.find()
    .populate("subClassifications","name picture subModels")
    .then(categs=>{
        res.json({categs})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/ClassificationByDevice",(req,res)=>{
    console.log(req.body.name)
    DeviceType.findOne({name:req.body.name})
    .populate("subClassifications","name picture subModels")
    .populate("services","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/ModelByClassification",(req,res)=>{
    console.log(req.body.name)
    Classification.findOne({name:req.body.name})
    .populate("subModels","name picture childColors")
    .populate("services","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/colorByModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("childColors","name picture")
    .populate("services","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/colorByModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("childColors","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/allServiceOfDevice",(req,res)=>{
    console.log(req.body.name)
    DeviceType.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/allServiceOfClassification",(req,res)=>{
    console.log(req.body.name)
    Classification.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/allServiceOfModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/deleteDevice",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {itemID}=req.body;

    DeviceType.findByIdAndDelete(itemID)
    .then((update)=>{
        console.log(update._id);
        console.log(update.subClassifications);
        if(update.subClassifications==[]){
            console.log("hhjjkkkkkh");
            res.json({done:true,msg:"Successfully deleted"});
        }else{
            update.subClassifications.map((indvc)=>{
            Classification.findByIdAndDelete(indvc)
            .then((deleted)=>{
                console.log(deleted.subModels);
                if(deleted.subModels==[]){
                    res.json({done:true,msg:"Successfully deleted"});
                }
                else{
                    deleted.subModels.map((indiv,index)=>{
                    Model.findByIdAndDelete(indiv)
                    .then(thisalso=>{
                        console.log(thisalso);
                        res.json({done:true,msg:"Successfully deleted"})
                    });
                })                
                }
                
            }).catch(err=>{
                console.log(err);
                res.json({done:false,msg:"Anything Wrong"})
            })
        })
        
    }
    })
    .catch(err=>{
        console.log(err);
        res.json({done:false,msg:"Anything Wrong,Please Check"});
    })

})
router.post("/deleteClassification",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {item,parentDevice}=req.body;

    DeviceType.findByIdAndUpdate(parentDevice,{
        $pull:{subClassifications:item._id}
    })
    .then((update)=>{
        console.log(update._id);
        Classification.findByIdAndDelete(item._id)
        .then((deleted)=>{
            console.log(deleted.subModels);
            if(deleted.subModels==[]){
                res.json({done:true,msg:"Successfully deleted"});
            }else{
                 deleted.subModels.map((indiv,index)=>{
                Model.findByIdAndDelete(indiv)
                .then(thisalso=>{
                    console.log(thisalso);
                    res.json({done:true,msg:"Successfully deleted"})
                });
            })
        }
            
        }).catch(err=>{
            console.log(err);
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({done:false,msg:"Anything Wrong,Please Check"});
    })


})
router.post("/deleteModel",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {item,parentClass}=req.body;

    Classification.findByIdAndUpdate(parentClass,{
        $pull:{subModels:item._id}
    })
    .then((update)=>{
        console.log(update._id);
        Model.findByIdAndDelete(item._id)
        .then((deleted)=>{
            console.log(deleted);  
            res.json({done:true,msg:"Successfully deleted"})          
        }).catch(err=>{
            console.log(err);
            res.json({done:false,msg:"Anything Wrong,Please Check"});
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({done:false,msg:"Anything Wrong,Please Check"});
    })

})
router.post("/pullColor",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {item,parentModel}=req.body;

    Model.findByIdAndUpdate(parentModel,{
        $pull:{childColors:item._id}
    })
    .then((update)=>{
        res.json({done:true,msg:"Successfully deleted"})
    }).catch((err)=>{
        res.json({done:false,msg:"Anything Wrong,Please Check"});
    })

})
router.post("/pullService",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {item,parentModel,parentClass,parentDevice}=req.body;

    Model.findById(parentModel)
    .then(found=>{
        console.log(found._id);
        if(found.services==[]){
            console.log("model has no service");
        }else{
            if(found.services.includes(item._id)){
                Model.findByIdAndUpdate(parentModel,{
                    $pull:{services:item._id}
                })
                .then((update)=>{
                    res.json({done:true,msg:"Successfully deleted"})
                }).catch((err)=>{
                    res.json({done:false,msg:"Anything Wrong,Please Check"});
                })
            }else{
                console.log("model has not include this");
            }
        }
    })
    Classification.findById(parentClass)
    .then(found=>{
        console.log(found._id);
        if(found.services==[]){
            console.log("Classification has no service");
        }else{
            if(found.services.includes(item._id)){
                Classification.findByIdAndUpdate(parentClass,{
                    $pull:{services:item._id}
                })
                .then((update)=>{
                    res.json({done:true,msg:"Successfully deleted"})
                }).catch((err)=>{
                    res.json({done:false,msg:"Anything Wrong,Please Check"});
                })
            }else{
                console.log("Classification has not include this");
            }
        }
    })
    DeviceType.findById(parentDevice)
    .then(found=>{
        console.log(found._id);
        if(found.services==[]){
            console.log("Device Type has no service");
        }else{
            if(found.services.includes(item._id)){
                DeviceType.findByIdAndUpdate(parentDevice,{
                    $pull:{services:item._id}
                })
                .then((update)=>{
                    res.json({done:true,msg:"Successfully deleted"})
                }).catch((err)=>{
                    res.json({done:false,msg:"Anything Wrong,Please Check"});
                })
            }else{
                console.log("Device Type has not include this");
            }
        }
    })
    

})
// router.get("/allSubCategories",(req,res)=>{
//     SubCategory.find()
//     .populate("items","name mainpic price actualprice companyname")
//     .then(subcategs=>{
//         res.json({subcategs})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
// router.get("/indivSubCategory/:id",(req,res)=>{
//    console.log(req.params.id)
//     SubCategory.findById(req.params.id)
//     .populate("items","_id name mainpic price actualprice companyname")
//     .then(indivsubcateg=>{
//         res.json({indivsubcateg})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
// router.get("/indivSubCategorybyName/:name",(req,res)=>{
//     const subName=req.params.name;
//     console.log(subName)
//      SubCategory.findOne({subname:subName})
//      .populate("items","_id name mainpic price actualprice companyname")
//      .then(indivsubcateg=>{
//          res.json({indivsubcateg})
//      })
//      .catch(err=>{
//          console.log(err)
//      })
//  })

// router.get("/indivItem/:id",(req,res)=>{
//     console.log(req.params.id)
//      Product.findById(req.params.id)
//      .then(indivItem=>{
//          res.json({indivItem})
//      })
//      .catch(err=>{
//          console.log(err)
//      })
//  })



module.exports=router;