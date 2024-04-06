// Middleware for handling auth
function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtTOken = words[1];
    const decodedValue = jwt.verify(jwtTOken, secret);
    if (decodedValue.username ) {
        next();
    }
    else {
        res.status(403).json({
            mes:"you r not authencated"
        })
    }
}

module.exports = userMiddleware;