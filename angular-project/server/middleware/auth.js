/**
 *
 * @param {any} req
 * @param {any} res
 * @param {Function} next
 */
module.exports = (req, res, next) => {
  let authorization = req.headers["authorization"];
  if (authorization) {
    // Valider le token contre un utilisateur
    // dans la base de donnée
    res.header("X-AUTHORIZATION", authorization);
    next();
  } else {
    res.send(401, "Authorization Error");
  }
};
