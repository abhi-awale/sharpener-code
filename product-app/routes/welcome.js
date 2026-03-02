const express = require('express');

const router = express.Router();

router.get('/:username', (req, res) => {
    
    let {username} = req.params;
    let {role} = req.query;

    let outputStr = 'Welcome ' + username;

    if(role) {
        outputStr += ', your role is ' + role;
    }

    res.send(outputStr);
})

module.exports = router;