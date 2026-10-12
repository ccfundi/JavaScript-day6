// 1. Select DOM elements
const searchInput = document.getElementById("search-input")
const userList = document.getElementById("user-list")

// 2. Global state to store fetched users
let allUsers = []

// 3. Fetch users from public JSONPlaceholder API
const fetchUsers = async () =>{
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users")

        if (!response.ok) {
            throw new Error("Failed to fetch user directory")
        }

        allUsers = await response.json()
        renderUsers(allUsers) // Display all users initially
    }
    catch (error) {
        console.error("Error:", error)
        userList.innerHTML = `<p class="loading" style="color: red;">Could not load user data.</p>`
        return
    }
}

// 4. Render users array to the DOM using .map()
const renderUsers = (usersToRender) =>{
    if (usersToRender.length === 0){
        userList.innerHTML = `<p class="loading">No matching users found.</p>`
        return
    }

    // Use .map() to transform each user object into an HTML string card
    const cardsHTML = usersToRender.map(user =>{
        return `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p>📧 ${user.email}</p>
            <p>📞 ${user.phone}</p>
            <p>🌐 ${user.website}</p>
        </div>
        `
    }).join("") // .join("") converts the array of strings into one big HTML string

    userList.innerHTML = cardsHTML
}

// 5. Real-Time Search Event Listener
searchInput.addEventListener("input", (e) =>{
    const searchTerm = e.target.value.toLowerCase().trim();

    // Use .filter() to find users whose name or email includes the search term
    const filteredUsers = allUsers.filter(user =>{
        const nameMatch = user.name.toLowerCase().includes(searchTerm)
        const emailMatch = user.email.toLowerCase().includes(searchTerm)

        return nameMatch || emailMatch
    })

    // Re-render the UI with the filtered list instantly
    renderUsers(filteredUsers)
})

// Run fetch on initial load
fetchUsers()