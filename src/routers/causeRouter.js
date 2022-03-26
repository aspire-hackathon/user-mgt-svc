const express = require('express');

const causeRouter = express.Router();
const causeController = require('../controllers/causeController');

causeRouter.route('/')
  .get(causeController.getCauses);

causeRouter.route('/register')
  .post(causeController.registerCause);

causeRouter.route('/status/:id')
  .patch(causeController.updateStatus);

causeRouter.route('/:id/:volid')
  .patch(causeController.addVolunteer);

causeRouter.route('/byid/:id')
  .get(causeController.getCauseById);

causeRouter.route('/byowner/:id')
  .get(causeController.getCauseByOwner);

// Temporary
causeRouter.route('/delete/:id')
    .delete(causeController.deleteCause);

module.exports = causeRouter;
