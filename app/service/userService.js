'use strict';

const Service = require("egg").Service;

class UserService extends Service{
    async login(uid, password){
        //console.log(uid + " " + password)
        const user = await this.ctx.model.User.find({"uid": uid, "password": password});
        console.log(user)
        //因为没有真实连接数据库，所以模拟数据
        if(user.length > 0){
            return true;
        }
        

    }
}

module.exports =UserService;