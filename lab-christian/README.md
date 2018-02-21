## Lab 7: HTTP server

## HTTP methods
GET: the default get route is "/", when this is hit the server will respond with a "hello from my server!" message.

GET: when the /cowsay route is hit, you can set a message that the cow will return. For example :
```
http :3000/cowsay text=='wow this is a cool message'
```

POST: when the /cowsay route is hit on a POST request, you can set a message similar to the GET request. For example: 
```
http: POST 3000/cowsay message=='this is a message, not text'
```
