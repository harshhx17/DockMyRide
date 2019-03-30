function buyerModel(){
}
var fetch = require('node-fetch');

buyerModel.insert = function(req,res) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: 'mutation {insert_buyer(objects: [{name: "'+ req.body['name']+ '", mail: "'+ req.body['mail']+ '" , password: "'+ req.body['passwd']+ '", public_key: "'+ req.body['public_key']+ '"}]){returning {id}}}'})
        })
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

buyerModel.authenticate = (mail, password) => {
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{buyer(where: {_and: [{mail: { _eq : "'+mail + '"}},{password: {_eq: "'+ password + '"}}]}) {id, name}}'})
    })
    .then(r => r.json())
    .then(data => {
        if(data['data']['buyer'][0]['id'] != undefined){
            console.log(data['data']['buyer'][0]);
            var user = {'id': data['data']['buyer'][0]['id'] - 1 , 'name': data['data']['buyer'][0]['name']}
            resolve(user);
        }
        else{
            reject("Wrong Password");
        }
    });
    });
}


module.exports = buyerModel;