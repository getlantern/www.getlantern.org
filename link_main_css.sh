#!/bin/sh

MAIN_CSS=".tmp/styles/main.css"
TARGET="app/styles/main.css"

if [ -f $MAIN_CSS ]; then
    rm -fv $TARGET
    ln -fv $MAIN_CSS $TARGET
else
    echo file not found: $MAIN_CSS
    exit 1
fi
