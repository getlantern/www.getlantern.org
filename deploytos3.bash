#!/usr/bin/env bash

function die() {
  echo error: $*
  exit 1
}

SITE_DIR="."  # expects this script to be run via grunt with a cwd of "dist"
CSS_DIR="./styles"
CONFIG_DIR="../../too-many-secrets/s3_website_buckets/getlantern.org"

which s3_website >/dev/null || die "no s3_website on path. 'gem install s3_website'?"
test -d ${CSS_DIR} || die "expected css dir at: ${CSS_DIR}"
test -d ${CONFIG_DIR} || die "expected config dir at: ${CONFIG_DIR}"

echo "* rewriting paths in css files to convert from absolute to relative..."
sed -i "" "s,/styles/fonts,./fonts,g" ${CSS_DIR}/*.css || die "sed command failed"
sed -i "" "s,/images,../images,g" ${CSS_DIR}/*.css || die "sed command failed"

echo "* deploying to s3..."
s3_website push --site ${SITE_DIR} --config-dir ${CONFIG_DIR}

echo "done."
