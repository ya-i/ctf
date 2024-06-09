.PHONY : all
all :

.PHONY : lib/maxmind
lib/maxmind :
	@ $(MAKE) --directory=lib/maxmind

.PHONY : fmt
fmt :
	bun x prettier --write .
	@ git diff-index --quiet HEAD

.PHONY : test
test :
	@ $(MAKE) --directory=lib/maxmind test

.PHONY : distclean
distclean :
	-@ $(MAKE) --directory=lib/maxmind clean
	-rm -r node_modules
