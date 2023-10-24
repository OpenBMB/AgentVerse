#!/usr/bin/env bash

if [ -d .git/hooks ]
then
    cp git-hooks/* .git/hooks/
fi
