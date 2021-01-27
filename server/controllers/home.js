const { layout } = require('../utils')

const home = (req, res) => {
    res.render('home', {
        ...layout
    })
};

module.exports = {
    home
};
