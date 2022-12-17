const personModel = require('../model/person');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const nodemailer = require('nodemailer');


const signUp = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      // AuthToken
      let tokenPayload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      let token = jwt.sign(tokenPayload, "secret");

      //create users

      let person = await personModel.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        // password:req.body.password,
        Authtoken: token
      }).catch(e => reject({
        message: "Email Already Exist"
      }))

      console.log(person)
      resolve({
        data: person,
        message: "Success",
        token
      })

      // emailVerified
      let email = req.body.email;
      let userEmail = await personModel.findOne({
        email: email,
      })
      if (email) {
        let mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "tt5794688@gmail.com",
            pass: 'qjwvmakkvfsvhgou'
          }
        });
        let mailDetails = {
          from: 'tt5794688@gmail.com',
          to: email,
          subject: 'Please Verify your email.',
          text: "Verify",
          html: `<h2> Verify your Email</h2><br>
                  <p> To verified your email please click the link below</p><br>
                 <a href='http://localhost:4200/verify-email/${email}'> Click Here </a> <br>
                 `
        };
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log('Error Occur ' + err);
            return reject(err)
          } else {
            resolve({
              data,
              mesage: `Email sent successfully`,
              userId: person._id
            })
          }
        })
      }
      else {
        reject({
          message: "Email not found."
        })
      }


    } catch (e) {
      reject({
        message: e.message
      })
    }
  })

}

const signIn = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let email = req.body.email;
      let password = md5(req.body.password);
      let person = await personModel.findOne({
        email: email,
        password: password
      }).catch(e => reject({
        message: e.message,
        message: "email id or Password wrong"
      }))
      if (person && password) {
        if (person.emailVerified) {
          resolve({
            data: person,
            message: "Sucussfully signIn"
          })
        } else {
          reject({
            message: 'Email not verified.'
          })
        }
      } else {
        reject({
          message: 'User not found!'
        })
      }
      console.log(person);

    } catch (e) {
      console.log(e,)
      reject({
        message: e.message
      })
    }
  })
}


const forgotPassword = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let email = req.body.email;
      let person = await personModel.findOne({
        email: email,
      })
      if (person) {
        console.log("Email  exist", email);
        let mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "tt5794688@gmail.com",
            pass: 'qjwvmakkvfsvhgou'
          }
        });

        let mailDetails = {
          from: 'tt5794688@gmail.com',
          to: email,
          subject: 'Please Reset your Password',
          text: "Reset",
          html: `<h2> Reset Your Password</h2><br>
                  <p> User Id : ${person._id}</p>
                  <p> Copy User Id and Paste in Reset User ID
                 <a href='http://localhost:4200/reset'> Click Here </a> <br>
                 `
        };
        // console.log("mail details", mailDetails);
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log('Error Occur ' + err);
            return reject(err)
          } else {
            resolve({
              data,
              mesage: `Email sent successfully`,
              userId: person._id
            })
          }
        })
      } else {
        console.log("Email not exist");
        reject({
          message: "Email not found"
        })
      }

    } catch (error) {
      console.log(error);

    }
  })
}

const resetPassword = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let _id = req.body._id;
      // const user = await personModel.findOne({ _id: _id })
      // if (user) 
      let password = md5(req.body.password);
      let confirmPassword = md5(req.body.confirmPassword);
      if (password == confirmPassword) {
        const updatePassword = await personModel.updateOne(
          { password: password })
        resolve({
          message: "Password reset successfull"
        })
      }
      else{
        reject({
          message: "Password not matching"
        })
      }
     
      //  else{
      //   resolve({
      //     message: ("User does not exist.")
      // //   })
      // }
    }
    catch (error) {
      console.log(error);
      reject({
        message: error.message
      })
    }
  })
}


const verifyEmail = async (req, res) => {

  let email = req.params.email
  // console.log("email: ",email);
  try {
    let person = await personModel.findOne({ email: email });
    // console.log("person: ", person);
    if (person) {

      if (person.emailVerified) {
        res.status(400).send("verified already")
        return
      }
      person.emailVerified = true;
      try {
        await personModel.findOneAndUpdate({ email: email }, person)
      } catch (error) {
        console.log(error);
        res.status(500).send("fail to verify")
        return
      }
    } else {
      console.log(error);
      res.status(400).send("invalid user")
      return
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("fail to verify")
    return
  }
  res.status(200).json({ message: "successfully verified" })
}


module.exports = {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
  verifyEmail
}