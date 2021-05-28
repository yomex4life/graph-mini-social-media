const jwt = require('jsonwebtoken');
const { AuthenticationError} = require('apollo-server');
const dotenv =require('dotenv')
dotenv.config()

module.exports = (context) =>{
    const authHeader = context.req.headers.authorization;
    //console.log(authHeader);
    if(authHeader)
    {
        //Bearer .....
        const token = authHeader.split('Bearer ')[1];
        if(token)
        {
            try
            {
                const user = jwt.verify(token, process.env.SECRET);
                return user;
            }
            catch(error)
            {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token not valid');
    }

    throw new Error('Authorisation header is missing');
}