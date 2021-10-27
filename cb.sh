#!/bin/bash

cb=$(git branch | grep '^*' | cut -d' ' -f2)
echo "($cb)"
