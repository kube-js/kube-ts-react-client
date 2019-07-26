#!/bin/bash
# @credits: https://codequs.com/p/ByBym0ZS4/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx
# Recreate config file
# get env vars from CI/CD tool - only those starting with REACT_APP_*

touch /usr/share/nginx/html/.env
printenv | grep 'REACT_APP_*' >> /usr/share/nginx/html/.env

touch /usr/share/nginx/html/env-config.js

# Add assignment
echo "window._env_ = {" >>/usr/share/nginx/html/env-config.js

# Read each line in .env file
# Each line represents key=value pairs

while read -r line || [[ -n "$line" ]]; do

  # Skip commented lines
  case "$line" in \#*) continue ;; esac

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >>/usr/share/nginx/html/env-config.js
done </usr/share/nginx/html/.env

echo "}" >>/usr/share/nginx/html/env-config.js
