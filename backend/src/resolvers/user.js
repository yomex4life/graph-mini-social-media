const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {UserInputError } = require('apollo-server'); 
const {validateRegisterInput} = require('../utils/validators')
const User = require('../models/User')
const dotenv =require('dotenv')
dotenv.config()

module.exports = {
    Mutation:{
        async register(_, {registerInput:{username, email, password, confirmPassword}}, context, info){
            const {valid, errors} = validateRegisterInput(email, password, confirmPassword, username)
            if(!valid)
            {
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.find({username})
            if(user)
            {
                throw new UserInputError('Username is taken', {errors:{
                    username: "This username is taken"
                }})
            }

            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
            })

            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, process.env.SECRET, {expiresIn: '1h'})

            return {
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}