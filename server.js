const http=require('http')
const url = require("url");
const Contact_Manager=require('./index.js')
const host = 'localhost';
const port = 1234;

const requestListener = function (req, res) {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.pathname;
    path = path.replace(/^\/+|\/+$/g, "");
    let req_body=''
    req.on('data',(chunk)=>{
        req_body+=chunk

    })
    req.on("end", function(){
        let recieved_json=''
        if(req_body==""){
            recieved_json=null

        }
        else{
            recieved_json=JSON.parse(req_body)
        }
        
        let the_route=routes[path]
        the_route(recieved_json,res)
    })
}
let routes={
    "search":function(data,res){
        let result=''
        let the_result_in_string=""
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        try{
        if (data==null){
            result=Contact_Manager.search_contacts()
            

        }
        else{
            result=Contact_Manager.search_contacts(data)
        }
        the_result_in_string=JSON.stringify(result)
        
        res.end(the_result_in_string);
    }
        catch(error){
            res.end('{"error":"Sorry, the system could not complete the operation"}');
        }
    },

    "create":function(data,res){
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        try{
            Contact_Manager.create_a_contact(data)
            res.end('{"success":"New contact has been created succesfully"}')
        }
        catch(error){
            res.end('{"error":"Sorry, the system could not complete the operation"}')
        }

    },
    "update":function(data,res){
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        try{
            Contact_Manager.update_a_contact(data)
            res.end('{"success":"The contact has been updated succesfully"}')
        }
        catch(error){
            res.end('{"error":"Sorry, the system could not complete the operation"}')
        }
    },
    "delete":function(data,res){
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        try{
            Contact_Manager.delete_a_contact(data)
            res.end('{"success":"The contact has been deleted succesfully"}')
        }
        catch(error){
            res.end('{"error":"Sorry, the system could not complete the operation"}')
        }
    }


}





const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
});
  