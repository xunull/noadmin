const logger = thisapp.logger;
const marked = require('../service/marked');

exports.saveArticle = function(req, res) {
    logger.info(req.body);
    console.log(marked.renderResult(req.body.text));
    res.reply({});
}
