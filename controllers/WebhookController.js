const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const post_token = "EAACeQgnE6WcBACKMFPZBQEIRQuMjZBRKyQZCfOPdhv2FDZCP9sNfKgrToXwU5m3YF9TabHQp2yGCJ97DDz6cuqskfsRlFbpwmqvcsMSSXgY7IGkLlNkMTEteB84LQzuVp1XR5abYIzVGFiTybnHUTfpK4EoQ3FaIoyO8UIKbNB5bR6drjZA547e3373SZClY2blFOJ3lWrLgZDZD"
 
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

const PostWebHook = async(req, res) => {
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
            console.log(phone_num, from, msg_body);
            let fetchApi = await fetch('https://graph.facebook.com/v16.0/110855645334141/messages?access_token='+ post_token,{
                    method: "POST",
                    data: {
                        messaging_product: "whatsapp",
                        type:"text",
                        recipient_type:"individual",
                        to: from,
                        text: { 
                            body:"Hi..."
                        }
                    },
                    headers: {
                        'authorization': 'Bearer EAACeQgnE6WcBACKMFPZBQEIRQuMjZBRKyQZCfOPdhv2FDZCP9sNfKgrToXwU5m3YF9TabHQp2yGCJ97DDz6cuqskfsRlFbpwmqvcsMSSXgY7IGkLlNkMTEteB84LQzuVp1XR5abYIzVGFiTybnHUTfpK4EoQ3FaIoyO8UIKbNB5bR6drjZA547e3373SZClY2blFOJ3lWrLgZDZD' ,
                        'Content_Type': 'application/json'
                    } 
                }   
            ) 
            if(fetchApi)
            console.log(fetchApi.status);
             res.status(200)
        } else {
            res.status(400);
        }
    }
}

module.exports = {GetWebhook, PostWebHook}


