#!/bin/bash

W12SCAN_BASE=/opt/w12scan

python3 ${W12SCAN_BASE}/manage.py makemigrations
python3 ${W12SCAN_BASE}/manage.py migrate
python3 ${W12SCAN_BASE}/pipeline/elastic.py
nohup python3 ${W12SCAN_BASE}/manage.py runserver 0.0.0.0:8000 > ${W12SCAN_BASE}/web.log &

/usr/bin/tail -f /dev/null
