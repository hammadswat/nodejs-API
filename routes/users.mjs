import express from 'express'
import Users from "../modles/user.mjs"
import verifyToken from '../middlewares/verifyToken.mjs'
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send({ data: users })
})


router.post('/register', async(req, res) => {
    try {

        // const user = new Users(req.body)
        // await user.save()
         await Users.create(req.body)

        res.send({ message: 'User registered successfully!'})
    } catch (e) {
        res.status(404).send({ message: e.message })
    }
})
router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Check if email exists
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Email not found!' });
        }

        // Step 2: Compare Password
        const isCorrectPassword = user.comparePassword(password);

        if (!isCorrectPassword) {
            return res.status(401).send({ message: 'Password is incorrect!' });
        }

        // Step 3: Generate Token
        const token = user.generateToken();
        
        if (!token) {
            return res.status(401).send({ message: 'Failed to generate token!' });
        }

        // Update user with new token
        user.tokens = user.generateToken()
        user.tokens.push(token);
        await user.save();

        res.send({ message: 'User logged in successfully!', token });
    } catch (error) {
        console.error("Error logging in:", error);
         res.status(401).send({ message: 'Internal server error' });
    }
});


router.put('/logout', verifyToken, async (req, res) => {
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({ message: 'Logged out successfully!' })
})


export default router