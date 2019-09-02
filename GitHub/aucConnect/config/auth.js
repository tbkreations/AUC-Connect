module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Must Be Logged in to view resource');
        res.redirect('/users/login');
    }
}