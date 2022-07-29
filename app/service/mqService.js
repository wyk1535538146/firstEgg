'use strict';
const amqp = require('amqplib')
const Service = require("egg").Service;

class MqService extends Service{
    async product(msg){
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        //const routingKey = 'wyk';
        await channel.publish('', 'wyk', Buffer.from(`${msg}`));
        await channel.close();
        await connection.close();
    }

    
    async consumer(){
        // 1. 创建链接对象
        const connection = await amqp.connect('amqp://localhost:5672');
        // 2. 获取通道
        const channel = await connection.createChannel();
        // 3. 声明参数
        const queueName = 'wyk';
        // 4. 声明队列，交换机默认为 AMQP default
        await channel.assertQueue(queueName);
        // 5. 消费
        await channel.consume(queueName, msg => {
            console.log('Consumer：', msg.content.toString());
            channel.ack(msg);
        });
    }
}

module.exports = MqService;