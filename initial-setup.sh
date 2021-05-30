#!/bin/bash

# add domains to nginx

backend_domain_array=($(jq -r '.domains.backend' config.json  | tr -d '[]," '))
domain_certbot_args=""

for domain in "${backend_domain_array[@]}"
do
	$domain_certbot_args .= " -d "
	$domain_certbot_args .= $domain
done

frontend_domain_array=($(jq -r '.domains.frontend' config.json  | tr -d '[]," '))

for domain in "${frontend_domain_array[@]}"
do
	$domain_certbot_args .= " -d "
	$domain_certbot_args .= $domain
done

# setup letsencrypt

sudo systemctl stop nginx

echo "sudo systemctl stop nginx
certbot renew
sudo systemctl start nginx" >> /home/letsencrypt.sh
certbot certonly --standalone "$domain_certbot_args"
(crontab -l ; echo "10 3 1 * * /home/letsencrypt.sh") | crontab -

# setup proxy

echo "server {
	listen 80;
	return 301 https://\$host\$request_uri;
}

map \$http_upgrade \$connection_upgrade {
    default upgrade;
    ''      close;
}
	
server {
	listen 443;
	server_name ${domain_frontend} ${domain_frontend_2} ${domain_frontend_3} ${domain_frontend_4};
		
	gzip 				on;
	gzip_min_length 	10240;
	gzip_proxied 		expired no-cache no-store private auth;
	gzip_types 			text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;
	gzip_disable 		\"MSIE [1-6]\.\";
	gunzip 				on;

	ssl_certificate           /etc/letsencrypt/live/${domain_frontend}/fullchain.pem;
	ssl_certificate_key       /etc/letsencrypt/live/${domain_frontend}/privkey.pem;

	ssl on;
	ssl_session_cache  builtin:1000  shared:SSL:10m;
	ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
	ssl_prefer_server_ciphers on;

	access_log            /var/log/nginx/${domain_frontend};

	location / {

		proxy_set_header        Host \$host;
		proxy_set_header        X-Real-IP \$remote_addr;
		proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
		proxy_set_header        X-Forwarded-Proto \$scheme;
		proxy_set_header 		Upgrade \$http_upgrade;
        proxy_set_header 		Connection \$connection_upgrade;
	
		proxy_pass_request_headers on;
		proxy_pass          http://localhost:${port_frontend};
		proxy_read_timeout  90;

		proxy_redirect      http://localhost:${port_frontend}/ https://\$host/;
	}
}
	
server {
	listen 443;
	server_name ${domain_backend} ${domain_backend_2} ${domain_backend_3} ${domain_backend_4};
		
	gzip 				on;
	gzip_min_length 	10240;
	gzip_proxied 		expired no-cache no-store private auth;
	gzip_types 			text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;
	gzip_disable 		\"MSIE [1-6]\.\";
	gunzip 				on;

	ssl_certificate           /etc/letsencrypt/live/${domain_frontend}/fullchain.pem;
	ssl_certificate_key       /etc/letsencrypt/live/${domain_frontend}/privkey.pem;

	ssl on;
	ssl_session_cache  builtin:1000  shared:SSL:10m;
	ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
	ssl_prefer_server_ciphers on;

	access_log            /var/log/nginx/${domain_backend};

	location / {

		proxy_set_header        Host \$host;
		proxy_set_header        X-Real-IP \$remote_addr;
		proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
		proxy_set_header        X-Forwarded-Proto \$scheme;
		proxy_set_header 		Upgrade \$http_upgrade;
        proxy_set_header 		Connection \$connection_upgrade;
	
		proxy_pass_request_headers on;
		proxy_pass          http://localhost:${port_backend};
		proxy_read_timeout  90;

		proxy_redirect      http://localhost:${port_backend}/ https://\$host/;
	}
}" > /etc/nginx/sites-avail