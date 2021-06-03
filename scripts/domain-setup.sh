#!/bin/bash

project_name=($(jq '.git.project' config.json))
main_domain=($(jq '.domains.frontend[0]' config.json))
frontend_domain_array=($(jq -r '.domains.frontend' config.json  | tr -d '[]," '))
backend_domain_array=($(jq -r '.domains.backend' config.json  | tr -d '[]," '))

port_backend=($(jq '.ports.backend' config.json))
port_frontend=($(jq '.ports.backend' config.json))

domain_certbot_args=""
frontend_nginx_args=""
backend_nginx_args=""

for domain in "${frontend_domain_array[@]}"
do
	$domain_certbot_args .= " -d "
	$domain_certbot_args .= $domain
	
	$frontend_nginx_args .= " "
	$frontend_nginx_args .= $domain
done

for domain in "${backend_domain_array[@]}"
do
	$domain_certbot_args .= " -d "
	$domain_certbot_args .= $domain
	
	$backend_nginx_args .= " "
	$backend_nginx_args .= $domain
done

# setup letsencrypt

sudo systemctl stop nginx

certbot certonly --standalone "$domain_certbot_args"

# setup proxy

echo "server {
	listen 443;
	server_name ${frontend_nginx_args};
		
	gzip 				on;
	gzip_min_length 	10240;
	gzip_proxied 		expired no-cache no-store private auth;
	gzip_types 			text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;
	gzip_disable 		\"MSIE [1-6]\.\";
	gunzip 				on;

	ssl_certificate           /etc/letsencrypt/live/${main_domain}/fullchain.pem;
	ssl_certificate_key       /etc/letsencrypt/live/${main_domain}/privkey.pem;

	ssl on;
	ssl_session_cache  builtin:1000  shared:SSL:10m;
	ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
	ssl_prefer_server_ciphers on;

	access_log            /var/log/nginx/${main_domain};

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
	server_name ${backend_nginx_args};
		
	gzip 				on;
	gzip_min_length 	10240;
	gzip_proxied 		expired no-cache no-store private auth;
	gzip_types 			text/plain text/css text/xml text/javascript application/x-javascript application/xml application/json;
	gzip_disable 		\"MSIE [1-6]\.\";
	gunzip 				on;

	ssl_certificate           /etc/letsencrypt/live/${main_domain}/fullchain.pem;
	ssl_certificate_key       /etc/letsencrypt/live/${main_domain}/privkey.pem;

	ssl on;
	ssl_session_cache  builtin:1000  shared:SSL:10m;
	ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
	ssl_prefer_server_ciphers on;

	access_log            /var/log/nginx/${main_domain};

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
}" > "/etc/nginx/${project_name}.conf"

echo "
include    /etc/nginx/${project_name}.conf;
" >> /etc/nginx/sites-available/default

sudo systemctl start nginx