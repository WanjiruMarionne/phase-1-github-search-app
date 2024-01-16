document.addEventListener('DOMContentLoaded', function () {
    // Activating DOM Elements by adding event listeners
    // Identifying the DOM Elements
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userContainer = document.getElementById('github-container');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    // Add Event Listeners
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = searchInput.value.trim();

        if (username === '') {
            alert('Please enter username.');
        } else {
            // Fetch and display a user
            searchUsers(username);

            // Fetch and display a user's repos
            searchRepos(username);
        }
    });

    function searchUsers(username) {
        fetch(`https://api.github.com/search/users?q=${username}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                fetchedUsers(data.items);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    function fetchedUsers(users) {
        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = '';

        if (users.length === 0) {
            userListContainer.innerHTML = 'No users found.';
            return;
        }

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login} avatar">
                <p>Username: ${user.login}</p>
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;

            listItem.addEventListener('click', () => searchRepos(user.login));

            userListContainer.appendChild(listItem);
        });
    }

    function searchRepos(username) {
        fetch(`https://api.github.com/search/repositories?q=${username}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                fetchedUserRepos(data.items);
            })
            .catch(error => console.error('Error fetching repos:', error));
    }

    function fetchedUserRepos(repos) {
        reposList.innerHTML = '';

        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href='${repo.html_url}' target='_blank'>${repo.full_name}</a>`;
            reposList.appendChild(listItem);
        });
    }
});