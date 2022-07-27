'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller{
    async userLogin(){
        const { ctx } = this;
        let email = ctx.params.email;
        let password = ctx.params.password;
        const res = await ctx.service.userService.login(email, password);
        console.log(res)
        if(res){
            ctx.body = res;
        }
    }

    async userRegister(){
        const { ctx} = this;
        let email = ctx.params.email;
        let password = ctx.params.password;
        let nickname = ctx.params.nickname;
        let disabled = ctx.params.disabled;
        //console.log(email + " " + password + " " + nickname + " " + disabled)
        const res = await ctx.service.userService.register(email, password, nickname, disabled);
        if(res){
            ctx.body = res;
        }
    }

    async userList(){
        const {ctx} = this;
        const res = await ctx.service.userService.getUserList();
        var userList = [];
        
        if(res.length > 0){
            res.forEach(e => {
                var userInfo = {"email": e.email, "password": e.password, "nickname": e.nickname, "disabled": e.disabled};
                userList.push(userInfo);
            });
            ctx.body = userList;
        } else{
            ctx.body = false;
        }
    }

}

module.exports = UserController;