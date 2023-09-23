
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.envHOST,
    user: process.env.envUSER,
    password: process.env.envPASSWORD,
    database: process.env.envDATABASE,
}).promise()

const insertSelectedMeals = async(date, meals) => {
    try {
        const [res] = await pool.query(`
        INSERT INTO selected_meals (fetched_meal_id, date, selected_meal_details)
        VALUES (? , ?, ?)
        `, [3012, date, meals]);

        console.log(res)
        return res.insertId;
    } catch (error) {
        console.log(error)
    }
}

const signupUser = async(email, username, password) => {
    const signup_date = new Date();
    try {
        const [res] = await pool.query(`
        INSERT INTO signup_details (email, username, password, signup_date)
        VALUES (?, ?, ?, ?)
        `, [email, username, password, signup_date]);

        console.log(res)
        return res.insertId;
    } catch (error) {
        console.log(error)
    }
}
const loginUser = async(username, password) => {
    try {
        const [res] = await pool.query(`
        SELECT * FROM signup_details
        WHERE username = ? AND password = ?
        `, [username, password]);

        if(res.length === 1){
            return {login: true};
        }else{
            return {login: false}
        }
    } catch (error) {
        console.log(error)
        return {login: false}
    }
}

const getSelectedMeals = async(id) => {
    try {
        const [res] = await pool.query(`
        SELECT selected_meal_details FROM selected_meals
        WHERE meal_id = ?
        `, [id]);

        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertSelectedMeals,
    getSelectedMeals,
    signupUser,
    loginUser,
}