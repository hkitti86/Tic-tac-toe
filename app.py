from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

conn = psycopg2.connect(
    dbname="sxuuxwmi",
    user="sxuuxwmi",
    password="my_password",
    host="server_name",
    port="5000"
)

@app.route("http://localhost:3000", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    cursor = conn.cursor()
    cursor.execute("SELECT id, password_hash FROM users WHERE username = %s", (username,))
    user_data = cursor.fetchone()
    cursor.close()

    if user_data is not None and bcrypt.checkpw(password.encode('utf-8'), user_data[1].encode('utf-8')):
        return jsonify({"message": "Login successful", "user_id": user_data[0]})
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

if __name__ == "__main__":
    app.run(debug=True)
