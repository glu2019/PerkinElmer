FROM python:3.8.0b1-stretch
RUN apt-get update
EXPOSE 8080
RUN mkdir /usr/local/PerkinElmer
RUN mkdir /usr/local/PerkinElmer/backend/
WORKDIR /usr/local/PerkinElmer/backend/

COPY requirements.txt /usr/local/PerkinElmer/backend/
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . /usr/local/PerkinElmer/backend/
ENTRYPOINT ["sh", "/usr/local/PerkinElmer/backend/entrypoint.sh"]