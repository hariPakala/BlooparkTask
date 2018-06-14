# BlooparkTask


1) Move the folder my-modules into odoo-10.0 directory (installation directory)
2) ./odoo-bin --addons-path addons,my-modules   # A module name customeraddress
will be created with fields name, number, city and zipcode
3) Inside the folder bloopark execute npm install # all the dependencies will be executed
4) Inside the folder python run the command python3 pywebserver.py
    #install python dependencies http.server, ssl, io,zipcodes, xmlrpc.client
5) Inside the folder server run nodejs server.js

A react web application is created with customer form ('Client') 
from this client customer address information is sent to a http server running on port 8080

The server running on port 8080 will receive the data and send it to a python https server 
running on port 4432

Python server would verify the customer city and zipcode matching and insert the data into
odoo database for the module customer.address
If the zipcode does not exist or zipcode,city doesnot match an alert is generated in the web application


Certificates are stored in config setting settings folder 

