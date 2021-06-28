#!/bin/sh

[ -z "$1" ] && exit 1

cat "$1" | base64 -d
