const express = require("express")
const connection = require("../config/config")
const router = express.Router();


router.delete("/delete/:id",(req,res)=>{
    let id = req.params.id;
    // let name = details.Name;
    // let email = details.Email;
    // let city = details.City;
    // let phone = details.PhoneNo;
    // let job = details.Designation;
    query = "delete from Persons where PersonID=?";

 
   
        connection.query(query,[id],(err,result)=>{
            if(!err){

                if(result.affectedRows==0){
                    return res.status(404).json({message:"Person Not Found"})
                }
                else{
                    return res.status(200).json({message:"User Deleted Successfully"})
                }
                
            }
            else{
                return res.status(500).json(err);
            }
        })
    
    

})


module.exports=router;