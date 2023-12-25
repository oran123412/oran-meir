let likedCountries = [];

const getData = () => {
    let data = localStorage.getItem('countries');

    if (!data) {
        localStorage.setItem('countries', JSON.stringify(likedCountries));
        data = localStorage.getItem('countries');
    }

    likedCountries = JSON.parse(data);
}

const updateData = (countryName) => {
    if (likedCountries.includes(countryName)) {
        let filtered = likedCountries.filter((item) => {
            return item != countryName
        });
        likedCountries = filtered;
    } else {
        likedCountries.push(countryName);
    }
    localStorage.setItem('countries', JSON.stringify(likedCountries));
     updateUI();
}

const updateUI = () => {
    const cards = document.getElementById("cards").children;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const countryName = card.querySelector('.card-title').textContent;
        const heart = card.querySelector('.fa-heart');

        if (likedCountries.includes(countryName)) {
            heart.classList.add('text-danger');
        } else {
            heart.classList.remove('text-danger');
        }
    }
}
window.onload = () => {
    getData(); 
    createCardsList(); 
    updateUI(); 
};

export { likedCountries, getData, updateData };