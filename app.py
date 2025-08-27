import re
from flask import Flask, render_template, request
import instaloader

app = Flask(__name__)


def extract_username(url: str) -> str | None:
    """Extract the Instagram username from a profile URL."""
    match = re.search(r"instagram\.com/([^/?#]+)", url)
    return match.group(1) if match else None


def get_unfollowers(username: str) -> list[str]:
    """Return a sorted list of accounts the user follows who don't follow back."""
    loader = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(loader.context, username)
    followers = {f.username for f in profile.get_followers()}
    following = {f.username for f in profile.get_followees()}
    return sorted(following - followers)


@app.route("/", methods=["GET", "POST"])
def index():
    unfollowers = []
    error = None
    if request.method == "POST":
        profile_url = request.form.get("profile_url", "")
        username = extract_username(profile_url)
        if not username:
            error = "Invalid profile link"
        else:
            try:
                unfollowers = get_unfollowers(username)
            except Exception as exc:  # pragma: no cover - network operation
                error = str(exc)
    return render_template("index.html", unfollowers=unfollowers, error=error)


if __name__ == "__main__":
    app.run(debug=True)
