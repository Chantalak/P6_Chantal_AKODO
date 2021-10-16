module.exports = (req, res, next) => {
    const emailVerification = (email) => {
        let emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
        let isRegexTrue = emailRegex.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: 'Invalid email' });
    }
    emailVerification(req.body.email);
};

module.exports = (req, res, next) => {
    const passwordVerification = (password) => {
        let passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/i
        let isRegexTrue = passwordRegex.test(password)
        isRegexTrue ? next() : res.status(400).json({ message: 'Invalid password' });
    }
    passwordVerification(req.body.password);
}