# unfinished

FROM python:3.6

ADD . ./code
VOLUME downloads

WORKDIR /code

RUN apt install libffi-dev

RUN pip install pipenv
RUN pipenv install --system
RUN pipenv install

CMD pipenv run python index.py
