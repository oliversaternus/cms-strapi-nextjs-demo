#!/bin/bash
project_name=${jq '.git.project' frontend/pm2.json}

(crontab -l ; echo "*/15 * * * * /home/${project_name}/deploy.sh") | crontab -
echo "auto deployment set up"