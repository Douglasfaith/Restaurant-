const User = require('../models').User;

module.exports = {

  signup(req, res) {
    return User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,

      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },

  login(req,res){
    return User.findOne({
      where: {
        emailAddress: req.body.emailAddress
      }
    }).then((result => {
      if(!result) {
        return res.status(404).send({
          result: false,
          message: "User does not exist",
          result
        })
      }



      
      return res.status(200).send({
        result: true,
        message: "User found",
        result
      })

    })).catch(error => {
      return res.status(400).send({
        result: false,
        message: "Error",
        error
      })
    })
  }
};



// module.exports = {
//   signup(req, res) {
//     res.status(200).send("welcome to sign up routess")
//   },
// };