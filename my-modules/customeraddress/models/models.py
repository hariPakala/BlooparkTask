# -*- coding: utf-8 -*-

from odoo import models, fields, api

class customeraddress(models.Model):
     _name = 'customeraddress.customeraddress'

     name = fields.Text()
     number = fields.Text()
     city = fields.Text()
     zipcode = fields.Text()


