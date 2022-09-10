# Repo for Fullstack Junior Phase week-3 project

### Error handling in Express
For error handling in express beyond the defaults, there are 2 main things to keep in mind there's two major pieces to keep in mind - how to report errors and how to catch errors.
To send your code to the error handler, all you have to do is give the next function the error and send it on it's way. Since this is automatic in express 5.0 however, all you've gotta do is throw an error and express will automatically catch it Here's an example of some middleware that would check if a user is logged in and send back an error if they weren't:

```
app.use((req, res, next) => {
  // Random helper function to handle checking if they're logged in
  // You can ignore this line
  const isLoggedIn = checkLogInStatus(req.user);

  // If they're logged in, let them through 
  if(isLoggedIn) return next();

  // If they're not logged in, send them to the error handler
  else throw new Error("User is not logged in")
})
```

Once the error is thrown from the function, it'll get caught by middleware that lives at the end of your API and takes in an extra fourth argument:

```
// Unlike other middleware this is the last route in your codebase, right above where you start your server
app.use((err, req, res, next) => {
  
  // Console log where the error happened
  console.error(err.stack)

  // Send the user back something to communicate that its broken
  res.status(500).send('Something broke!')
})
```

Realistically, you can toss whatever feels the most useful into that error handler but the most important thing you need in it is a res.send because if you don't give the user a response their browsers will time out and never realize that something broke in the first place.

You can either pass a custom error from within the route or - if you're in the newest version of express - you can do the same as what the app.use above is doing and just throw an error. The new thing they added in essentially surrounds every route with this code:

```
try {
  // code in your route
} catch(err) {

  return next(err)
}
```

The TL;DR of it is basically just:
Whenever you hit an error either just do throw new Error("Stuff Broke")
If you wanna extend the default error handler, toss a piece of middleware as the very last route in your app

Otherwise if you don't need custom handling everything should in theory be built out for you by default, express just does it behind the scenes
