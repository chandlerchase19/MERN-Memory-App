const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const uuid = require('uuid')

//register
router.post('/register', async (req, res) => {
    const { email, password }  = req.body

    console.log('registering...')

    try {

        let user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ errors: ['User already exists'] })
        }

        const authId = uuid.v4()

        user = new User({
            email,
            password,
            authId
        })

        await user.save()

        res.json({user})

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')   
    }
})

router.post('/login', async (req, res) => {

    const { email, password }  = req.body

    try {

        let user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ errors: ['Username or password is incorrect']})    
        }

        if (password !== user.password) {
            res.status(400).json({ errors: ['Username or password is incorrect']})            
        }

        res.json({authId: user.authId})

    } catch (err) {
 
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})


router.post('/verify-id', async (req, res) => {
    const { authId }  = req.body

    try {
        console.log('hi', authId)
        
        let user = await User.findOne({ authId })

        console.log(user)
        
        res.json({idIsValid: true})

        if (!user) {
            res.status(400).json({ idIsValid: false})    
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }
})



module.exports = router