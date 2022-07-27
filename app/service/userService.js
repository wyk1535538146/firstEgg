'use strict';

const Service = require("egg").Service;

class UserService extends Service{
    async login(email, password){
        //console.log(uid + " " + password)
        const res = await this.ctx.model.User.find({"email": email, "password": password}, (err, docs) => {
            if(err){
                return false;
            } else{
                return docs;
            }
        })
        if(res){
            return true;
        }
    }


    async register(email, password, nickname, disabled){
        //console.log(email + " " + password + " " + nickname + " " + disabled)
        const res = await this.ctx.model.User.insertMany({"email": email, "password": password, "nickname": nickname, "disabled": disabled})
        if(res.length > 0){
            return true;
        }
    }

    async getUserList(){
        const res = await this.ctx.model.User.find();
        if(res) return res;
    }
}

module.exports = UserService;