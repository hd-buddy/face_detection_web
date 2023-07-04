Here are some screenshots of the website.

## [1] Face recognition 🙂
![image](https://github.com/hd-buddy/face_detection_web/assets/117499276/98d85673-c6cb-4c93-8711-d69aa1156e20)
## [2] Sign-In Form
![image](https://github.com/hd-buddy/face_detection_web/assets/117499276/04abc8a5-ff4b-4f23-8ad2-3480c67bf3f5)
## [3] Registration Form
![image](https://github.com/hd-buddy/face_detection_web/assets/117499276/812fe038-a600-4434-873a-4459e5995bc8)


Also uploading facercognise-api file which you can download directly from here.\
[API file Github Link](https://github.com/hd-buddy/face_detection_web/tree/master/facerecognise-api)

# READ THIS TOO 
👉Neccesary changes/installations to do
 1) Install __postgresql__ and create database as __'smart-brain'__ 
 2) In that create two table users and login (sql queries given below)\
   `create table users(id serial primary key,name varchar(100),email text unique not null, entries bigint default 0,joined date);`\
   `create table login(id serial primary key,email text unique not null,hash varchar(100) not null);`
 3) Update your password in the 'server.js' file. (Line:__12__)
 4) For more help: Read the details given below on react.

# IMP 
- [x] run api on localhost:3000 and web on localhost:3001


















# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:      

### `npm start`  

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

