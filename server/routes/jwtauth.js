const express = require('express');
const router = express.Router();
const pool = require('../db.js');   
const bcrypt = require('bcrypt');


router.post("/register", async (req, res) => {

    try {
         // Take apart req.body (name, email, pass)
            const { name, email, password } = req.body;
           
        // Check if email already exists (if so, throw error)
            const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
                name
            ]);

            if (user.rows.length > 0) {
                return res.status(401).json("That username was already taken!");
              } 
              

              
        // Bcrypt password
              
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            
            const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert details in db
            const newUser = await pool.query("INSERT INTO USERS(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [
                name, email, bcryptPassword
            ]);
            
            res.json(newUser.rows[0]);
        
            // Generate JWT 
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;