run:
	docker-compose up -d

run-attached:
	docker-compose up

stop:
	docker-compose down

reload:
	make stop
	make run

console:
	docker exec -it toastinit_blog /bin/sh

logs:
	docker logs --follow toastinit_blog
