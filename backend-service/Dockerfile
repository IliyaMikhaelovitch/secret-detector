FROM python:3.8-slim

# Set work directory
WORKDIR /app

# Copy backend code
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5050

# Run the app
CMD ["python", "app.py"]