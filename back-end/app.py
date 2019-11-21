from flask import Flask, request
from model.model import predict
import os, requests, datetime
from dateutil import parser
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello, this is the SF Crime Prediction Backend"

@app.route("/address", methods=["POST"])
def address_to_result():
    '''
    Request Params
        address    [string]  An address or point of interest in San Francisco
        time       [string]  Time of day in PST
        year       [int]     Year of interest
    Succesful Response (200)
        is_safe    [boolean] Is violent crime likely or not?
    Unsuccessful Response (404, 422)
        err_msg    [string]  Reason for error
    '''
    req = request.get_json()

    if "address" not in req or "dt" not in req:
        return "Please provide an address and datetime in SF!", 422

    api_params = {
        'key': os.getenv('SFCRIME_API_KEY'),
        'address': req['address']
    }

    api_response = requests.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    params=api_params)

    if api_response.status_code != 200:
        return "Google Maps can't find the coordinates", 404
    
    api_data = api_response.json()
    location = api_data['results'][0]['geometry']['location']
    lat, lng = location['lat'], location['lng']
    coordinates = "(" + str(lat) + ", " + str(lng)+")"
    
    print(req['address'])
    print(coordinates)
    print(parser.parse(req['dt']))

    return str(predict(parser.parse(req['dt']), lat, lng)), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003, debug=True)