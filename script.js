// Cookie Clicker Game 

    let cookieCount = 0;  //To Track the number of cookies for the player
    let cookieUpdate = 1; // To add cookie per click
    //Fetching elements from HTML by ID
    const cookie = document.getElementById('cookieImage');
    const cookieInfo = document.getElementById('cookieInfo');
    const updateSection = document.getElementById('updateSection');
    // Load data from locale storage
function loadLocalStorage(){
    if (localStorage.getItem('cookieCount')){
        cookieCount = parseInt(localStorage.getItem('cookieCount'));}
    if (localStorage.getItem('cookieUpdate')){
        cookieUpdate = parseInt(localStorage.getItem('cookieUpdate'));}
}
    // To update and show player the current cookies 
function updateUI() {
    cookieInfo.innerText = `cookies: ${cookieCount}, Cookies Per Click: ${cookieUpdate}`; 
        localStorage.setItem('cookieCount', cookieCount);
        localStorage.setItem('cookieUpdate', cookieUpdate);  
}
    // Adding an event listener for clicking the cookie and increase by one
cookieImage.addEventListener('click', function(){
    cookieCount += cookieUpdate;
    updateUI();
})
    // Increase cookie per second automatically 
function increaseCookiePs(){
    cookieCount += cookieUpdate;
    updateUI();
}
    setInterval(increaseCookiePs, 1000);
    // Fetching the cookies array from API link 
async function fetUpgrades() {
        const response = await fetch(`https://cookie-upgrade-api.vercel.app/api/upgrades`);
        const upgrades = await response.json();
        displayUpgrades(upgrades);
}

    // Loop for each element in the upgrade array
function displayUpgrades(upgrades){
    upgrades.forEach(element => {
        const upgradeContainer = document.createElement('div');
        const upgradeInfo = document.createElement('span');
        upgradeInfo.innerText = `${element.name} - Cost: ${element.cost}, Increase: ${element.increase} `;
        const buyButton = document.createElement('button');
        buyButton.innerText = 'Buy';

// An event listener to upgrade the purchasing
buyButton.addEventListener('click', function(){
    if (cookieCount >= element.cost){
        cookieCount -= element.cost;
        cookieUpdate += element.increase;
        updateUI();
        upgradeInfo.innerText = `${element.name}(purchased)`;
    } else {
        alert(' You do not have enough cookies');
    }
});
        upgradeContainer.appendChild(upgradeInfo);
        upgradeContainer.appendChild(buyButton);
        updateSection.appendChild(upgradeContainer);
});
}

fetUpgrades();
updateUI();

