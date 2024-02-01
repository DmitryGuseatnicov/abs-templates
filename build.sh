#!bin/bash

rm -rf dist
yarn tsc --project tsconfig.json && yarn tscpaths -p tsconfig.json -s ./src -o ./dist
rm -rf dist/templates
cp -r src/templates dist

# local trash
rm -rf dist/templates/**/node_modules
rm -rf dist/templates/**/.next
rm -rf dist/templates/**/build
rm -rf dist/templates/**/dist
rm -rf dist/templates/**/yarn.lock
rm -rf dist/templates/**/package-lock.json

for d in ./dist/templates/**
do
    ( cd "$d" && mv package.json template.json )
    ( cd "$d" && mv .gitignore .gitignore-template )
done
