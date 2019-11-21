# SF Crime Predictor 🔮
**Figure out if a given time and place in SF is safe or not. The applied-ML model is based on [millions of incident reports](https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-Historical-2003/tmnf-yvry) across 15 years made public by the San Francisco Police Department.**

## Preprocessed Dataset
https://drive.google.com/open?id=1JddXMyapWG0qLpecVmBYc3jgS0cdJ3za

## Requirements
- Python 3
- `npm`
- Google Maps Geocoding API Key

## Getting Started
1. Install dependencies in both services
    - `cd front-end` and `npm i`
    - `cd back-end` and `pip3 install -r requirements.txt`

2. Export Google Maps API Key and start up Flask backend
    ```
    $ cd back-end
    $ export SFCRIME_API_KEY='<Your Google Maps API here>'
    $ python3 app.py
    ```

3. Export API Key again and start up React frontend
    ```
    $ cd front-end
    $ export REACT_APP_SFCRIME_API_KEY='<Your Google Maps API here>'
    $ npm start
    ```

### The app should be running on http://localhost:3000
