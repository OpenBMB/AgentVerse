import requests

requests.post('http://127.0.0.1:10002/make_decision', headers={'Content-Type': 'application/json'}, json={'agent_ids': [0, 1, 2, 3, 4, 5]})
# requests.post('http://127.0.0.1:10002/chat', headers={'Content-Type': 'application/json'}, json={'content': 'Hi!', 'receiver': 'May', 'receiver_id': 0, 'sender': 'Brendan'})
