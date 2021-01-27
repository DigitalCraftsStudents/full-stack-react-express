const express = require('express');
const router = express.Router();

const {
    list,
    showForm,
    processForm
} = require('../controllers/todo');

router
    .get('/', list)
    .get('/new', showForm)
    .post('/new', processForm)

module.exports = router;
