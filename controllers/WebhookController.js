const axios = require('axios');
const access_token = "leilani";

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
        res.status(403).send(req)
    }
}


const PostWebHook = (req, res) => {
    let body_params = req.body;
    if(body_params.object) {
        if(body_params.entry &&
            body_params.entry[0].changes &&
            body_params.entry[0].changes[0].value.message &&
            body_params.entry[0].changes[0].value.message[0] 
        ) {
            let phone_num = body.entry[0].challenge[0].value.metadata.phone_number_id;
            let from = body.entry[0].changes[0].value.messages[0].from;
            let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
            axios({
                method: 'POST',
                url:"https://graph.facebook.com/v16.0/"+phone_num+"/messages?access_token="+access_token,
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