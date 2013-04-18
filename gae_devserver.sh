#!/bin/sh

dev_appserver.py --skip_sdk_update_check=true --port=$1 $2 &
sleep 3
