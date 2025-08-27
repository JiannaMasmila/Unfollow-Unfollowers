async function fetchJSON(path) {
  const res = await fetch(`https://r.jina.ai/https://www.instagram.com/api/v1/${path}`);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`request failed with ${res.status}: ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(text.slice(0, 100));
  }
}

async function collectUsers(id, type) {
  let users = [];
  let next = '';
  do {
    const data = await fetchJSON(`friendships/${id}/${type}/?count=1000&max_id=${next}`);
    users = users.concat(data.users);
    next = data.next_max_id || '';
  } while (next);
  return users;
}

async function getUnfollowers(username) {
  const info = await fetchJSON(`users/web_profile_info/?username=${username}`);
  const id = info.data.user.id;
  const [followers, following] = await Promise.all([
    collectUsers(id, 'followers'),
    collectUsers(id, 'following')
  ]);
  const followerSet = new Set(followers.map(u => u.username));
  return following.filter(u => !followerSet.has(u.username)).map(u => u.username);
}

document.getElementById('check-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const raw = document.getElementById('profile').value.trim();
  const username = raw.split('/').filter(Boolean).pop();
  const list = document.getElementById('results');
  list.innerHTML = '<li>Loading...</li>';
  try {
    const unfollowers = await getUnfollowers(username);
    if (!unfollowers.length) {
      list.innerHTML = '<li>No unfollowers found</li>';
    } else {
      list.innerHTML = unfollowers.map(u => `<li>${u}</li>`).join('');
    }
  } catch (err) {
    list.innerHTML = `<li>Error: ${err.message}</li>`;
  }
});
