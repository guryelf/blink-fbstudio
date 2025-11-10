from google.cloud import storage
from ..config import settings

def upload_file(file, filename: str) -> str:
    """
    Uploads a file to Google Cloud Storage and returns the public URL.
    """
    client = storage.Client()
    bucket = client.get_bucket(settings.GCS_BUCKET_NAME)
    blob = bucket.blob(filename)

    blob.upload_from_file(file)

    # For simplicity, we'll make the file publicly accessible.
    # In a real-world application, you would use signed URLs.
    blob.make_public()

    return blob.public_url
