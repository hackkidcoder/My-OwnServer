const urlObj= require("url");
module.exports = {
    dynamicRoutes(url, request, response){
        
        if(url.startsWith("/login") && request.method ==='GET'){
            let obj= urlObj.parse(url, true);
            console.log(obj);
            obj = obj.query;
            if(obj.userid == obj.pwd){
                response.write('Welcome User '+obj.userid);
            }
            else{
                response.write('Invalid Userid or Password ');
            }
            response.end();
        }
        else if (url === '/dashboard'){
            
           response.write('I am the DashBoard');
           response.end();
        } 
        else if(url ==='/login' && request.method ==='POST'){
               let data = '';
               request.on('data',chunk=>{
                data = data + chunk;
               }) ;
               request.on('end',()=>{
                console.log('Post Data is ', data);
                var u = new URLSearchParams(data);
                var arr= [];
                
                u.forEach((e,i)=>{
                    arr[i] = e;
                });
                console.log(arr['userid']);
               
                //const qs = require('querystring');
                //const obj = qs.parse(data);
                //console.log(obj);
                if(arr['userid'] ==arr['pwd']){
                    response.writeHead(301,{location:'/dashboard'});
                    //response.write('Welcome '+arr['userid']);
                }
                else{
                    response.write('Invalid Userid or Password');
                }
                response.end();
            })
        }
        else if (url ==='/cric-score'){
            const fs = require('fs');
            const e =fs.readFileSync("/Users/amitsrivastava/Documents/MERN-BVP/ownserver/score.txt");
            response.writeHead(200,{'Content-Type':'application/json'});
            response.write(e);
            response.end();
        }
        else if(url ==='/register'){

        }
        else{
            response.writeHead(404);
            response.write('OOPS U Type Something Wrong');
            response.end();
        }
    }
}