function buyerModel(){
}
var fetch = require('node-fetch');
calltomatic.transact = function(body){
	return new Promise((resolve, reject) => {
        var os = require('os');
        .then(r => {
            return r.json()
        })
        .then(data => {
            return data["data"]["insert_buyer"]["returning"][0]["id"];
        })
        .then((complain_id) => {
            res.send("Your Complaint has been succesfully registered and your complain id is " + complain_id);
        })
        .catch((err) => {
            res.send("Error: "+ err);
        })           
    });
}