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
            body: JSON.stringify({query: 'mutation {insert_docker_details(objects: [{ram: "'+ req.body['ram']+ '", size: "'+ req.body['size']+ '" , duration: '+ req.body['dur']+ ' , duration_from: "'+ req.body['dur_f']+ '" , duration_till: "'+ req.body['dur_t']+ '" , username: "'+ req.body['username']+ '" , cost: '+ req.body['cost']+ ', stake: '+ req.body['stake']+'}]) {returning {id}}}'})
        })
        .then(r => {
            return r.json()
        })
        .then(data => {
            return data["data"]["insert_docker_details"]["returning"][0]["id"];
        })
        .then((complain_id) => {
            res.send("Your Docker has been created and your docker id is " + complain_id);
        })
        .catch((err) => {
            res.send("Error: "+ err);
        })           
    });
    }

dockerModel.fetchAll = function(){
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{docker_details {id,ram, duration, duration_from, duration_till, container_id, cost, stake}}'})
    })
    .then(r => r.json())
    .then(data => {
        if(data['data']['docker_details'][0] != undefined){
            // console.log(data['data']['docker_details']);
            var docker = {'dockers': data['data']['docker_details']}
            resolve(docker);
        }
        else{
            reject("Wrong Password");
        }
    });
    });
}


module.exports = dockerModel;
