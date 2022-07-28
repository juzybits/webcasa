#!/usr/bin/env bash
#
# Replace src/css/icons/ with an updated set of icons from fontello.com

REPO=$HOME/data/code/webcash/casa
DOWNLOADS=$HOME/Downloads

cd $DOWNLOADS
unzip fontello-*.zip
rm fontello-*.zip
rm fontello-*/demo.html
rm -rf $REPO/src/css/icons/
mv fontello-*/ $REPO/src/css/icons
