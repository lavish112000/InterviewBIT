import requests

BASE_URL = "http://localhost:8000"

def test_auth():
    # 1. Register
    username = "testuser_v2"
    email = "test_v2@example.com"
    password = "password123"
    
    print(f"Registering user: {username}")
    reg_response = requests.post(f"{BASE_URL}/register", json={
        "username": username,
        "email": email,
        "password": password
    })
    
    if reg_response.status_code == 200:
        print("Registration successful!")
        print(reg_response.json())
    else:
        print(f"Registration failed: {reg_response.text}")
        if "Email already registered" in reg_response.text:
            print("User already exists, proceeding to login...")

    # 2. Login
    print("\nLogging in...")
    login_response = requests.post(f"{BASE_URL}/token", data={
        "username": username,
        "password": password
    })
    
    if login_response.status_code == 200:
        token_data = login_response.json()
        print("Login successful!")
        access_token = token_data["access_token"]
        print(f"Token: {access_token[:20]}...")
        
        # 3. Get Me
        print("\nFetching current user...")
        me_response = requests.get(f"{BASE_URL}/users/me", headers={
            "Authorization": f"Bearer {access_token}"
        })
        print(f"User Profile: {me_response.json()}")
    else:
        print(f"Login failed: {login_response.text}")

if __name__ == "__main__":
    test_auth()
