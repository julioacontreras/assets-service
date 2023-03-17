FROM continuumio/anaconda3
EXPOSE 5000

ADD . /faceRecognition
WORKDIR faceRecognition
RUN conda install opencv flask

CMD ["flask", "--app=main run"]
