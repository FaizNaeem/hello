const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AddUser = require("../Schema/User");
const router = express.Router();

router.get("/", async (req , res ) =>{
       const user = await AddUser.find()
       res.status(200).json({
        status: 200,
        user: user,
    });
})
router.post("/AddStudent", async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const user = await AddUser.create({ ...req.body });
        res.status(200).json({
            status: 200,
            msg: "User created successfully",
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
        });
    }
});

// Login Route
router.post("/Login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await AddUser.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: 401,
                error: "Invalid credentials",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                status: 401,
                error: "Invalid credentials",
            });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, "your-secret-key", {
            expiresIn: "1h",
        });

        res.status(200).json({
            status: 200,
            msg: "Login successful",
            token: token,
            User:user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const user = await AddUser.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 200,
            msg: "User Delete successfully",
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
        });
    }
})
router.put("/:id", async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const user = await AddUser.findByIdAndUpdate(req.params.id ,{ ...req.body });
        res.status(200).json({
            status: 200,
            msg: "User Update successfully",
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: "Internal Server Error",
        });
    }
})

module.exports = router;
