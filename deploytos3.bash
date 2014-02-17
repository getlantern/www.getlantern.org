#!/usr/bin/env bash

which s3_website || gem install s3_website
s3_website push --site dist --config-dir ../too-many-secrets 
