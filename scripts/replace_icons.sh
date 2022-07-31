#!/usr/bin/env bash
#
# Replace src/css/icons/ with an updated set of icons from fontello.com

DOWNLOADS=$HOME/Downloads

cd $DOWNLOADS
unzip fontello-*.zip
rm fontello-*.zip
rm fontello-*/demo.html
rm -rf src/css/icons/
mv fontello-*/ src/css/icons
