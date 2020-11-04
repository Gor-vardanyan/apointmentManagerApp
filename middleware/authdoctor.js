const jwt = require('jsonwebtoken');
const DoctorsModule = require('../modules/doctors');

function authdoctor(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.jwt_doctorToken, async (err, token) => {
    if (err) return res.sendStatus(403)
    console.log(`token es : ${token}`);
    let doctor =  await DoctorsModule.findOne({dni:token});
    if(doctor === null || doctor.token === null){
      res.send('El Token no es valido');
    }else{
      req.doctor_email = doctor.email;
      next()
    }
    
  })
}

module.exports = {authdoctor}