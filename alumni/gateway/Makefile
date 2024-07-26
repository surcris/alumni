buildApp-Dev: #Lance le docker + le serveur
	cd ./docker && sudo docker compose up -d && cd .. && NODE_ENV=development nest start --watch

stopApp:
	cd ./docker && sudo docker compose down
