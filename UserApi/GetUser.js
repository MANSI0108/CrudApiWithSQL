const express = require("express")
const connection = require("../config/config")
const router = express.Router();


router.get("/allusers",  (req, res) => {
    // let details = req.body;
    // let name = details.Name;
    // let email = details.Email;
    // let city = details.City;
    // let phone = details.PhoneNo;
    // let job = details.Designation;


    query = "select * from Persons";
   connection.query(query, async (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(err);
        }
    })



})

module.exports =router;