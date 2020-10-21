const jwt = require('jsonwebtoken');
const SystemModule = require('../modules/system');

function authadmin(req, res, next) {
    console.log("1");
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  console.log("2");
  const token = authHeader && authHeader.split(' ')[1]
  console.log("3");
  if (token == null) return res.sendStatus(401) // if there isn't any token
  console.log("4");
  jwt.verify(token, process.env.jwt_admin, async (err, token) => {
    console.log(err);
    if (err) return res.sendStatus(403)
    console.log(`token es1 : ${token}`);
    let admin =  await SystemModule.findOne({email:token});
    console.log(`token es2 : ${token}`);

    if(admin === null || admin.token === null){
      res.send('El Token no es valido');
    }else{
      req.admin_email = admin.email;
      next()
    }
    
  })
}

module.exports = {authadmin}