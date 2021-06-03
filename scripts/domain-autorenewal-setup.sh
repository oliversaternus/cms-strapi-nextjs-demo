#!/bin/bash

echo "sudo systemctl stop nginx
certbot renew
sudo systemctl start nginx" > /home/letsencrypt.sh

(crontab -l ; echo "10 3 1 * * /home/letsencrypt.sh") | crontab -