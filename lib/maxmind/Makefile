.PHONY : all test clean
all : test/GeoLite2-Country-Test.mmdb index.mjs

index.mjs : index.mts
	bun x tsc --pretty
	bun x webpack

test/GeoLite2-Country-Test.mmdb :
	cd test && wget 'https://raw.githubusercontent.com/maxmind/MaxMind-DB/main/test-data/GeoLite2-Country-Test.mmdb'

test :
	cd test && bun x tsc
	cd test && bun test

clean :
	- rm test/*.mmdb *.d.mts index.*js
