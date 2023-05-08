const axios = require("axios");
const { json } = require("express");
const access_token = "leilani";
const post_token =
  "EAACeQgnE6WcBAJBjod0ox1Scewz3PZB407Sw1t18xYF8VyD2uoLnzZB1LA7Mc7OzxSZBf7fmFjLIOEeuBjkfG8nmQP4T29aA3QFMS5uBFmo6ab4NFvId31naG3LX57kXeH6YGQNfSljWLnZBUyGxNdaUCk2y2tu8O14Gi63cT4yj2ZBxq1b2w89qaGgx9ZAJAZCqhJ9PNee9AZDZD";
const request = require("request");
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
      

        let fetchApi = await axios(
          `https://graph.facebook.com/v16.0/${phone_num}/messages`,
          {
           method: 'POST',
            data: JSON.stringify({
              messaging_product: "whatsapp",
              type: "text",
              recipient_type: "individual",
              to: from,
              preview_url: false,
              text: {
                body: "asdds i...",
              },
            }),
            headers: {
              Authorization: "Bearer " + post_token,
              Content_Type: "application/json",
            },
          }
        );
        if (fetchApi) console.log("Fetch Api........");
        res.status(200);
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
