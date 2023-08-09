### Part - 1 . Front-End ###
## 1. Download & Install latest version of node with default settings. [Node-Download](https://nodejs.org/en/download)
    - Check node is installed correctly or not : type in system cmd -> node --version
    - npm ( node package manager ) it is automatically downloaded with node this will help in downloading and managing packages.
    - Check npm version : type in system cmd -> npm --version

## 2. Creating React app
    - Basic commands to create app
    -a. npx create-react-app my-app -> it will create folder `my-app` where all front-end code exist. (if create react app   not a command) then install -> npm install -g create-react-app : this will install it globally (for first time only)
    -b. cd my-app
    -c. npm start -> to start the development server only for development. ( In production build file that do not need any server to start fornt-end)
    -d. optional vs code extension : [Source](https://www.syncfusion.com/blogs/post/7-vs-code-extensions-for-react-developers.aspx)

## 3. Folder Structure
    ![Folder Structure](folder-structure.png)
    #Explanation
        - node_modules : all the packages we downloads through npm is stored locally here let it be there.
        - public : title, metadata, fab-icon and root element is stored here. That we get in `index.js` and render here App.js   robots.txt is just for google crawling for seo let it be.
        - src : This is main folder > we have to work on we cannot access any file or media outside this folder
            #Files
            - index.js : main file that runs after npm start command
                # Browser DOM have element with id root that we access with `index.js` and render `App.js` there.
            - index.css and app.css : styling file
            - reportWebVital.js : it report performance metrics of application, let it be.
            - setupTest.js : To run tests on app, let it be.
            - package.json : that manage package and scripts etc.
            - package-lock.json : history of package.json, let it be.

## 4. Cleaning Dummy Content
    1. In `public/index.html` : update fab-icon logos, title and remove unnecessary comments.
    2. In `src/index.css` and `src/app.css` remove styling.
    3. In `src/App.js` remove dummy jsx and add jsx (html + js) that is visible on the screen;

## 5. Splitting UI into components
    step 1 : Make `Components` directory under `src` directory.
    step 2 : Make Components -> Header, Registration Form and Footer Components (function or class based components).
        - creating functional components
            `Header.js` first latter is in uppercase (recommended)
            
                import react form 'React'
                import './Header.css'

                const Header = () => {
                    return (
                        <div>
                            My Header
                        </div>
                    );
                }
        - Repeat these step to create `Footer.js`
        - `RegisterForm.js`
            
            import React from 'react'

            import "./RegisterForm.css";

            function RegisterForm() {
                const handleSubmit = (e) => { // this function handle form submission and prevent default form submission
                    e.preventDefault();
                    console.log('form is handled.')
                    // now we connect to backend and send form data to backend.
                }
            return (
                <form onSubmit={handleSubmit} className='form'>
                <div>  
                    <label htmlFor="name">Username : </label>
                    <input type="text" name="name" placeholder="Full Name" required/>
                </div>
                <div>
                <label htmlFor="email">Email : </label>
                <input type="email" name="email" placeholder="example@example.com" required/>
                </div>
                <input type='submit' placeholder='Register'/>
                </form>
            );
            }

            export default RegisterForm

## 6. Storing User Registration Data and Making an API call to backend
    - we store user data in object by using `state` of react
    step 1 : create empty state
            // initializing state with empty object that contain name and email field
            // registrationData -> object that store data, setRegistrationData -> method that is used to update data
            
            const [registrationData, setRegistrationData] = useState({
            name: "",
            email: "",
            });
    step 2 : Update input element : name and email
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleInputChange} // as we type any character in input field  `handleInputChange` function is called and value is updated
                required
            />
    
    step 3 : This is handle change method
            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setRegistrationData((prevPerson) => ({
                    ...prevPerson,
                    [name]: value,
                }));
            };

    step 4 : Making Http request to server and sending data to backend
            - first we have to install axios (npm install axios) in application root `.../my-app>npm install axios` -> to make http request
            - now import axios on top of RegisterForm.js -> import axios from 'axios'
            - below code is to make http request and send data to server after preventing default form submission
            - explanation -> backend server is running on `ttp://localhost:5000` and all api routing is handled by `/api` route and `/register` is that end point we are making request handle our request
            const res = await axios
            .post("http://localhost:5000/api/register", {
                name: registrationData.name,
                email: registrationData.email,
            })
            .catch((error) => {
                console.log(error);
            });
            console.log(res)
    Final : Now front end send data successfully and backend will do the rest and after handling request at backend we got a response that is sent by the backend and depending upon response we update our ui.

