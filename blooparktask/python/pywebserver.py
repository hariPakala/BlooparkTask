from http.server import HTTPServer, BaseHTTPRequestHandler
import ssl
from io import BytesIO
import zipcodes
import xmlrpc.client
import xml.etree.ElementTree

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def tnumVerify(self,num):
        # German numbers will be 11 in number. Here the 11 digit check is done, that is only digits
        # There is a python library for US number verfiy Twilio
        check = [x.isdigit() for x in num]
        if (all(check)) & (len(check) == 11):
            return True
        else :
            return False

    def insertIntoOdoo(self,city,postcode,num,name):
        apiTree = xml.etree.ElementTree.parse('../config/settings/apicred.xml').getroot()
        url = apiTree[0].text
        dbname = apiTree[1].text
        username = apiTree[2].text
        password = apiTree[3].text
        common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
        uid = common.authenticate(dbname, username, password, {})
        models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))
        rs1 = models.execute_kw(dbname, uid, password,'customeraddress.customeraddress', 'create',
              [{'city': city, 'zipcode': postcode, 'number': num, 'name': name}])
        
    def verfiy(self,body):
        input_Data = body.decode("utf-8").split('&')
        postcode=((input_Data[0]).split('=')[1])
        city=((input_Data[1]).split('=')[1])
        num=((input_Data[2]).split('=')[1])
        name=((input_Data[3]).split('=')[1])
        if (zipcodes.is_valid(postcode)):
            if (((zipcodes.matching(postcode))[0].get('city')) == city):
                numV = self.tnumVerify(num)
                if numV:
                    self.insertIntoOdoo(city,postcode,num,name)
                    return "1" # Zip code and city exactly match and phone number is fine
                else :
                    return "2" # Zip code and city exactly match, but phone number is not fine
            else:
                return "3" # Zip Code and City are not matching
        else:
            return "4" # Zip code is not found

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        re = bytes(self.verfiy(body),'utf-8')
        response.write(re)
        self.wfile.write(response.getvalue())

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world')

httpd = HTTPServer(('localhost', 4432), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket(httpd.socket,
        keyfile="../config/settings/key.pem",
        certfile='../config/settings/cert.pem', server_side=True)

httpd.serve_forever()
