#!/bin/bash

cb=$(git branch | grep ^* | cut -d' ' -f2)

if [ -z "$cb" ] ; then
	exit 1
fi

git push --set-upstream origin "$cb"
