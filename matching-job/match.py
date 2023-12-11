#!/usr/bin/env python3.11

from random import shuffle
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Check the number of repeated matches in the given set of matches
def check_repeat(matches, users_dict):
    repeat = 0
    for match in matches:
        (player1, player2) = match
        # Check if player2 has been previously matched with player1
        if player2 in users_dict[player1]:
            repeat += 1
        # Check if player1 has been previously matched with player2
        if player1 in users_dict[player2]:
            repeat += 1
    return repeat

# Create random matches from a list of users
def random_match(users):
    shuffle(users)
    matches = []
    for i in range(0, len(users), 2):
        match_pair = (users[i], users[i+1])
        matches.append(match_pair)
    
    return matches

# Find the best-effort match with the least repeated pairs
def best_effort_match(users, users_dict):
    repeat = 999 # Initialize repeat count to a high value
    iters = 0           
    seed_match = None # Seed match for odd number of users
    all_matching = []   
    all_repeats = []

    # Handle odd number of users
    if len(users) % 2 != 0:
        rest_users = users[:-1]
        seed_user = users[-1]
        # Find a match for the seed_user that minimizes repeats
        for usr in rest_users:
            if usr not in users_dict[seed_user]:
                seed_match = (seed_user, usr)
    else:
        rest_users = users
    # Continue generating random matches until 
    # either repeat is 0 or iterations exceed 1000
    while repeat > 0 and iters < 1000:
        iters += 1
        matching = random_match(rest_users)
        # Add the seed_match if it exists
        if seed_match != None:
            matching.append(seed_match)
        repeat = check_repeat(matching, users_dict)
        # Add this iteration to both result lists
        all_matching.append(matching)
        all_repeats.append(repeat)
    # Find the index of the matching with the minimum repeat count
    result_idx = all_repeats.index(min(all_repeats))
    return (all_matching[result_idx], all_repeats[result_idx], iters)

# Get users' dictionary that maps uid to the previous matching list
def set_users_dictionary(docs):
    users_dict = {}
    for doc in docs:
        users_dict[doc.id] = []
        prev_match = doc.to_dict()["previousMatch"]
        if len(prev_match) != 0:
            for usr in prev_match:
                users_dict[doc.id].append(usr["uid"])
        # Set all user's current match to empty
        print(f"{doc.id} => {doc.to_dict()}")
    return users_dict
        
# Get matched user's info (uid, firstName, lastName, email) from the database
def get_matched_user_info(usr_ref):
    usr = usr_ref.get().to_dict()
    usr_info = {
        "uid": usr_ref.id,
        "firstName": usr["firstName"],
        "lastName": usr["lastName"],
        "email": usr["email"]
    }
    return usr_info

#### FOR TESTING ONLY ####
# Reset all the matching history in the database
def reset_all_matching_history(users_dict, doc_ref):
    for uid in users_dict:
        doc_ref.document(uid).update({"currentMatch": []})
        doc_ref.document(uid).update({"previousMatch": []})
#### FOR TESTING ONLY ####


def main():    
    # Fetch the service account key JSON file contents
    cred = credentials.Certificate('vandychat-4cddb-firebase-adminsdk-5iok4-ede1793cef.json')

    # Initialize the app with a service account, granting admin privileges
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'vandychat-4cddb.firebaseapp.com'  # Replace with your Database URL
    })

    db = firestore.client()

    # We are fetching data from a database path "users"
    doc_ref = db.collection('users')
    docs = doc_ref.stream()
    
    # Set up users' dictionary and users' list
    users_dict = set_users_dictionary(docs)
    users_list = list(users_dict.keys())
    
    # Reeeset all user's current match field
    for uid in users_dict:
        doc_ref.document(uid).update({"currentMatch": []})
    
    matchings, repeat, iters = best_effort_match(users_list, users_dict)
    print(f"after {iters} times of matching, find new matching {matchings} with repeat {repeat}")

    # Update database
    for match in matchings:
        (uid1, uid2) = match        
        # get the info of the matched users
        usr1_ref = doc_ref.document(uid1)
        usr2_ref = doc_ref.document(uid2)
        matchedUser1 = get_matched_user_info(usr1_ref)
        matchedUser2 = get_matched_user_info(usr2_ref)
        # update previous match
        usr1_ref.update({"previousMatch": firestore.ArrayUnion([matchedUser2])})
        usr2_ref.update({"previousMatch": firestore.ArrayUnion([matchedUser1])})
        # update current match
        usr1_ref.update({"currentMatch": firestore.ArrayUnion([matchedUser2])})
        usr2_ref.update({"currentMatch": firestore.ArrayUnion([matchedUser1])})


    #### FOR TESTING ONLY ####
    # Uncomment this field to reset everything
    # reset_all_matching_history(users_dict, doc_ref)
    #### FOR TESTING ONLY ####


if __name__ == '__main__':
    main()
