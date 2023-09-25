//create web server
var express = require('express');
var router = express.Router();
var comments = require('../controllers/comments');
var auth = require('../controllers/auth');

// GET
router.get('/', comments.list);
router.get('/:id', comments.get);
router.get('/user/:id', comments.listByUser);
router.get('/post/:id', comments.listByPost);

// POST
router.post('/', auth.isAuthenticated, comments.create);

// PUT
router.put('/:id', auth.isAuthenticated, comments.update);

// DELETE
router.delete('/:id', auth.isAuthenticated, comments.delete);

module.exports = router;