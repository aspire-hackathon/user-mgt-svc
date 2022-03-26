const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../config/config');

require('../models/UserModel');
const UserModel = mongoose.model('user');

const userController = {

  // Temporary
  getUsers: (req,res) => {
    try {
      UserModel.find().exec().then((user)=>{
        console.log("users ----",user)
        res.status(200).json(user);
      })
    } catch(err) {
      res.status(404).send({ msg: err });
    }

  },

  registerUser: (req, res, next) => {
    console.log('req.body----------------------------', req.body);
    const saltRounds = 10;
    try {
      UserModel.find({ username: req.body.username })
        .exec().then((user) => {
          if (user.length > 0) {
            res.status(409).send({ msg: 'User name already taken, Please try with other.' });
          } else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
              const userModel = new UserModel({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                role: req.body.role,
                contactNo: req.body.contactNo,
                email: req.body.email,
                address: req.body.address
              });
              console.log('userModel------------------------', userModel);
              userModel.save((error, response) => {
                console.log('response---------------------', response);
                res.set('Content-Type', 'application/json');
                res.status(201).send({
                  id: response._id,
                  name: response.name,
                  username: response.username,
                  role: response.role,
                  contactNo: response.contactNo,
                  email: response.email,
                  address: response.address,
                  createdAt: response.createdAt,
                  msg: 'User registered successfully!!!'
                });
              });
            });
          }
        });
    } catch (error) {
      res.status(500).send({ msg: 'Error in registration.' });
    }
  },

  logoutUser: (req, res, next) => {
    try {
      res.set('Content-Type', 'application/json');
      res.status(201).send({
        token: null,
        id: null,
        message: 'You have logged out successfully!!!'
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error in logout' });
    }
  },

  loginUser: (req, res, next) => {
    UserModel.find({ username: req.body.username })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          res.status(401).json({
            msg: 'Auth failed',
          });
        } else {
          bcrypt.compare(req.body.password, user[0].password, function (err, compareRes) {
            if (compareRes === true) {
              /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
              const token = jwt.sign({ sub: user[0]._id, username: user[0].username }, config.secret, { expiresIn: '1h' });
              return res.status(200).json({
                msg: 'Auth successful',
                token,
                id: user[0]._id,
                userName: user[0].username
              });
            } else {
              res.status(401).json({
                msg: 'Auth failed',
              });
            }
          });
        }
      })
      .catch((error) => {
        res.status(401).send({
          msg: 'Auth failed',
        });
      });
  },

  getUserById: (req, res, next) => {
    UserModel.findById({ _id: req.params.id }, (err, user) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
          contactNo: user.contactNo,
          email: user.email,
          address: user.address,
          createdAt: user.createdAt,
        });
      }
    });
  },

  getUserByName: (req, res, next) => {
    UserModel.find({ username: req.params.username }, (err, user) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).json({
          id: user[0]._id,
          name: user[0].name,
          username: user[0].username,
          role: user[0].role,
          contactNo: user[0].contactNo,
          email: user[0].email,
          address: user[0].address,
          createdAt: user[0].createdAt,
        });
      }
    });
  }

}

module.exports = userController;
