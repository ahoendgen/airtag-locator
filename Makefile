.PHONY: help

COMPOSE=docker-compose -f docker-compose.yml -f docker-compose.override.yml

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ------------------------------------------------------
# GLOBAL
# ------------------------------------------------------

clean: ## Clean the docker env
	$(COMPOSE) down --remove-orphans

build: ## Build the docker env (useful if dependencies have changed)
	$(COMPOSE) build

log: ## Show logs
	$(COMPOSE) logs -f

up: start ## Start the docker env
start: ## Start the docker env
	$(COMPOSE) up

console: ## Connect to the docker env
	$(COMPOSE) exec ${SERVICENAME} sh

down: stop ## Stop the docker env
stop: clean ## Stop the docker env

restart: stop clean start ## Restart the docker env

fix: ## Fix code style
	yarn fix
