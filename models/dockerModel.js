function dockerModel(){
}
var fetch = require('node-fetch');

dockerModel.insert = function(req,res) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: 'mutation {insert_docker_details(objects: [{ram: "'+ req.body['ram']+ '", size: "'+ req.body['size']+ '" , duration: '+ req.body['dur']+ ' , duration_from: "'+ req.body['dur_f']+ '" , duration_till: "'+ req.body['dur_t']+ '" , container_id: "'+ req.body['cont_id']+ '" , host_ip: "'+ req.body['host_ip']+ '" , host_port: "'+ req.body['host_port']+ '" , username: "'+ req.body['username']+ '" , cost: '+ req.body['cost']+ ' }]) {returning {id}}}'})
        })
        .then(r => {
            return r.json()
        })
        .then(data => {
            return data["data"]["insert_docker_details"]["returning"][0]["id"];
        })
        .then((complain_id) => {
            res.send("Your Complaint has been succesfully registered and your complain id is " + complain_id);
        })
        .catch((err) => {
            res.send("Error: "+ err);
        })           
    });
    }


module.exports = dockerModel;
