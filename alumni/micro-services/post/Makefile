buildApp:
	cd ./.docker && sudo docker compose up -d && cd .. && nest start --watch

buildApp-dev:
	cd ./.docker && sudo docker compose up -d && cd .. && NODE_ENV=development nest start --watch

buildApp-prod:
	cd ./.docker && sudo docker compose up -d && cd .. && NODE_ENV=production nest start --watch

stopDocker:
	cd ./.docker && sudo docker compose down
