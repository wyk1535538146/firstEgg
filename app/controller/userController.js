'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller{
    async userLogin(){
        const { ctx } = this;
        let email = ctx.params.email;
        let password = ctx.params.password;
        //取redis
        const userFromRedis = await this.ctx.service.redisService.get(email);
        const res = await ctx.service.userService.login(email, password);
        if(res != null){
            if(res.disabled == "1"){ctx.body = {"status": 405}; return;}
            if(typeof(userFromRedis) != "undefined") {ctx.body =  {"status": 403}; return;};
            //消息队列
            this.ctx.service.mqService.product("login successfully" + new Date());
            this.ctx.service.mqService.consumer();
            //存redis缓存
            const rs = await this.ctx.service.redisService.set(res.email, '1', 60);
            console.log("存入redis缓存,60秒");
            ctx.body = res;
        } else{
            ctx.body = {"status": 401};
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
        } else{
            return null;
        }
    }

    async getUserList(){
        const {ctx} = this;
        const res = await ctx.service.userService.getUserList();
        var userList = [];
        
        if(res.length > 0){
            res.forEach(e => {
                var userInfo = {"email": e.email, "password": e.password, "nickname": e.nickname, "disabled": e.disabled};
                userList.push(userInfo);
            });
            ctx.body = res;
        } else{
            ctx.body = false;
        }
    }

    async disableUser(){
        const {ctx} = this;
        let email = ctx.params.email;
        const res = await ctx.service.userService.setUserDisabledStatus(email,  '1');
        ctx.body = res;
    }

    async unDisableUser(){
        const {ctx} = this;
        let email = ctx.params.email;
        const res = await ctx.service.userService.setUserDisabledStatus(email,  '0');
        ctx.body = res;
    }

}

module.exports = UserController;