import cv2
from flask import Flask, request

app = Flask(__name__)

@app.post("/")
def findFaces():
    body = request.json
    print(body["src"])
    # Get user supplied values
    imagePath = body["src"]
    cascPath = "models/haarcascade_frontalface_default.xml"

    # Create the haar cascade
    faceCascade = cv2.CascadeClassifier(cascPath)

    # Read the image
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(120, 120)
        #flags = cv2.CV_HAAR_SCALE_IMAGE
    )

    result = {
        "faceCount": len(faces) 
    }

    return result