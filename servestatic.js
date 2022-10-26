const path = require('path');
const fs = require('fs');
const PUBLIC_PATH = "public"; // relative path
const serveStaticFile = (url, response)=>{
    // Relative to Absolute
    const fullPath = path.join(__dirname, PUBLIC_PATH, url)
   const stream =  fs.createReadStream(fullPath);
   stream.pipe(response);
}
const isStaticContent = (url)=>{
     const extensions = [".html",".css",".jpeg",".gif",".png",".ico",".js"];
     const ext = path.extname(url);  
     return extensions.indexOf(ext)>=0 
}
module.exports = {isStaticContent,serveStaticFile};