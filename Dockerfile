FROM python:3.10

# Prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y default-mysql-client

# Install dependencies
COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .
# Dockerfile
RUN pip install twilio django-cors-headers