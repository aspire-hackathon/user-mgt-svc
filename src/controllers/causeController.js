const mongoose = require('mongoose');

require('../models/CauseModel');
const CauseModel = mongoose.model('cause');
// const CauseModel = require('../models/CauseModel');

const causeController = {
    getCauses: (req,res) => {
        try {
            CauseModel.find().exec().then((causes)=>{
            console.log("causes ----",causes)
            res.status(200).json(causes);
          })
        } catch(err) {
          res.status(404).send({ msg: err });
        }
      },

    registerCause: (req,res) => {
        try {
            CauseModel.find({ title: req.body.title })
              .exec().then((cause) => {
                if (cause.length > 0) {
                  res.status(409).send({ msg: 'Cause already exist, Please try another name.' });
                } else {
                    const causeModel = new CauseModel({
                      title: req.body.title,
                      aimDescription: req.body.aimDescription,
                      causeImage: req.body.causeImage,
                      address: req.body.address,
                      causeOwner: req.body.causeOwner,
                      volunteers: [req.body.volunteers],
                      causeStatus: 'new'
                    });
                    console.log('causeModel------------------------', causeModel);
                    causeModel.save((error, response) => {
                      console.log('response---------------------', error,response);
                      res.set('Content-Type', 'application/json');
                      res.status(201).send({
                        id: response._id,
                        title: response.title,
                        aimDescription: response.aimDescription,
                        causeImage: response.causeImage,
                        address: response.address,
                        causeOwner: response.causeOwner,
                        volunteers: response.volunteers,
                        causeStatus: response.causeStatus,
                        createdAt: response.createdAt,
                        msg: 'Cause registered successfully!!!'
                      });
                    });
                }
              });
          } catch (error) {
            res.status(500).send({ msg: 'Error in registration.' });
          }

      },

    deleteCause: (req,res) => {
          try{
            CauseModel.findByIdAndDelete(req.params.id)
            .then(cause=>res.json("Exercise Deleted"))
          } catch (error) {
            res.status(500).send({ msg: 'Unable to Delete.' });
          }

      },

    getCauseById: (req, res, next) => {
        CauseModel.findById({ _id: req.params.id }, (err, cause) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).json({
                id: cause._id,
                title: cause.title,
                aimDescription: cause.aimDescription,
                causeImage: cause.causeImage,
                address: cause.address,
                causeOwner: cause.causeOwner,
                volunteers: cause.volunteers,
                causeStatus: cause.causeStatus,
                createdAt: cause.createdAt,
            });
          }
        });
      },

    getCauseByOwner: (req, res, next) => {
        CauseModel.find({ causeOwner: req.params.id }, (err, causes) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).json(causes);
          }
        });
    },

    updateStatus:(req, res, next) => {
        CauseModel.findByIdAndUpdate(req.params.id, {causeStatus:'Complete'}, {
            new: true,
          }, (err, cause) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).json({
                id: cause._id,
                title: cause.title,
                aimDescription: cause.aimDescription,
                causeImage: cause.causeImage,
                address: cause.address,
                causeOwner: cause.causeOwner,
                volunteers: cause.volunteers,
                causeStatus: cause.causeStatus,
                createdAt: cause.createdAt,
            });
          }
        });
    },

    addVolunteer: (req, res, next) => {
        CauseModel.findByIdAndUpdate(req.params.id, {$push: { volunteers: req.params.volid} }, {
            new: true,
          }, (err, cause) => {
          if (err) {
            throw err;
          } else {
            return res.status(200).json({
                id: cause._id,
                title: cause.title,
                aimDescription: cause.aimDescription,
                causeImage: cause.causeImage,
                address: cause.address,
                causeOwner: cause.causeOwner,
                volunteers: cause.volunteers,
                causeStatus: cause.causeStatus,
                createdAt: cause.createdAt,
            });
          }
        });
    },
}


module.exports = causeController;