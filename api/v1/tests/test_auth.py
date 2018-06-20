import pytest
import json
from flask import url_for

from app import create_app
 
SIGNUP_URL = '/api/v1/auth/register'
data = {
    "username":"quantum",
    "email": "Quan@gma.com",
    "address": "3343312",
    "password": "12345678",
    "confirm_password": "12345678",
    "role":"driver"
}

@pytest.fixture
def app():
    app = create_app('testing')
    return app.test_client()


def test_user_sends_get_registration(app):
    res = app.get(SIGNUP_URL)
    assert res.status_code == 200
    assert  b"please Register" in res.data

def test_user_send_post_registration (app):
    res = app.post(SIGNUP_URL, data=json.dumps(data),
                   content_type = 'application/json')
    assert res.status_code == 201
    assert b"successfully" in res.data

def test_user_send_post_registration_empty_fields (app):
    res = app.post(SIGNUP_URL, data=json.dumps({
                   "username":"",
                   "email": "",
                   "address": "",
                   "password": "",
                   "confirm_password": "",
                   "role":""}),
                   content_type = 'application/json')
    assert res.status_code == 400
    assert b"Failed you cannot submit empty fields" in res.data

def test_user_send_post_registration_incorrect_email (app):
    res = app.post(SIGNUP_URL, data=json.dumps({
                   "username":"quantum",
                   "email": "quan",
                   "address": "122kitale",
                   "password": "12345678",
                   "confirm_password": "12345678",
                   "role":"driver"}),
                   content_type = 'application/json')
    assert res.status_code == 400
    assert b"Enter correct email format" in res.data

def test_user_send_post_registration_short_password (app):
    res = app.post(SIGNUP_URL, data=json.dumps({
                   "username":"quantum",
                   "email": "quan@gmail.com",
                   "address": "122kitale",
                   "password": "1",
                   "confirm_password": "1",
                   "role":"driver"}),
                   content_type = 'application/json')
    assert res.status_code == 400
    assert b"short password.Enter atleast 6 characters" in res.data

    

