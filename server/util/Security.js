
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Token, Tag } = require('../models');
const uuid = require('uuid/v4'); // ES5

class Security{
    static syncAuth(){
        //api handles jwt tokens in cookies and in headers, here they are syncetd
        return async function(req, res, next) {
           
            if (req.cookies['Authorization'] 
                && req.cookies['Authorization'].startsWith('Bearer')){
                req.headers['authorization']=req.cookies['Authorization']
            }
            if (req.get('Authorization')){
                var token = req.get('Authorization');
                res.cookie('Authorization',token, { maxAge: 900000, httpOnly: true })
                token=token.substring(7);
                try{
                    var jwtInfo = jwt.verify(token, process.env.JWT_SECRET);
                    var dbToken = await Token.findOne({ where: { id: jwtInfo.id } })
                    if (dbToken)
                        req.user = await dbToken.getOwner();
                } catch(err){console.log(err)}
            }
            else
                res.clearCookie('Authorization')
            //process.stdout.write('\x1B[2J\x1B[0f');
            console.log(res)
            next()
        }
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
            appProps
        });
        user.token = await jwt.sign({
            id: token.id,
            userId: user.userId
        }, process.env.JWT_SECRET, { expiresIn: '1y' });
        res.cookie('Authorization','Bearer '+user.token , { maxAge: 900000, httpOnly: false})
        return user.token;
    }
}
export default Security;
 