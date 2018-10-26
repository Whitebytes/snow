

const Security = () => {
    return function(req, res, next) {
        //console.log(req);
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        console.log(req.cookies);
        console.log('cookie created successfully');

        next()
    }
}
export default Security;
