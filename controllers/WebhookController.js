const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const verify_token = "EAACeQgnE6WcBACXfuk9430mH2hCE6FTGZBBJjTgDTitEKA5Bv8ZCZA0Sqq1WZCa9WMtanutpgh0ZBpCPN53P7Vx3AsH2ZBja7ZAO9ZB7xiURRPOhZALH7tzbQZA6kNljhfoZCfXQNvRjKnQwfgDcX1wOV39zS6NBIAr3knQMCplsFpGevHKCOMMUTemhNgn66vN3NRdeWmCmMt4NQZDZD"
 
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
            let data = {
                messaging_product: "whatsapp",
                type:"text",
                recipient_type:"individual",
                to: from,
                text: {
                    "preview_url":false,
                    "body":"Hi.... this is leilani tech"
                }
            }
            

           fetch(`https://graph.facebook.com/v16.0/${phone_num}/messages`, 
            {
                method: POST,
                body : data
            },
              {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${verify_token}`
                }
            },
            ).then((response) =>{
                console.log("Axios Response: " + response);
            }).catch((err) =>{
                console.log("Axios Error.........", err.message);
            })
            res.status(200) 
        }  else {
            res.status(404)
        }
    }
}

module.exports = {GetWebhook, PostWebHook}