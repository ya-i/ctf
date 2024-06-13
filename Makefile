.PHONY : all
all :

.PHONY : lib/maxmind
lib/maxmind :
	@ $(MAKE) --directory=lib/maxmind

.PHONY : fmt
fmt :
	bun x prettier --write .
	bun x eslint --fix .
	@ git diff-index --quiet HEAD

.PHONY : test
test :
	@ $(MAKE) --directory=lib/maxmind test

assets/public/maxmind/GeoLite2-Country.mmdb :
	mkdir -p `dirname $@`
	curl -vL "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${MAXMIND_LICENSE_KEY}&suffix=tar.gz" | tar --strip-components 1 -xzv -C `dirname $@`
	ls -lAh `dirname $@`

assets/chromium/manifest.json : package.json
	mkdir -p `dirname $@`
	bun bin/manifest.ts chromium > $@

assets/chromium/service_worker.js : src/service_worker.ts
	mkdir -p `dirname $@`
	bun build --entrypoints src/service_worker.ts --outdir assets/chromium

.PHONY : clean
clean :
	-rm assets/chromium/{manifest.json,service_worker.js}

.PHONY : distclean
distclean :
	-rm assets/public/maxmind/GeoLite2-Country.mmdb
	-@ $(MAKE) --directory=lib/maxmind clean
	-rm -r node_modules
