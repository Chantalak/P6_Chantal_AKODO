const rateLimit = require("express-rate-limit"); 

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100 //  limiter chaque IP à 100 requêtes par fenêtre
});

module.exports = limiter;