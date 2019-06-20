# stockservice


Assumptions/Consideration
1. API insertion time is used as timestamp assuming the stock timestamp is equal to insertion time
2. Get stock service will remove timeslots in queue that are older than 10mins to reduce memory footprint
3. Processing time can complete within 1 min interval
4. Assume all incoming JSONs are formatted properly
5. Less than 100,000 item per 1 min queue - ... spread operator upper limit. Larger data will require redis/database
6. Spillover edge case some records may process microseconds before the next timeslot and end 1 timeslot after

