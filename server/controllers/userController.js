require('dotenv').config();
const db = require('../config/mysql');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

//My SQL querys
const queries = {
    addAppointment: `INSERT INTO ${process.env.MYSQL_DATABASE}.appointment(name, age, disease, mobile, doctor_id, appointment_time) VALUES (?,?,?,?,?,?);`,
    addUser: `INSERT INTO ${process.env.MYSQL_DATABASE}.user(name, age, email, password) VALUES (?,?,?,?);`,
    addTask: `INSERT INTO ${process.env.MYSQL_DATABASE}.task(user_id, task_name, task_date, task_time, status) VALUES (?,?,?,?,"Pending");`,
    readUser: `SELECT * FROM ${process.env.MYSQL_DATABASE}.user WHERE email=?`,
    readTask: `SELECT * FROM ${process.env.MYSQL_DATABASE}.task WHERE user_id=?`,
    updateTask: `UPDATE ${process.env.MYSQL_DATABASE}.task SET status=? WHERE id=?`,
    fetchData: `SELECT * FROM ${process.env.MYSQL_DATABASE}.task WHERE id = ?;`
}

//Create Appointment
async function appointment(req, res) {
    const { name, age, disease, mobile, doctor_id, appointmentTime } = req.body;
    try {
        //Add data on DataBase
        db.query(queries.addAppointment, [name, age, disease, mobile, doctor_id, appointmentTime], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error when Create Appointment",
                    error: err
                })
            }
            return res.status(201).json({
                message: "Appointment Register Successful",
                data: result
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when Create Appointment",
            error: err
        })
    }
}

//Register user
async function register(req, res) {
    const { name, age, email, password } = req.body;
    try {
        db.query(queries.addUser, [name, age, email, password], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error when Create user",
                    error: err
                });
            }
            return res.status(201).json({
                message: "User Register Successful",
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
//Add Task
async function addTask(req, res) {
    const { date, time, task, status } = req.body;
    const id = req.body.id;
    try {
        db.query(queries.addTask, [id, task, date, time, status], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error ",
                    error: err
                });
            }
            db.query(queries.fetchData, [result.insertId], (err, updatedata) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error ",
                        error: err
                    });
                }
                return res.status(201).json({
                    message: "Task Add Successful",
                    data: updatedata
                });
            })

        });
    } catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }

}

//Login user
async function login(req, res) {
    const { email, password } = req.body;
    try {
        //Take user from database
        db.query(queries.readUser, [email], async (err, result) => {
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
                // Convert the result object to a JSON string
                const user = JSON.stringify(result[0]);
                //Genrate token
                const token = jwt.sign({ userId: result[0].id }, `${process.env.SECREAT_KEY}`, { expiresIn: '1h' });
                if (password == result[0].password) {
                    return res.status(201).json({
                        message: "User Login Successful",
                        token: token,
                        user: user
                    })
                } return res.status(401).json({
                    message: "Password Not Match",
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

//Get Task Data
async function gettask(req, res) {
    const id = req.params.id;
    try {
        db.query(queries.readTask, [id], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error ",
                    error: err
                });
            }
            return res.status(201).json({
                message: "Task Add Successful",
                data: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }

}


//Update Task Data
async function updateTask(req, res) {
    const id = req.body.id;
    const status = req.body.status
    try {
        db.query(queries.updateTask, [status, id], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error ",
                    error: err
                });
            }
            return res.status(201).json({
                message: "Task Add Successful",
                data: result
            });
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err
        });
    }

}

module.exports = { appointment, login, register, addTask, gettask, updateTask };