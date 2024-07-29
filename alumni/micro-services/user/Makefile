buildApp-Dev: #Lance le docker + le serveur
	cd ./docker && sudo docker compose up -d && sleep 3 && cd .. && NEST_ENV=development nest start --watch

# ba-w: #Lance le docker + le serveur sur windows
# 	cd ./docker && docker-compose up -d && timeout /t 3 && cd .. && set NEST_ENV=development nest start --watch

stopApp:
	cd ./docker && sudo docker compose down

stopA-w: #Pour windows
	cd ./docker && docker-compose down
