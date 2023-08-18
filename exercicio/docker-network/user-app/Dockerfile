FROM python:3.9-slim

WORKDIR /app

COPY user.py .

RUN pip install mysql-connector-python

CMD ["python", "user.py"]