require('dotenv').config();
const db = require('../config/mysql');
const jwt = require('jsonwebtoken'); // Import jwt

//My SQL querys
const queries = {
    getAllDoctor: `SELECT * FROM ${process.env.MYSQL_DATABASE}.doctor`,
    fetchAppointments: `SELECT * FROM ${process.env.MYSQL_DATABASE}.appointments WHERE doctor_id = ?`,
    addDoctor: `INSERT INTO ${process.env.MYSQL_DATABASE}.doctor(name,email,mobile,password,imgURL,speclist) VALUES (?,?,?,?,?,?);`,
}

//Get all doctor
async function doctor(req, res) {
    try {
        //GET DATA
        db.query(queries.getAllDoctor, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error When Data Found",
                    error: err
                })
            }
            return res.status(201).json({
                message: "Data Found",
                data: result
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

//Doctor registration
async function register(req, res) {
    const { name, email, mobile, password, imgURL, speclist } = req.body;
    try {

        // const hashPassword = await bcrypt.hash(password, 10); // Corrected bcrypt spelling
        db.query(queries.addDoctor, [name, email, mobile, password, imgURL, speclist], (err, result) => {
            if (err) {
                console.log("Dss", err)
                return res.status(500).json({
                    message: "Error when Create user",
                    error: err
                });
            }
            return res.status(201).json({
                message: "Doctor Register Successful",
                data: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error when Create user",
            error: err
        });
    }
}

//Doctor appointments
async function appointment(req, res) {
    const { id } = req.params;
    //GET DATA
    db.query(queries.fetchAppointments, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error when Create user",
                error: err
            })
        } else if (result.length === 0) {
            return res.status(401).json({
                message: "User Not Found",
            })
        } else {
            return res.status(201).json({
                message: "fetch all appointments",
                data: result
            })
        }
    })
}

module.exports = { doctor, register, appointment };