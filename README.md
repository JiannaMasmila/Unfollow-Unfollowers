# Unfollow-Unfollowers

A simple Flask web app that checks which accounts a public Instagram profile follows that do not follow back.

## Running locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the development server:
   ```bash
   python app.py
   ```
3. Open `http://localhost:5000` in your browser and submit a public profile link.

This project uses [Instaloader](https://instaloader.github.io/) to fetch follower and following lists. Scraping Instagram data may be subject to Instagram's terms of service.
