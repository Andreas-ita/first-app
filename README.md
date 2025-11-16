# Angular First App
- Install Angular if you don't have it installed

  `npm install -g @angular/cli`

- Clone this branch to your local machine

  `git clone -b homes-app-start git@github.com:angular/codelabs.git homes-app`

- Once the code has been downloaded

  `cd homes-app`

- Install the depencies

  `npm install` 

- Run the application 

  `ng serve`

- install json web token with node package manager

 `npm install jsonwebtoken`

- Startup index.js for auth endpoints and DB connections, first change dir to first-api then run

`cd first-api`
`index.js`

- - Run serve db.json for house list details, can be removed later

`json-server --watch db.json`

- - SQL server sa account P@ssw0rd123!
`node index.js`