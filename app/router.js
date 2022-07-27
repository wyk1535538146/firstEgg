'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //router.post('/home', controller.home.index);
  router.get('/login/:email/:password', controller.userController.userLogin);
  router.get('/register/:email/:password/:nickname/:disabled', controller.userController.userRegister);
  router.get('/home', controller.userController.userList)
};
