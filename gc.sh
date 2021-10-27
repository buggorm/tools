#!/bin/bash

b=$1
progname=$(basename $0 | cut -d'.' -f1)

if [ -z $b ] ; then
	echo "usage: $progname branch"
	exit 1	
fi
if [ $b == "-" ] ; then
	git checkout -
	exit 2
fi

sb=$(git branch | grep -v '^*' | grep -i $b | tr -d '[:blank:]' | head -n 1)

if [ -z $sb ] ; then
	echo "$progname: unable to find branch"
	exit 3
fi

git checkout $sb
