#!/bin/bash

ntc="nothing to commit"
ntcs=$(echo "$ntc" | wc -c)
utd=$(git status | grep -o "$ntc")
utds=$(echo "$utd" | wc -c)

if [ $utds -ne $ntcs ] ; then
	echo "finish your commit nerd"
	exit 1
fi

cb=$(git branch | grep '^*' | cut -d' ' -f2)
pf=$(date | cut -d' ' -f2- | sed 's/\([ :]\)/-/g')
nb="$cb-$pf"

git checkout -b $nb 2> /dev/null
git checkout - 2> /dev/null
echo "voila"
