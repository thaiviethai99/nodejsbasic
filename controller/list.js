module.exports = (req, res) => {
  res.render('list', {mang: [
    '<p>Android</p>', '<p>iOS</p>', '<p>NodeJS</p>'
  ]});
};