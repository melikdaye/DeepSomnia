const mqtt = require("mqtt");
require("dotenv").config()

function get_client () {
    const host = process.env.MQTT_SERVER_IP
    const port = process.env.MQTT_SERVER_PORT
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    const connectUrl = `mqtt://${host}:${port}`
    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        reconnectPeriod: 1000,
    })

    const topic = 'dream'
    client.on('connect', () => {
        client.subscribe([topic], () => {
        })
        client.subscribe(["dream/status"], () => {
        })

    })
    client.on('message',(topic,message,packet)=>{
        console.log(topic,message)
        if(topic === "dream/status"){
            console.log(JSON.parse(message.toString()).progress)
        }
    })
    return client
}

function send_dream(client,id,dream){
    const topic = 'dream'
    client.publish(topic, JSON.stringify({id,dream}), {qos: 1, retain: false}, (error) => {
        if (error) {
            console.error(error)
        }
    })
}
module.exports = {get_client,send_dream}

