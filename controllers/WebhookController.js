const axios = require('axios');
const { json } = require('express');
const access_token = "leilani";
const verify_token = "EAACeQgnE6WcBAAsHZCpfU4NZA38wFR7NjYRA0woJrcmSjthBBlAQBnczuE0NJASNpED5ZAsjFqWqodLxF0qR3po2ukkdLsU1AJQTJYO9FffIOHstrO9ZC4owRB9vjAzZA2xIkQHWcZBdZCPLQYsJkR2ZC82R1kLObMlUTZB2GNZBZCWcc9W7Jl0vJcfhyLj25ywZCYFWQ1HXjBe5aQZDZD"
 
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
            

            axios.post(`https://graph.facebook.com/v16.0/${phone_num}/messages`, 
                {
                data
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