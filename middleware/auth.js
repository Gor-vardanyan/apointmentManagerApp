const jwt = require('jsonwebtoken');
const ClientsModule = require('../modules/clients');

function auth(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, 'first_project_mongo', async (err, token) => {
    if (err) return res.sendStatus(403)
    console.log(`token es : ${token}`);
    let client = await ClientsModule.findOne({dni:token});
    if(client === null || client.token === null){
      res.send('El Token no es valido');
    }else{
      req.client_dni = client.dni; // We define client_dni's content nesting it into req
      next()
    }
  })
}

module.exports = {auth}