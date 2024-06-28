.PHONY: help setup-localdb prisma-generate prisma-migrate
help: ## (Print help)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup-localdb: ## ローカル用DBを立ち上げます
	docker-compose rm -fsv mysql
	rm -rf ./docker/db/data
	docker-compose up -d mysql

prisma-generate: ## Prismaのスキーマを元にコードを生成します
	npx prisma generate

prisma-migrate: ## Prismaのマイグレーションを実行します
	npx prisma migrate dev --name init
