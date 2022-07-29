'use strict';

const Service = require("egg").Service;

class RedisService extends Service{

    async set(key, value, expire){
        if(this.app.redis){
            if(expire === 0){
                await this.app.redis.set(key, value);
            } else{
                await this.app.redis.set(key, value, 'EX', expire);
            }
        }
    }

    async get(key){
        if(this.app.redis){
            var data = await this.app.redis.get(key);
            if(!data) return;
            return JSON.parse(data)
        }
    }
  
}

module.exports = RedisService;