const db = require("../config/mysql");

// Create Table for doctor
const createDoctor = `
    CREATE TABLE IF NOT EXISTS doctor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar(200) NOT NULL,
        email varchar(250) UNIQUE NOT NULL,
        mobile varchar(20) UNIQUE NOT NULL,
        password varchar(220) NOT NULL,
        imgURL varchar(2000) NOT NULL,
        speclist varchar(200)
    )
`;

// Create Table for user
const createAppointement = `
    CREATE TABLE IF NOT EXISTS appointment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar(200) NOT NULL,
        age INT NOT NULL,
        disease varchar(250) NOT NULL,
        doctor_id INT,
        mobile varchar(20) UNIQUE NOT NULL,
        appointment_time ENUM('9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17') NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctor(id)
    )
`;

// Create Table for user
const createUser = `
    CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar(200) NOT NULL,
        age INT NOT NULL,
        email varchar(250) UNIQUE NOT NULL,
        password varchar(220) NOT NULL
    )
`;

// Create Table for task
const createTask = `
    CREATE TABLE IF NOT EXISTS task (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        task_name VARCHAR(200) NOT NULL,
        task_date VARCHAR(200),
        task_time VARCHAR(200),
        status varchar(200) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
    )
`;

// Execute queries
db.query(createDoctor, (err, result) => {
    if (err) throw err;
    console.log("Doctor table created successfully");
});

db.query(createAppointement, (err, result) => {
    if (err) throw err;
    console.log("Appointement table created successfully");
});

db.query(createUser, (err, result) => {
    if (err) throw err;
    console.log("User table created successfully");
});
db.query(createTask, (err, result) => {
    if (err) throw err;
    console.log("Task table created successfully");
});