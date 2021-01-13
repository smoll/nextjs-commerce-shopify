default: publish

i: install
p: publish

install:
	yarn

publish:
	npx yalc publish
