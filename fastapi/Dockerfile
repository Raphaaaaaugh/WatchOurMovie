# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory to /fastapi
WORKDIR /fastapi

# Copy the current directory contents into the container at /fastapi
COPY . /fastapi

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Run main.py when the container launches
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
