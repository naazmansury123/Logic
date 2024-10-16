
document.getElementById('search-btn').addEventListener('click', fetchGitHubUser);

function fetchGitHubUser() {
    const username = document.getElementById('username').value.trim(); 

    if (username === '') {
        alert('Please enter a GitHub username');
        return; 
    }

    const apiUrl = `https://api.github.com/users/${username}`; 
    
    console.log("Fetching data from URL: ", apiUrl);

    fetch(apiUrl, {
        method: 'GET'
        // No Authorization header needed
    })
    .then(response => {
        console.log("Response object:", response);
        if (!response.ok) {
            throw new Error('User not found');
        }
        return response.json();
    })
    .then(data => {
        console.log("Data received:", data);
        displayUserInfo(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error.message); 
        document.getElementById('user-info').innerHTML = `<p>${error.message}</p>`;
    });
}

function displayUserInfo(user) {
    const userInfo = `
        <img src="${user.avatar_url}" alt="Avatar of ${user.login}" style="width: 150px; border-radius: 50%;">
        <p><strong>Name:</strong> ${user.name ? user.name : 'N/A'}</p>
        <p><strong>Username:</strong> <a href="${user.html_url}" target="_blank">${user.login}</a></p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Bio:</strong> ${user.bio ? user.bio : 'N/A'}</p>
    `;
    document.getElementById('user-info').innerHTML = userInfo;
}
