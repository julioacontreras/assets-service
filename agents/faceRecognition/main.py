import cv2
from flask import Flask, request

app = Flask(__name__)

@app.post("/remove-bg")
def removeBg():
    body = request.json
    imagePath = body["src"]
    
    # Read the image
    src = cv2.imread(imagePath, 1)
    
    hh, ww = src.shape[:2]

    # threshold on white
    # Define lower and uppper limits
    #lower = src.array([200, 200, 200])
    #upper = src.array([255, 255, 255])

    # Create mask to only select black
    #tmp = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    #_,alpha = cv2.threshold(tmp,0,255,cv2.THRESH_BINARY)

    # apply morphology
    #kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (20,20))
    #morph = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, kernel)

    # invert morp image
    #mask = 255 - morph

    # apply mask to image
    #result = cv2.bitwise_and(src, src, mask=mask)

    # save results
    #cv2.imwrite('photo_lower.jpg', lower)
    #cv2.imwrite('pills_morph.jpg', morph)
    #cv2.imwrite('pills_mask.jpg', mask)
    #cv2.imwrite('pills_result.jpg', result)
    return {}

@app.post("/face-recognition")
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