FROM node:16 AS build-stage

WORKDIR /mello-client
COPY mello-client/. .

# You have to set this because it should be set during build time.
ARG REACT_APP_BASE_URL

# Build our React App
RUN npm install
RUN npm run build


FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .
COPY --from=build-stage /mello-client/build/* app/static/

RUN flask db upgrade
RUN flas seed all 

CMD gunicorn app:app

