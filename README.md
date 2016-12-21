## Two Factor Authentication and Car Inventory(https://agile-thicket-72889.herokuapp.com/)

Two-factor authentication (2FA) in web app with Twilio-powered Authy. 2FA helps further secure your user' data by validating more than just a password. 

Adding two-factor authentication (2FA) to your web application increases the security of your user's data. Multi-factor authentication determines the identity of a user by validating once by logging into the app, and second by validating their mobile device. 

## How it works

For the second factor, we will validate that the user has their mobile phones by either: 
  - Sending a OneTouch push notification to their mobile Authy app
  - Sending them a token through their mobile Authy app
  - Sending them a one-time token in a text message sent with Authy via Twilio

## Getting Started

1. clone the program using 
```
git clone https://github.com/LoRyder1/car-locker.git
```

2. navigate to repository
```
cd car-locker
```

3. install the required gems using bundler
```
bundle install
```

4. get the app up and running
  ```
  ruby twiml-quickstart.rb
  ```
  
5. in a new terminal window use ngrok to use secure tunnel to localhost - exposes a local server behind a NAT or firewall to the internet. 
  ```
  ngrok http 4567
  ```

6. Export the environment variables
```
export AUTHY_API_KEY=Your Authy API Key
```

7. Run the server
```
bundle exec rails s
```

8. Expose your application to wider internet using ngrok
```
ngrok http 3000
```

9. Go to your https://dashboard.authy.com. Add and update endpoint/url with the endpoint you created.
```
https://agile-thicket-72889.herokuapp.com/authy/callback
```

8. Link to [application](https://agile-thicket-72889.herokuapp.com/)

## Built with

* Ruby - is a dynamic, reflective, object-oriented, general-purpose programming language.
* Rails - server side web application framework written in Ruby. Uses MVC framework, providing default structures for a database, a web service, and web pages. 
* Authy(powered by Twilio) - mobile and desktop app for two-step verifications. more secure, more reliable, more convenient
