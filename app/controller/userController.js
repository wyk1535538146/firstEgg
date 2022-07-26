'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller{
    async userLogin(){
        const { ctx } = this;
        let uid = ctx.params.uid;
        let password = ctx.params.password;
        const res = await ctx.service.userService.login(uid, password);
        //console.log(res)
        ctx.body = res;
    }

}

module.exports =UserController;