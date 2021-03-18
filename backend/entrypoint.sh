#!/bin/bash
python3 manage.py loaddata product
python3 manage.py runserver 0.0.0.0:8000