var express = require('express');
var router = express.Router();
const contacts = require('../controllers/ctrlContacts');
router.get('/getAllContacts', contacts.getAllContacts);
router.get('/getContactsById', contacts.getContactsById);
router.post('/createContacts', contacts.createContacts);
router.put('/updateContacts', contacts.updateContacts);
router.delete('/deleteContacts', contacts.deleteContacts);
module.exports = router;
