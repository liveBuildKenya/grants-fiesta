# Backend API Deployment

`git pull`

`sudo rm -r /var/www/api.gms.eoai-africa.org/*`

`ls /var/www/api.gms.eoai-africa.org/`

`sudo cp ./Backend/* -r /var/www/api.gms.eoai-africa.org/*`

`pm2 list`

`pm2 delete <process_id>`

`cd /var/www/api.gms.eoai-africa.org/`

`pm2 list`

`npm install`

`pm2 start npm -- start -- run "start:dev"`

1) Pull code grants-management
2) Create Global Admin : <server_url>/user/createGlobalAdministrator/
3) Login as Global Admin
4) Create Menu: POST <server_url>/menu/

- Note: Always use the latest value from data/Menu.sample.json
 

`pm2 start npm --name "app name" -- start`

`pm2 start npm -- start -- run "start:dev"`

