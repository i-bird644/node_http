console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

const server = http.createServer((req, res) => {

  //Remember array is a type of list.
  const array = [];

  //This data is emitted from the ReadStream, as raw data.
  req.on("data", (data) => {
    array.push(data);
  });

  //Add an event listener to the request object that listens
  //for the ‘end’ event to be emitted from the ReadStream
    req.on("end", () => {

      //The buffer object joins all the buffer instance together
      //and converts it to string object
      const body = Buffer.concat(array).toString();

      // Check the request URL
        if (req.url === "/") {
          
        // Respond with whatever information you wish
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Welcome to ibird website!");

        } else if (req.url === "/about") {
            

        // Respond with an object that has information about yourself
        const aboutMe = {
          name: "David Micheal ",
          age: 30,
          occupation: "FS Web-Developer",
          interests: ["Coding", "Learning", "Fishing"],
        };

        //Converting d object data in JSON form using the resquest object
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(aboutMe));  
        res.end();
        
      } else if (req.url === "/echo") {
        
        // Respond with an object that includes request method, URL, and body
        const echoResponse = {
          method: req.method,
          url: req.url,
          body: body,
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(echoResponse));
        res.end();

        } else {
             // Handle not found URLs
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('i404 Request Not Found, Ask Elon!!!');
         }
         });
 
    });
  
      

// Finish setting up the server
server.listen(3000, () => {
    console.log("Im listening @ port 3000 now.")
 });
