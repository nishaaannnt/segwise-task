from google_play_scraper import Sort, reviews
import json
from datetime import datetime

result, _ = reviews(
   "com.superplaystudios.dicedreams",
    lang='en',  # Language code
    country='us',  # Country code
    sort=Sort.NEWEST,  # Sort reviews by newest first
    count=100,  # Number of reviews to fetch
)

# convert datetime fields to strings in ISO format
for review in result:
    if isinstance(review.get("at"), datetime):
        review["at"] = review["at"].isoformat()
    if isinstance(review.get("repliedAt"), datetime):
        review["repliedAt"] = review["repliedAt"].isoformat()

with open("reviews.json", "w", encoding="utf-8") as file:
    json.dump(result, file, ensure_ascii=False, indent=4)

print("Reviews have been saved to reviews.json")

