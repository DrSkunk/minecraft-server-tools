# FROM mohaseeb/raspberrypi3-python-opencv:latest
FROM python:3

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY "main.py" /
CMD [ "python", "main.py" ]