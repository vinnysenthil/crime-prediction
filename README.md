# SF Crime Predictor

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