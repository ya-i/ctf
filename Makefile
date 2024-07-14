.PHONY : all
all :

.PHONY : fmt
fmt :
	bun x prettier --write .
	bun x eslint --fix .
	@ git diff-index --quiet HEAD

.PHONY : build
build :
	bun x tsc
	bun bin/build.ts

.PHONY : test
test :
	bun test

.PHONY : clean
clean :
	-rm assets/{chromium,firefox}/{*.css,*.js,*.html,*.json}

.PHONY : distclean
distclean : clean
	-rm assets/public/maxmind/GeoLite2-Country.mmdb
	-@ $(MAKE) --directory=lib/maxmind clean
	-rm -r node_modules

assets/public/maxmind/GeoLite2-Country.mmdb :
	mkdir -p `dirname $@`
	curl -vL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${MAXMIND_LICENSE_KEY}&suffix=tar.gz" | tar --strip-components 1 -xzv -C `dirname $@`
	ls -lAh `dirname $@`

.PHONY : lib/maxmind
lib/maxmind :
	@ $(MAKE) --directory=lib/maxmind
