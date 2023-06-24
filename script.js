const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = 'YOUR COHORT NAME HERE';
// Use the APIURL variable for fetch requests
// const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
const BASE_URL = 'https://fsa-puppy-bowl.herokuapp.com';



/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {

        const rawData = await fetch(`${BASE_URL}/api/${cohortName}/players`)
        console.log("after fetch")
        console.log(rawData)
        const resultData = await rawData.text()
        console.log("after text")
        console.log(resultData)
        const resultJsonData = JSON.parse(resultData)
        console.log("after JSON")

        // console.log(resultJsonData)
        console.log(resultJsonData.data.players)
        return resultJsonData.data.players;


    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        console.log("inside fetchSinglePlayer")
        // const response = await fetch(`${PARTIES_API_URL}/${id}`);
        const response = await fetch(`${BASE_URL}/api/${cohortName}/players/${playerId}`)
        console.log(response)
        const party = await response.json();
        console.log(party.data.player)
        return party.data.player;
        // return party;

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        
        //use these
        playerList.forEach((dog) => {
            const dogElement = document.createElement("div")
            dogElement.classList.add('playerClass');
            dogElement.innerHTML = `
                <h2>${dog.name}</h2>
                <h4>${dog.breed}</h4>
                <h4>${dog.status}</h4>
                <img src="${dog.imageUrl}" alt="${dog.name}"></img>
                <div>
                <button class="details-button" id="${dog.id}">See Player Details</button>
                
                <button class="delete-button" id="${dog.id}">Delete From Roster</button>
                </div>
                `
            playerContainer.append(dogElement)

            // see details
            const detailsButton = dogElement.querySelector('.details-button');
            detailsButton.addEventListener('click', async (event) => {
                // your code here

                console.log("detail button clicked")

                console.log(event)
                console.log(event.target.id)
                let id = event.target.id;
                
                console.log(id)

                renderSinglePlayerById(id, dogElement)

            });

            // delete player
            const deleteButton = dogElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', async (event) => {
                // your code here
                console.log("delete button clicked")

                console.log(event)
                console.log(event.target.id)
                let id = event.target.id;
                console.log(id)

                //send DELETE API 
                // const response = await removelayer(id)
                // console.log(response)

                // if (response.status === 200) {
                //     console.log("inside 200 if")
                //     dogElement.remove();
                // }

            });

        })

    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}


// render a single player by id
const renderSinglePlayerById = async (id, dogElement) => {
    try {
        if (dogElement.querySelector(".player-details")) {
            return;

        }
        console.log(`inside renderSinglePlayerById, ${id} `)
        // fetch player details from server
        const player = await fetchSinglePlayer(id);
        console.log(player)

        // create new HTML element to display player details
        const playerDetailsElement = document.createElement('div');
        playerDetailsElement.classList.add('player-details');
        playerDetailsElement.innerHTML = `
            <h3>PLAYER:    ${player.name}</h3>
            <h4>ID:        ${player.id}</h4>
            <h4>STATUS:    ${player.status}</h4>
            <h4>BREED:     ${player.breed}</h4>
            <h4>CREATED AT:${player.createdAt}</h4>
            <h4>TEAM_ID:   ${player.teamId}</h4>           
            <h4>COHORT_ID: ${player.cohortId}</h4>
                      
            <button class="close-button">Close</button>
        `;

        // partyContainer.appendChild(partyDetailsElement);
        dogElement.appendChild(playerDetailsElement);

        // add event listener to close button
        const closeButton = playerDetailsElement.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            playerDetailsElement.remove();
        });
    } catch (error) {
        console.error(error);
    }
};



const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();