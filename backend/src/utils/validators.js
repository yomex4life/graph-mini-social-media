module.exports.validateRegisterInput = (email, password, confirmPassword, username) =>{
    const errors = {};
    if(username.trim() === '')
    {
        errors.username = 'Username cannot be empty'
    }

    if(email.trim() === '')
    {
        errors.email = 'Email cannot be empty'
    }

    if(password.trim() === '')
    {
        errors.password = 'Password cannot be empty'
    }
    else if(password !== confirmPassword)
    {
        errors.confirmPassword = ' Password and confirm password do not match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) =>{
    const errors = {};
    if(username.trim() === '')
    {
        errors.username = 'Username cannot be empty'
    }

    if(password.trim() === '')
    {
        errors.password = 'Password cannot be empty'
    }  

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}