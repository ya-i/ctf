.PHONY : all
all :

.PHONY : fmt
fmt :
	bun x prettier --write .
	bun x eslint --fix .
	@ git diff-index --quiet HEAD

.PHONY : test
test :
	@ $(MAKE) --directory=lib/maxmind test

.PHONY : distclean
distclean :
	-@ $(MAKE) --directory=lib/maxmind clean
	-rm -r node_modules

.PHONY : lib/maxmind
lib/maxmind :
	@ $(MAKE) --directory=lib/maxmind
