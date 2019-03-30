function sellerModel(){
}
var fetch = require('node-fetch');

sellerModel.insert = function(req,res) {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: 'mutation {insert_seller(objects: [{name: "'+ req.body['name']+ '", mail: "'+ req.body['mail']+ '" , password: "'+ req.body['passwd']+ '"}]){returning {id}}}'})
        })
        .then(r => {
            return r.json()
        })
        .then(data => {
            return data["data"]["insert_seller"]["returning"][0]["id"];
        })
        .then((complain_id) => {
            res.send("Your Complaint has been succesfully registered and your complain id is " + complain_id);
        })
        .catch((err) => {
            res.send("Error: "+ err);
        })           
    });
    }

sellerModel.authenticate = (mail, password) => {
    return new Promise((resolve, reject) => {
        fetch('https://supradock.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{seller(where: {_and: [{mail: { _eq : "'+mail + '"}},{password: {_eq: "'+ password + '"}}]}) {id}}'})
    })
    .then(r => r.json())
    .then(data => {
        if(data['data']['seller'][0]['id'] != undefined){
            console.log(data['data']['seller'][0]);
            var user = {'id': data['data']['seller'][0]['id'] - 1 , 'name': mail}
            resolve(user);
        }
        else{
            reject("Wrong Password");
        }
    });
    });
}


module.exports = sellerModel;