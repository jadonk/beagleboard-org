#!/bin/sh
killall java
killall -9 java
cd /home/ubuntu/beagleboard.org
git pull github master
git add db
git commit --message="Web updates" --author="Anonymous <anonymous@beagleboard.org>" db
git push github master
cd /home/ubuntu && ./helma-1.6.1/start.sh > /var/log/helma.log 2>&1 &
