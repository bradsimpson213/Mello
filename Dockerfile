FROM node:12.18.2-alpine as build

COPY /mello-client /mello-client

WORKDIR /mello-client

RUN npm install && npm run build

FROM python:3.8.2-alpine

EXPOSE 5000
# Installs psycopg2
# Was having issues installing directly from the pipfile, looking for pg_config
# This command adds some build dependencies that we can later remove and adds
# postgres (where the pg_config comes from) as well as psycopg
# Installing here first let me install the requirements.
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2-binary \
    && apk del build-deps
RUN pip install pipenv
# Copies over the Pipfile and Pipfile.lock in order to set up our app requirements
COPY /mello-server/Pipfile* ./
# Creates a requirements.txt file based on our pipfile. This is part of the solution
# to getting psycopg installed (it wasn't installed by pipenv, rather by pip), so
# I'm adding in the other dependencies with pip as well, which uses requirements.txt
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt
# After our environment is set up, copies over the server files
# This is just an optimization instead of copying over everything in the previous command.
# With this implementation, if we change code in our server files, our previous layers
# are not affected and we do not need to install our dependencies again - we use the cached image.
# If we were to copy everything over in the previous copy, everything would work as
# expected, but whenever we made changes to our server and rebuilt our image, the
# installation step would run again.
COPY /mello-server .
# Copy over the compiled React code from our first build phase, allowing our
# server to serve up the static assets in production
COPY --from=build /mello-client/build /mello-client/build
# Runs our script, which sets environment variables, runs any pending migrations
# on our database, and starts up our flask app
ENTRYPOINT [ "./docker-entrypoint.sh" ]
