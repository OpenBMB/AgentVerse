```
# Body of room data. Each room has unique roomID
rooms/
    <roomID>
        # users in this room.
        users/
            <joinAt>
                userID - Unique ID of user
                userName - The name of the user

        broadcast/
            - `message` - Message
            - `senderID` - Unique ID of sender
	        - `senderName` - Name of sender
	        - `stamp` - Toggle between true and false        

        table/
            - <key0>
                - <key1>
                    - <key2> : value
```