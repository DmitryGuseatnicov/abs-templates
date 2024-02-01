#!bin/bash

( rm -rf node_modules && npm install --silent --no-progress && echo "\033[32;1;45m Deps for root installed \033[0m" ) &

for d in ./src/templates/**
do
    ( cd "$d" && rm -rf node_modules && npm install --silent --no-progress && echo "\033[32;1;45m Deps for $d installed \033[0m" ) &
done
wait
