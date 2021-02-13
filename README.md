# PerkinElmer

## Setup local environment

### Run both frontend and backend with docker:

1. git clone https://github.com/glu2019/geotab.git
2. Run docker-compose build
3. Run docker-compose up (please make sure the ports 80, 8080 and 3000 are open.)
4. To run it permernantly: docker-compose up -d
4. visit localhost or 127.0.0.1, you will see the sudoko board. 

### Run frontend and backend seperately

Frontend:
With docker:
1. docker-compose build
2. Run docker-compose up or docker run –it –p 3000:3000 sudoku-spa:level-4
3. visit localhost:3000

Without docker
1. cd frontend
2. npm install
3. npm run build (production) or npm run start(development)

Backend:
With docker
1. docker-compose build
2. Run docker-compose up or docker run –it –p 8080:8080 sudoku-ws:level-4
3. Visit localhost:8080

Without docker
1. Install python3.6.8
2. cd backend
3. Create a virtual environment:
```bash
python3.6 -m venv env
```
4. Activate virtual environment
```bash
source env/bin/activate
```
5. Run pip install:
```bash
pip3.6 install -r requirements.txt 

5. Run server:
```bash
python3.6 manage.py runserver 0:8080
```
6. Visit localhost:8080

Configure with nginx: 
1. copy the following codes to /etc/nginx/conf.d

```
server {
   listen   8000;
   server_name _;
   proxy_buffering off;
   client_max_body_size 4G;
	
   location / {
       proxy_pass http://localhost:3000;
   }

   location ~/rest-api/ {
       proxy_pass http://localhost:8080;
   }
}
```
2. restart nginx:
```bash
sudo service nginx restart
```