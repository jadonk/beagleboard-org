#!/bin/sh
# Invoke as beagleboard.org/install.sh (from one directory up).
# It is assumed you have already run the following command to fetch code:
# git clone http://www.beagleboard.org/beagleboard.org.git/ beagleboard.org
# 
wget http://adele.helma.org/download/helma/1.6.1/helma-1.6.1.tar.gz
tar xvzf helma-1.6.1.tar.gz
cd helma-1.6.1
cd apps
ln -s ../../beagleboard.org beagle
cd ..
mv apps.properties apps.properties.original
ln -s apps/beagle/config/apps.properties
cd lib
mv ext ext.original
mv rhino.jar rhino.jar.original
ln -s ../apps/beagle/lib ext
cd ..
mkdir db
cd db
ln -s ../apps/beagle/db beagle
cd ..
cd ..

