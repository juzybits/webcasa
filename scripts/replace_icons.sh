#!/usr/bin/env bash
#
# Replace src/css/icons/ with an updated set of icons from fontello.com

DOWNLOADS=$HOME/Downloads

unzip $DOWNLOADS/fontello-*.zip
rm $DOWNLOADS/fontello-*.zip
rm fontello-*/demo.html
rm fontello-*/README.txt
rm -rf src/css/icons/
mv fontello-*/ src/css/icons