<--- Front-End Completed --->

<--- Back-End Start --->

## 1. Creating Simple Node Server
    step 1 : Create `server` directory at same level of `my-app` and make basic foler structure
            |---server--
                       |---models (this holds all the models or schema)
                       |---routes (all api routing are route through here)
                       |---controllers (here all controller functions is declared)
                       ---index.js (starting file of backend)
    
    step 2 : now we install express : it used to communicate client browser with backend , api routing, make communication on two port and sending response back to client.
            - command -> npm install express
            - following code will use to start the server
                const express = require('express')
                const app = express();

                app.listen(5000, ()=> {
                    console.log("server is running on 5000 port.")
                    
                })
            - now replace test script in package.json as `"start" : "node index.js"`
            - now backend server -> cd backend and then ->npm start 
            - now go to loacalhost:5000 in browser where you see your console message.
            - now we work with api and connect our front-end with back-end in next step.
    step 4 : Flow of connection between front-end and back-end
            - there is many different approach but this is suitable to me that i explained below.
            - first you have to create account on mongodb atlas and create cluster and get your connection string [In one min](https://www.youtube.com/shorts/pIHvoXkwmq4)

            -now we install three dependencies (mongoose, cors, cookie-parser)
            - mongoose -> it is used to make connect, create schema and all kind of query into database
            - cors -> cross origin resource sharing or making connection between two port or browser.
            - cookie-parser -> it is used to share object we send with request object but in recent update is not mandatory.
            - commands -> npm install mongoose cors cookie-parser

            - now require or import all this in index.js as :
                -const mongoose = require("mongoose");
                -const cookieParser = require("cookie-parser");
                -const cors = require("cors");

            - now set credential and origin for cors as `app.use(cors({ credentials: true, origin: "http://localhost:3000" }));` just after creating app constant.

            - now just after that use middleware cookie-parser as:
                -app.use(cookieParser());
                -app.use(express.json());

            - as we do our post request at url : http://localhost:5000/api/register -> api is used to categorize different different route or multiple api1, api2 for different different versioning of api and at the end `register` is the end point where it get it controller or what is actually have to do with this incoming request.
            - server is running at 5000 port
            - now request is coming to index file where all api routes is defined separately in routes directory that we created earlier in user-routes.js where we assign different-different controller to different end point here `register`.
            -now import (named import) `router` from `user-router` in routes directory as `const { router } = require("./routes/user-routes");`
            -now just after the middle ware use we transfer all incoming request to the router as `app.use("/api", router);`
            -now we define create user-routes.js
                const express = require("express");
                const {
                    register
                    } = require("../controllers/user-controller"); // getting controller function
                const router = express.Router();

                router.post("/register", register); // first parameter is end point and second parameter is controller function
                module.exports = { router }; // do named export so thats why we were able to import in index.js
            -now we define our controller that is called by router it gets model(schema) and data form api request that is coming through api request
            -as side by side we wrap the server listen method to execute after the connection of mongodb
                mongoose
                .connect(
                    `mongodb+srv://krishankanhaya:mypassword@users.tmuhp0y.mongodb.net/?retryWrites=true&w=majority`
                )
                .then(() => {
                    app.listen(5000, () => {
                    console.log("Database is connected and. App is listening on 5000");
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            - now two things only we have to do :  make model(schema) in `models/user.js` and controller that takes model and insert data into model that we get through api call

            - first we define schema for models and export it:
                const mongoose = require("mongoose");
                const Schema = mongoose.Schema;

                const userSchema = new Schema({
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                    unique: true,
                }
                });

                module.exports = mongoose.model("User", userSchema); // in atlas `User` become plural and lowercase `users` that is collection and multiple collection can exist in same cluster that we created earlier on atlas

            - in the last we define controller for register route and export it as :
                const User = require("../models/user");

                const register = async (req, res, next) => {
                let existingUser;
                const { name, email } = req.body;
                try {
                    existingUser = await User.findOne({ email: email });
                } catch (error) {
                    console.log(error);
                }

                if (existingUser) {
                    return res.status(409).json({ message: "User already exists" });
                }

                const user = new User({
                    name,
                    email
                });

                try {
                    await user.save();
                } catch (error) {
                    console.log(error);
                }

                return res.status(201).json({ message: user });
                };

                module.exports = {register};
    <--- Back-end complete --->




    

                 



