# -*- coding: utf-8 -*-
from odoo import http

# class Customeraddress(http.Controller):
#     @http.route('/customeraddress/customeraddress/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/customeraddress/customeraddress/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('customeraddress.listing', {
#             'root': '/customeraddress/customeraddress',
#             'objects': http.request.env['customeraddress.customeraddress'].search([]),
#         })

#     @http.route('/customeraddress/customeraddress/objects/<model("customeraddress.customeraddress"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('customeraddress.object', {
#             'object': obj
#         })