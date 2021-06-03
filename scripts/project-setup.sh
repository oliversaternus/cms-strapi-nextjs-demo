#!/bin/bash

project_name=${jq '.git.project' config.json}
domain_backend=${jq '.domains.backend[0]' config.json}
port_backend=${jq '.ports.backend' config.json}

smtp_host=${jq '.email.host' config.json}
smtp_port=${jq '.email.port' config.json}
smtp_email_address=${jq '.email.address' config.json}
smtp_password=${jq '.email.password' config.json}

cd "/home/${project_name}/frontend"
echo "changed to frontend directory"
npm i
echo "dependencies installed"
npm run build
echo "nextjs built"

cd "/home/${project_name}/backend"
echo "changed to backend directory"
npm i
echo "dependencies installed"
echo "URL=${domain_backend}
HOST=0.0.0.0
PORT=${port_backend}
ADMIN_JWT_SECRET=$(openssl rand -hex 16)
SMTP_HOST=${smtp_host}
SMTP_PORT=${smtp_port}
SMTP_USERNAME=${smtp_email_address}
SMTP_PASSWORD=${smtp_password}
EMAIL=${smtp_email_address}" > .env
NODE_ENV=production npm run build
echo "strapi built"

# start project

cd "/home/${project_name}/frontend"
echo "changed to frontend directory"
pm2 start pm2.json
echo "pm2 started"

cd "/home/${project_name}/backend"
echo "changed to backend directory"
pm2 start pm2.json
echo "pm2 started"

pm2 save
echo "pm2 saved process list"