#!/bin/sh

if [ -z $(ls -a | grep ^.git$) ]; then echo Not a git repository!; exit 1; fi

echo -e "\e[95m($(git status | grep 'On branch' | cut -d' ' -f3))"
