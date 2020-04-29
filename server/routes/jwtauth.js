const express = require("express");
const router = express.Router();
const pool = require('../db.js');   



router.post("/register", async (req, res) => {

    try {
         // Take apart req.body (name, email, pass)
            const { user_name, user_email, pass } = req.body;
           
        // Check if email already exists (if so, throw error)
            const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
                user_name
            ]);

            if (user.rows.length > 0) {
                return res.status(401).json("That username was already taken!");
              } else {
                  return res.status(200).json('username not taken!');
              }

        // Bcrypt password

        // Insert details in db

        // Generate JWT 
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;