from joblib import load
from math import cos
from math import pi
from math import radians
from math import sin
import numpy as np
import calendar
from os import path


estimator_file_name = 'best_estimator.joblib'
column_transformer_file_name = 'column_transformer.joblib'

current_path = path.dirname(path.realpath(__file__))
estimator_path = path.abspath(path.join(current_path, estimator_file_name))
column_transformer_path = path.abspath(path.join(current_path, column_transformer_file_name))

model = load(estimator_path)
column_transformer = load(column_transformer_path)


def _transform_coordinates(
  latitude,
  longitude
):
  latitude = radians(latitude)
  longitude = radians(longitude)

  x = cos(latitude) * cos(longitude)
  y = cos(latitude) * sin(longitude)
  z = sin(latitude)

  return (x, y, z)


def _transform_time(time):
  seconds_in_day = 24 * 60 * 60
  
  seconds = (time.hour * 60 + time.minute) * 60 + time.second
  
  sin_time = sin((2 * pi * seconds) / seconds_in_day)
  cos_time = cos((2 * pi * seconds) / seconds_in_day)
  return (sin_time, cos_time)


def _transform_input(
  dt,
  latitude,
  longitude
):
  sin_time, cos_time = _transform_time(dt.time())
  x, y, z = _transform_coordinates(latitude, longitude)

  input_to_transform = [[
    calendar.day_name[dt.weekday()],
    dt.year,
    x,
    y,
    z,
    sin_time,
    cos_time,
  ]]

  return column_transformer.transform(input_to_transform)


def predict(
  dt,
  latitude,
  longitude
):
  '''
  :param dt:
  :type: datetime.datetime
  :param latitude:
  :type: float
  :param longitude:
  :type: float
  
  :rtype: bool
  '''
  input = _transform_input(dt, latitude, longitude)
  return model.predict(input)[0]
