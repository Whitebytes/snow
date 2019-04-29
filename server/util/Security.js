
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Token } = require('../models');
const uuid = require('uuid/v4'); // ES5

class Security{
    static syncAuth(){
        //api handles jwt tokens in cookies and in headers, here they are syncetd
        return async function(req, res, next) {
           if (req.get('Authorization')){
                var token = req.get('Authorization');
                token=token.substring(7);
                try{
                    var jwtInfo = jwt.verify(token, process.env.JWT_SECRET);
                    var dbToken = await Token.findOne({ where: { id: jwtInfo.id } })
                    if (dbToken){
                        req.user = await dbToken.getOwner();
                        req.token = dbToken
                    }
                } catch(err){console.log(err)}
            }
            next()
        }
    }
    static async validateToken(token){
        try{
            var jwtInfo = jwt.verify(token, process.env.JWT_SECRET);
            var dbToken = await Token.findOne({ where: { id: jwtInfo.id } })
            if (dbToken){
                return dbToken
            }
        } catch(err){console.log(err)}
        throw new Error("Invalid or expired token")
    }

    static async login(email, password, appName, appProps, res){
       
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            throw new Error('No user with that email');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        var token = await Token.create({
            id :uuid(),
            userId: user.id,
            appName, 
            appProps,
            active: false
        });
        user.token = await jwt.sign({
            id: token.id,
            userId: user.userId
        }, process.env.JWT_SECRET, { expiresIn: '1y' });
        return user.token
    }
}
export default Security;
 