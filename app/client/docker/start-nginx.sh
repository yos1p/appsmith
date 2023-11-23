#!/bin/sh

# This script is baked into the appsmith-editor Dockerfile and is used to boot Nginx when the Docker container starts
# Refer: /app/client/Dockerfile
set -o errexit
set -o xtrace

if [ -z "$APPSMITH_SERVER_PROXY_PASS" ]; then
  export APPSMITH_SERVER_PROXY_PASS='http://localhost:8080'
  echo "No explicit value for APPSMITH_SERVER_PROXY_PASS, using '$APPSMITH_SERVER_PROXY_PASS'."
fi

cp /nginx-root.conf.template /etc/nginx/nginx.conf

if [ -f /nginx.conf.template ]; then
  # This is to support installations where the docker-compose.yml file would mount a template confi at this location.
  app_template=/nginx.conf.template
elif [ -z "$APPSMITH_SSL_CERT_PATH" ]; then
  if [ -z "$APPSMITH_DOMAIN" ]; then
    export APPSMITH_DOMAIN=_
  fi
  app_template=/nginx-app-http.conf.template
else
  if [ -z "$APPSMITH_DOMAIN" ]; then
    echo "APPSMITH_DOMAIN is required when SSL is enabled." >&2
    exit 2
  fi
  app_template=/nginx-app-https.conf.template
fi

cat "$app_template" \
  | envsubst "$(printf '$%s,' $(env | grep -Eo '^APPSMITH_[A-Z0-9_]+'))" \
  | sed -e 's|\${\(APPSMITH_[A-Z0-9_]*\)}||g' \
  | tee /etc/nginx/conf.d/default.conf

# Get the value of APP_TITLE from environment variables
APP_TITLE_VALUE=${APP_TITLE:-System}

# Use sed to replace the placeholder with the actual value in env-config.js
sed -i "s|window._env_.APP_TITLE = \"default\"|window._env_.APP_TITLE = \"$APP_TITLE_VALUE\"|g" /var/www/appsmith/public/env-config.js

exec nginx -g 'daemon off;'
