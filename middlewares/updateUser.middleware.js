const userMiddleware = (req, res, next) => {

    if (req.user.id === req.params.id) {
        next();
    } else {
        res.status(401).json({ message: 'Permission Denied' });
    }
};


module.exports = userMiddleware;