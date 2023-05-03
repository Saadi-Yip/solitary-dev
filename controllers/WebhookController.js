const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const verify_token = "EAACeQgnE6WcBAG1ZBW6IxP5ezxwDOgVwqZA4MgS69OkFfUFEORX1ThPspHmOD1gY3IqVsZAicWno7OhFzcDohWi01ZBBeAxiL3PhlckWYWE6u0xZCNm6P92kcPyOCZBAmCmh0GuLZC2wJiI7Dxu9StKW0uvthHfG6olW78ufFFLHAZB4X7OyOQEw9D5afbhXagAWGOeWyqEHqAZDZD"
const GetWebhook = (req, res) => { 
   let mode =  req.query["hub.mode"];
   let challenge = req.query["hub.challenge"];
   let token = req.query["hub.verify_token"];
    if(mode && token) {
        if(mode === "subscribe" && token === access_token) {
            res.status(200).send(challenge)
        } else {
            res.status(403).send("Invalid Token")
        }
    } else {
        res.status(403).send(JSON.stringify(req.body,null,2));
    }
}


const PostWebHook = (req, res) => {
    let body_params = req.body;
    console.log("....",JSON.stringify(body_params)) 
    if(body_params.object) { 
        if(body_params.entry &&
            body_params.entry[0].changes &&
            body_params.entry[0].changes[0].value.messages &&
            body_params.entry[0].changes[0].value.messages[0] 
        ) {
            console.log("inner function");
            let phone_num = body_params.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body_params.entry[0].changes[0].value.messages[0].from;
            let msg_body = body_params.entry[0].changes[0].value.messages[0].text.body;
            console.log("from: " + from);
            console.log("recieved");
            console.log(msg_body);
            axios({
                method: 'POST',
                url:"https://graph.facebook.com/v16.0/"+phone_num+"/messages?access_token="+verify_token,
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body:"Hi.... this is leilani tech"
                    }
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            res.status(200)
        }  else {
            res.status(404)
        }
    }
}

module.exports = {GetWebhook, PostWebHook}