'use strict';

const Service = require("egg").Service;



class UserService extends Service{

    /**
     * 登录功能（未完善）
     * @param {*} email 
     * @param {*} password 
     * @returns true|false
     */
    async login(email, password){
        //console.log(email + " " + password)
        const res = await this.ctx.model.User.find({"email": email, "password": password}, (err, docs) => {
            if(err){
                return false;
            } else{
                return docs;
            }
        })
        
        if(res.length > 0){
            return res[0];
        } else{
            return null;
        }
    }

    /**
     * 注册信息，目前参数为一个一个传
     * @param {*} email 
     * @param {*} password 
     * @param {*} nickname 
     * @param {*} disabled 
     * @returns 注册成功返回true
     */
    async register(email, password, nickname, disabled){
        //console.log(email + " " + password + " " + nickname + " " + disabled)
        const res = await this.ctx.model.User.insertMany({"email": email, "password": password, "nickname": nickname, "disabled": disabled})
        if(res.length > 0){
            this.product("Register successfully");
            return true;
        } else{
            return false;
        }
    }

    /**
     * 获取所有用户，返回用户列表
     * @returns userList
     */
    async getUserList(){
        const res = await this.ctx.model.User.find();
        //console.log(res);
        if(res) return res;
    }

    /**
     * 根据传入的状态值设置disabled状态
     * @param {*} email
     * @param {*} disabled
     * @returns 
     */
    async setUserDisabledStatus(email, disabled){
        const res = await this.ctx.model.User.findOneAndUpdate({email: email}, {disabled: disabled})
        //console.log(res)
        if(res != null) return true;
        else return false;
    }

    
    
}

module.exports = UserService;