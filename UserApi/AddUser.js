const express = require("express")
const connection = require("../config/config");
const upload = require("../middleware/multer");
const router = express.Router();
const { check, validationResult } = require("express-validator")

router.post("/add", [upload.single("profile"),
check('Email', 'emai is invalid').isEmail().notEmpty(),
check('PhoneNo', "phone no. is invalid").isLength({ min: 10, max: 10 }).notEmpty(),
check('Name', 'Enter Your Name First').notEmpty()], (req, res) => {



    console.log(req.file);
    let details = req.body;
    let name = details.Name;
    let email = details.Email;
    let city = details.City;
    let phone = details.PhoneNo;
    let job = details.Designation;
    let filename = req.file.filename;
    let mimetype = req.file.mimetype

    query = "insert into Persons(Name,Email,City,PhoneNo,Designation,filename,mimetype) values(?,?,?,?,?,?,?)";
    const myURL = new URL(`http://localhost:5000/users/${req.file.filename}`);

    connection.query(query, [name, email, city, phone, job, filename, mimetype], async(err, result) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return await res.json(errors)
        }
        else {
            if (!err) {
                return await res.status(200).json({
                    message: "User Added Successfully",
                    profile_url: myURL
                })

            }
            else {
                return await res.status(500).json(err);
            }
        }

    })



})


module.exports = router;

