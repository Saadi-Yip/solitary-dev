const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const post_token = "EAACeQgnE6WcBAGBvbv4bvVGNiUZAV7yyjIqjOZCZBFE3C9Lvhpy65MvBMOQh8S3wRw2fGb855Vu8NhtTX2zVZCHPsDy3AAc58eNNjeYhHhhvv1WnhbUIWXNRbsBE2TuLUIGA8hDZC3seAhWlg1RLL4EPIZBqWncSyaOkYBncySxxdjJB9jZCGloY7le7BXZA6c2CWFUfsZCCmeQZDZD"
 
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
            console.log("phone number....",phone_num, post_token);
            let fetchApi = await fetch(`https://graph.facebook.com/v16.0/${phone_num}/messages`,{
                    method: "POST",
                    data: {
                        "messaging_product": "whatsapp",
                        "type":"text",
                        "recipient_type":"individual",
                        "to": from,
                        "text": {
                            "preview_url":false,
                            "body":"Hi..."
                        }
                    },
                    headers: {
                        'Authorization': 'Bearer ' + post_token,
                        'Content_Type': 'application/json'
                    } 
                }   
            ) 
            if(fetchApi)
            console.log(fetchApi);
             res.status(200)
        } else {
            res.status(400);
        }
    }
}


// Facebook Messenger0

const getFacebook =  async(req, res) => {
    // Parse the query params
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];
    
      // Check if a token and mode is in the query string of the request
      if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === "leilani-fb") {
          // Respond with the challenge token from the request
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
    }
    }
};

module.exports = {GetWebhook, PostWebHook}


