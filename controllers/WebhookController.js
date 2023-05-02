const GetWebhook = (req, res) => {
   let mode =  req.query("hub.mode");
   let challenge = req.query("hub.challenge");
   let token = req.query("hub.verify_token");
    if(mode && token) {
        if(mode === "subscribe" && token === "") {
            res.status(200).json({
                challenge
            })
        } else {
            res.status(403).send("Invalid Token")
        }
    }
}

module.exports = {GetWebhook}