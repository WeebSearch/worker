#!/usr/bin/env bash

psql -U postgres -c "CREATE USER 'solr-client' with login password 'solr'"
