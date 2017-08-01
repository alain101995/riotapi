var app = require("express")();
const hostname = '127.0.0.1';
const PORT = 3000;
app.listen(PORT);
app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write("Hello");
});

app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" World !!!");
    httpResponse.end();
});

app.listen(3000);
