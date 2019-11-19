from flask import Flask, request
import os, requests

app = Flask(__name__)

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

    if "address" not in req or "san francisco" not in req['address'].lower():
        return "Please provide an address in SF!", 422
    
    if "time" and "year" not in req:
        return "Must provide a time and year", 422

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

    return coordinates, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3003, debug=True)