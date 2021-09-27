const express= require('express')
const router= express.Router()
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult}= require('express-validator')

const User= require('../../models/user')

//@route POST api/user
//@desc Test route
//@access Public
router.post('/', [
    check('name','Name is required')
    .not()
    .isEmpty(),
    check('email','Please inclue a valid email')
    .isEmail(),
    check('password','Please enter with 6 or more characters').isLength({min:6})
    ,

],
async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }
    
const { name, email, password}= req.body
try {
    //see if user exists
    let user = await User.findOne({ email })
    if (user) {
    return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

user= new User ({
    name,
    email,
    password
});


// encrypt password
const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

// return jsonwebtoken
const payload = {
    user: {
      id: user.id
    }
  }
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 360000 },
    (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    )
} catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
    
}



})



module.exports = router;