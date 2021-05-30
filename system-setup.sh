#!/bin/bash

# This scripts installs all necessary binaries and sets up basic configuration for pm2 and firewall

# setup system

sudo apt-get -y update
echo "system updated"
sudo apt-get -y upgrade
echo "system upgraded"
sudo apt-get -y install ufw
echo "ufw installed"
sudo apt-get -y install libssl-dev
echo "openssl installed"
sudo apt -y install certbot
echo "certbot installed"
sudo apt -y install git-all
echo "git installed"
sudo apt -y install nginx
echo "nginx installed"
sudo apt-get install python-software-properties
echo "python-tools installed"
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash –
echo "added nodeJS ppa"
sudo apt-get -y install nodejs
echo "nodejs installed"
sudo apt-get -y install jq
echo "jq installed"

# setup pm2

npm install pm2@latest -g
echo "pm2 installed"
pm2 startup
echo "pm2 startup configured"

# setup firewall

sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
echo "firewall rules set"
sudo ufw enable
echo "firewall setup finished"