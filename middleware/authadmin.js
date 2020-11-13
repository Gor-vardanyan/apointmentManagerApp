const jwt = require('jsonwebtoken');
const SystemModule = require('../modules/system');

function authadmin(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401).send("fallo") // if there isn't any token

  jwt.verify(token, 'auth_admin'token) => {
    if (err) return res.sendStatus(403)
    console.log(`token es : ${token}`);
    let admin =  await SystemModule.findOne({email:token});
    if(admin === null || admin.token === null){
      res.send('El Token no es valido');
    }else{
      req.admin_email = admin.email;
      next()
    }
    
  })
}

module.exports = {authadmin}