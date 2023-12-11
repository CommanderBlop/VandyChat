
# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy script into the container
COPY . .

# Install the Python dependencies
RUN pip install firebase_admin

# Set the command to run when the container starts
CMD ["python", "match.py"]
