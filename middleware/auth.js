const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Authentication middleware to get jwt token from
 * user logging in.
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 */
module.exports = function auth(req, res, next)
{
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Access denied. No token provided.');

    try 
    {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex)
    {
        res.status(400).send('Invalid token.');
    }
}