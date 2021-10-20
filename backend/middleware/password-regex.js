module.exports = (req, res, next) => {
    const passwordVerification = (password) => {
        //une lettre minuscule (?=.*[a-z]), une majuscule (?=.*[A-Z]), un numéro (?=.*[0-9]), un caractère spécial (?=.*[^A-Za-z0-9]), au moins 8 éléments (?=.{8,}).
        let passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/i
        let isRegexTrue = passwordRegex.test(password)
        isRegexTrue ? next() : res.status(400).json({ message: 'Le mot de passe doit comporter au moins 8 caractères dont une lettre majuscule et une lettre minuscule, un chiffre et un caractère spécial.' });
    }
    passwordVerification(req.body.password);
}