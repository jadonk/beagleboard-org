#!/bin/sh
cd apps/beagle
echo $PWD > working_dir.txt
git add .
git commit -a --message="Web edits" --author="Anonymous <anonymous@beagleboard.org>"
