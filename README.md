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

- install json web token with node package manager(not needed anymore)

 `npm install jsonwebtoken`

- Startup index.js for auth endpoints and DB connections, first change dir to first-api then run

`cd first-api`
`node index.js`

- - Run serve db.json for house list details, can be removed later

`json-server --watch db.json`

- - SQL server sa account P@ssw0rd123!
	- adm account StrongPassword123!/

Open SQL Server Configuration Manager:
Search "SQL Server Configuration Manager" in Windows Start menu.

Enable TCP/IP:
Go to SQL Server Network Configuration > Protocols for [Your Instance Name] (usually MSSQLSERVER for default, or SQLEXPRESS).
Right-click TCP/IP > Enable.

Set Fixed Port 1433:
Double-click TCP/IP > IP Addresses tab.
Scroll to IPAll.
Clear TCP Dynamic Ports (leave blank).
Set TCP Port to 1433.
Click OK.

Restart SQL Server Service SQL Server (mssqlserver)

*********************
https://betway.com/
https://jsbsports.bet/sports
https://interbet.co.za/
https://classicsbet.com/sportsbook
*********************