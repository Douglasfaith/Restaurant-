const User = require('../models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

module.exports = {

  signup(req, res) {

    bcrypt.hash(req.body.passWord, saltRounds, function(err, hash) {

      if(hash) {
        return User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            passWord: hash,
            emailAddress: req.body.emailAddress,
            phoneNumber: req.body.phoneNumber,

          })
          .then(result => res.status(201).send(result))
          .catch(error => res.status(400).send(error));
      }
      if(err) {
        return res.status(500).send({
          message: 'Unable to create User',
          success: false,
          err
        })
      }

   });
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

      console.log(result)

      const hashedPassword = result.passWord;
      const identity = result.id;
    

      
      return bcrypt.compare(req.body.passWord, hashedPassword, function(err, success) {
        // success == true

        
        if(success === true) {

          const token = jwt.sign({
            id: identity
          }, 'secret', { expiresIn: 60 * 60 });
      
          return res.status(200).send({
            successful: true,
            result,
            token
          })
        }


       

      

        return res.status(401).send({
          success: false,
          message: "Username or Password is incorrect",
          success
        })
      });

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