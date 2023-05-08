const axios = require("axios");
const { json } = require("express");
const access_token = "leilani";
const post_token =
  "EAACeQgnE6WcBACRqUNLf5nxKTJ35yHpF498pK5yxtrvwoZBKN326Xe7NepI5hvZAV063bSZAaSZAvJl3jlZBDdVm3C7iKgQTtuH1AvxkrKOFTnLSWMfOuKAWx4nLrM5vA34tZBaKkDK47Crb0nMrmBmcI1zY8ZA0fg8txY0R4KnQ84vxetxAxCWQ8W0XmF6QqJmtfkvQvBsYQZDZD";
  const request = require('request');
const GetWebhook = (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  if (mode && token) {
    if (mode === "subscribe" && token === access_token) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Invalid Token");
    }
  } else {
    res.status(403).send(JSON.stringify(req.body, null, 2));
  }
};

const PostWebHook = async (req, res) => {
  let body_params = req.body;
  console.log("....", JSON.stringify(body_params));
  if (body_params.object) {
    if (
      body_params.entry &&
      body_params.entry[0].changes &&
      body_params.entry[0].changes[0].value.messages &&
      body_params.entry[0].changes[0].value.messages[0]
    ) {
      console.log("inner function");
      let phone_num =
        body_params.entry[0].changes[0].value.metadata.phone_number_id;
      let from = body_params.entry[0].changes[0].value.messages[0].from;
      let msg_body =
        body_params.entry[0].changes[0].value.messages[0].text.body;
      console.log("phone number....", phone_num, post_token);
      const options = {
        url: `https://graph.facebook.com/v16.0/${phone_num}/messages/access_token = ${post_token}`,
        method: 'POST',
        data: {
                messaging_product: "whatsapp",
                type: "text",
                recipient_type: "individual",
                to: from,
                text: {
                    preview_url: false,
                    body: "asdds i...",
                },
            },
        headers: {
            'Accept': 'application/json', 
        }
    };
        request(options, function(err, res, body) {
            let json = JSON.parse(body);
            console.log(json);
        });

    //   let fetchApi = await fetch(
    //     `https://graph.facebook.com/v16.0/${phone_num}/messages`,
    //     {
    //      method: POST,
    //       data: {
    //         messaging_product: "whatsapp",
    //         type: "text",
    //         recipient_type: "individual",
    //         to: from,
    //         text: {
    //           preview_url: false,
    //           body: "asdds i...",
    //         },
    //       },
    //       headers: {
    //         Authorization: "Bearer " + post_token,
    //         Content_Type: "application/json",
    //       },
    //     }
    //   );
    //   if (fetchApi) console.log("Fetch Api........");
    //   res.status(200);
    } else {
      res.status("main if failed! ", 403);
    }
  }
};

// Facebook Messenger0

const GetFacebook = async (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    if (mode === "subscribe" && token === "leilani-fb") {
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Invalid Token");
    }
  } else {
    res.status(403).send(JSON.stringify(req.body, null, 2));
  }
};

module.exports = { GetWebhook, PostWebHook, GetFacebook };
