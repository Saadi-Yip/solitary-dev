const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const post_token = "EAACeQgnE6WcBAGATjdVZBMtV231a4kwnxf6Hsf6ZB64cuxgWhhN17h5HozBS7JZBd6qdZAb8g4KQUkPJI33XICtnirspauz5f5UfTHrEwZAfVcgkrUmax2ELllfH6DNsFGZBuZAQZC9sZAFHuTQ7px8P5bhi9GTq2nkDOBvXdpe8ZAmzEZA1kZBZAxm4QFvYpC03CU76oXJZCoGc2CDAZDZD"
 
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
            fetch('https://graph.facebook.com/v16.0/110855645334141/messages',{
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
                        'authorization': 'Bearer EAACeQgnE6WcBABA5rhLjjvw15e5hH9g6iiZC682AplhXJNwiCHSnaO6Cu62250giB3zYGaBTsebokNxwjAmkttnFJkakyOEg3yWZASJytROoyKkp4UqX8WV9mTAGbX6UoxfjM4FWCLPBHVv6aC2QAA4qbsmyYNf2ev76FWk2rsHWNMeqPyVenho4FjWkczYEjnXNH11gZDZD' ,
                        'Content_Type': 'application/json'
                    } 
                }   
            ) 
             res.status(200)
        } else {
            res.status(400);
        }
    }
}

module.exports = {GetWebhook, PostWebHook}


