const http = require('http');  
const routes = require('./routes');
const {isStaticContent, serveStaticFile} = require('./servestatic');
const server = http.createServer(handleRequestAndResponse);

function handleRequestAndResponse(request, response){
    let url = request.url;
    console.log("Request Rec ....", url);
    if(url == '/'){
        url = '/index.html';
    }
    if(isStaticContent(url)){
        serveStaticFile(url, response);
    }
    else {
        routes.dynamicRoutes(url, request, response);
    }
//     else{
// response.write("Hello Client");
// response.end(); // Flush
//     }
}
server.listen(1234,(err)=>{
    if(err){
        console.log('Error in Server ', err);
    }
    else{
        console.log('Server Start ', server.address().port);
    }
})