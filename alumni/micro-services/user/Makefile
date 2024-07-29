buildApp-Dev: #Lance le docker + le serveur
	cd ./docker && sudo docker compose up -d && sleep 3 && cd .. && NEST_ENV=development nest start --watch

buildApp-WinDev: #Lance le docker + le serveur
	cd ./docker && docker-compose up -d && sleep 3 && cd .. &&set NEST_ENV=development nest start --watch

stopApp:
	cd ./docker && sudo docker compose down

stopApp-Win:
	cd ./docker && docker-compose down
