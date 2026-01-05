import requests

BASE_URL = "http://localhost:8000"

def test_execution():
    # 1. Login to get token
    print("Logging in...")
    login_response = requests.post(f"{BASE_URL}/token", data={
        "username": "auth_user", # Using the user created in previous step
        "password": "secret"
    })
    
    if login_response.status_code != 200:
        print(f"Login failed: {login_response.text}")
        return

    access_token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {access_token}"}

    # 2. Test Safe Code
    print("\nTesting Safe Code...")
    code_safe = "print('Hello from Python Runner!')\nprint(2 + 2)"
    response = requests.post(f"{BASE_URL}/execute", json={"code": code_safe, "language": "python"}, headers=headers)
    print(f"Response: {response.json()}")

    # 3. Test Timeout (Infinite Loop)
    print("\nTesting Timeout...")
    code_timeout = "while True: pass"
    response = requests.post(f"{BASE_URL}/execute", json={"code": code_timeout, "language": "python"}, headers=headers)
    print(f"Response: {response.json()}")

    # 4. Test Error
    print("\nTesting Syntax Error...")
    code_error = "print('Unclosed string"
    response = requests.post(f"{BASE_URL}/execute", json={"code": code_error, "language": "python"}, headers=headers)
    print(f"Response: {response.json()}")

if __name__ == "__main__":
    test_execution()
