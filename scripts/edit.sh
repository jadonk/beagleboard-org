#!/bin/sh
cd apps/beagle
#echo $PWD > working_dir.txt
git add db
git commit --message="Web edits" --author="Anonymous <anonymous@beagleboard.org>" db
