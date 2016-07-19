build: node_modules
	gulp build

deploy: build
	./deploy.sh

clean:
	rm -rf dist

init:
	npm install

node_modules: package.json
	npm install

.PHONY: build
