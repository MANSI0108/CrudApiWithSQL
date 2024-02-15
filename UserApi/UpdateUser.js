const express = require("express")
const connection = require("../config/config");
const upload = require("../middleware/multer");
const router = express.Router();
const { check, validationResult } = require("express-validator")



router.patch("/update/:id", [upload.single("profile"),
check('Email', 'emai is invalid').isEmail().notEmpty(),
check('PhoneNo', "phone no. is invalid").isLength({ min: 10, max: 10 }).notEmpty(),
check('Name', 'Enter Your Name First').notEmpty()], (req, res) => {
    let details = req.body;
    let id = req.params.id;
    let name = details.Name;
    let email = details.Email;
    let city = details.City;
    let phone = details.PhoneNo;
    let job = details.Designation;
    let filename = req.file.filename;
    let mimetype = req.file.mimetype


    
    // query1 = `select * from Persons where PersonID = ${id}`;
    // check('Email').custom(async value => {

    //     const user = await query1.findUserByEmail(value);
    //     if (user) {
    //         throw new Error('E-mail already in use');
    //     }
    // }),

    query = "update Persons set Name=?,Email=?,City=?,PhoneNo=?,Designation=?,filename=?,mimetype=? where PersonID=?";

    connection.query(query, [name, email, city, phone, job, filename, mimetype, id], async (err, result) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return await res.json(errors)
        }
        else {
            if (!err) {

                if (result.affectedRows == 0) {
                    return await res.status(404).json({ message: "Person Not Found" })
                }
                else {
                    return await res.status(200).json({ message: "User Updated Successfully" })
                }

            }
            else {
                return await res.status(500).json(err);
            }
        }

    })



})


module.exports = router;