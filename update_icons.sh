cd $HOME/Downloads
unzip fontello-*.zip
rm fontello-*.zip
rm fontello-*/demo.html
rm fontello-*/LICENSE.txt
rm -rf $HOME/data/repos/webcash/casa/src/css/icons/
mv fontello-*/ $HOME/data/repos/webcash/casa/src/css/icons
