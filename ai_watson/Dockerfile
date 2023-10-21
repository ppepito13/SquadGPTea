FROM python:latest

RUN apt-get update && apt-get install \
  -y --no-install-recommends python3 python3-virtualenv

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m virtualenv --python=/usr/bin/python3 $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY ./requirements.txt /req/requirements.txt
RUN pip install -r /req/requirements.txt
RUN rm /req/requirements.txt

COPY ./server.py /app/server.py
COPY ./watson.py /app/watson.py

RUN chmod +x /app/server.py

WORKDIR /app
            
EXPOSE 8000

CMD [ "python", "server.py" ]


