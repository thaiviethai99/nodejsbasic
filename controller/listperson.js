var Person = require('../model/Person.js');

var mang = [
  new Person('Son', 18),
  new Person('Huong', 30),
  new Person('Khoa', 31)
]

module.exports = (req, res) => {
  res.render('listperson', {mang})
};