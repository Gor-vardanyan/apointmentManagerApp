# Apointment Manager db
Apointment Manager data base with model client, date and doctor with its controllers.


## Crud
<ul>
Clients: 
      <li>  Selet all clients "app.get('/client/showAll',auth, showClients);" </li>
      <li>  Create clients "app.post( '/client/registerClients', registerClients);" </li>
      <li>  Delete clients "app.get( '/client/delete', auth, deleteClient);" </li>
      <li>  logIn clients "app.get( '/client/loginUser', loginUser);" </li>
      <li>  logOut clients "app.get( '/client/logOut', auth,logOut);" </li>

</ul>
<ul>
Date:  
      <li>  Selet all dates "app.get('/dates/showAll',showDates);" </li>
      <li>  Create dates "app.post('/dates/createDate', auth ,createDate)" </li>
      <li>  Delete dates "app.get('/dates/removeDate', auth ,removeDate)" </li>

</ul>
<ul>
Doctors:
      <li>  Create doctor "app.post( '/doctor/registerDoctor', registerDoctor);" </li>
</ul>  
