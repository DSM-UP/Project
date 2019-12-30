const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(new Date(1577406112));
    res.json({message:req.session, id:req.sessionID});
});

module.exports = router;