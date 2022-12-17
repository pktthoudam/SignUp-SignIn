const express = require('express');
const router = express.Router();
const personsController = require('../controller/persons')


router.post('/signUp', (req, res) => {
  console.log(req.body)
  // res.send(req.body)
  personsController.signUp(req).then((data) => {
    res.status(201).send(data)
  }).catch(err => res.status(400).send({
    message: err.message
  }))
})

router.post('/signIn', (req, res) => {
  // console.log(req.body)
  // res.send(req.body)
  personsController.signIn(req)
    .then((data) => {
      res.status(201).send(data)
    }).catch(err => res.status(500).send({
      message: err.message
    }))
})

router.post('/forgotPassword', (req, res) => {
  personsController.forgotPassword(req)
    .then((data) => {
      res.status(201).send(data)
    }).catch(err => res.status(400).send({
      message: err.message
    }))
});

router.post('/resetPassword', (req, res) => {
  personsController.resetPassword(req)
    .then((data) => {
      res.status(201).send(data)
    }).catch((err) => {
      console.log(err)
      res.status(400).send({
        message: err.message
      })
    })
})

router.patch('/verifyEmail/:email', personsController.verifyEmail)

module.exports = router