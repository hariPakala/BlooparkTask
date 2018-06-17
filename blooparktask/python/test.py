import xmlrpc.client

import xml.etree.ElementTree

apiTree = xml.etree.ElementTree.parse('../config/settings/apicred.xml').getroot()

url = apiTree[0].text
dbname = apiTree[1].text
username = apiTree[2].text
password = apiTree[3].text

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url))
uid = common.authenticate(dbname, username, password, {})

models = xmlrpc.client.ServerProxy('{}/xmlrpc/2/object'.format(url))
ra = models.execute_kw(dbname, uid, password,
    'customeraddress.customeraddress', 'check_access_rights',
    ['read'], {'raise_exception': False})
print(ra)

rs = models.execute_kw(dbname, uid, password,
    'customeraddress.customeraddress', 'search_read',
    [[]],{'fields': ['zipcode', 'city', 'number','name']})

print(rs)
r2 = models.execute_kw(dbname, uid, password,
    'customeraddress.customeraddress', 'search_read',
    [[]],{'fields': ['zipcode', 'city', 'number']})

print(r2)


