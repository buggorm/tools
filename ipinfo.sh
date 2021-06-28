#!/bin/sh

genreg () {
	re="^"
	for i in {0..3}; do
        	re="$re[0-9][0-9]?[0-9]?."
	done
	echo "$(echo "$re" | rev | sed 's/.//' | rev)\$"
}

if [ -z $1 ] ; then
	echo no ip
	exit 1
fi

re=$(genreg)
valid=$(echo $1 | grep -E $re)
if [ -z $valid ] ; then
	echo invalid ip
	exit 2
fi

ua="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"

curl -sL -A "$ua" api.spiceworks.com/ip-check/api/v1/lookup/$1 | jq . -M

