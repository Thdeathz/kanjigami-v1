ifeq (,$(wildcard .env))
$(shell cp .env.example .env)
endif

include .env

genkey:
	node -e "console.log(require('crypto').randomBytes(128).toString('hex'))"

devrun:
	docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn dev

devup:
	docker compose up -d --remove-orphans

devdown:
	docker compose down --remove-orphans

devinstall:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 yarn
	@docker exec -it $(COMPOSE_PROJECT_NAME)-client-1 yarn
	@test -f client/.env || cp client/.env.example client/.env
	@test -f server/.env || cp server/.env.example server/.env

prisma-format:
	docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 yarn prisma format

prisma-migrate:
	docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 yarn prisma migrate dev --name init --create-only

prisma-deploy:
	docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 yarn prisma migrate deploy

prisma-reset:
	docker exec -it $(COMPOSE_PROJECT_NAME)-server-1 yarn prisma migrate reset --force

logserver:
	docker logs -f $(COMPOSE_PROJECT_NAME)-server-1

devclean: devdown
	@docker rmi $$(docker images -a -q)
	@docker volume rm $$(docker volume ls -q)
	