const jwt = require('jsonwebtoken');
const DoctorsModule = require('../modules/doctors');
const ClientsModule = require('../modules/clients');

function tokenCheck(req, res, next) {
  
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401) // if there isn't any token
  
  jwt.verify(token, 'auth_doctor', async (err, token) => {
    //if (err) res.sendStatus(403) 
    let doctor =  await DoctorsModule.findOne({email:token});
    if(doctor !== null){
        req.doctor_email = doctor.email;
        req.is_doctor = true;
        next();
    }
  })
  jwt.verify(token, 'first_project_mongo', async (err, token) => {
    //if (err) return res.sendStatus(403)
    let client = await ClientsModule.findOne({dni:token});
    if(client !== null ){
        req.client_dni = client.dni; // We define client_dni's content nesting it into req
        req.is_client = true;
        next();
    }
  })
}

module.exports = {tokenCheck}