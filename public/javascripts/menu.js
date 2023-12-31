let content = "";
let searchPlaceholder = "Search";

function changeCategory(category) {
    const all = document.querySelectorAll('.category-row');
    all.forEach(row => {
        row.style.display = 'none';
    });

    // Show the selected category row
    const specific = document.getElementById(`${category}-category`);
    if (specific) {
        specific.style.display = 'block';
    }

    if (category === 'drink') {
        content = "<h3 class='fw-bold text-center mt-5'>Drink</h3>";
        searchPlaceholder = "Search for Drinks";
    } else if (category === 'fries') {
        content = "<h3 class='fw-bold text-center mt-5'>Fries</h3>";
        searchPlaceholder = "Search for Fries";
    } else if (category === 'salad') {
        content = "<h3 class='fw-bold text-center mt-5'>Salad</h3>";
        searchPlaceholder = "Search for Salads";
    } else if (category === 'fast') {
        content = "<h3 class='fw-bold text-center mt-5'>Fast Food</h3>";
        searchPlaceholder = "Search for Fast Foods";
    } else if (category === 'soup') {
        content = "<h3 class='fw-bold text-center mt-5'>Soup</h3>";
        searchPlaceholder = "Search for Soups";
    } else if (category === 'curry') {
        content = "<h3 class='fw-bold text-center mt-5'>Curry</h3>";
        searchPlaceholder = "Search for Curries";
    }

    document.getElementById('changeCategory').innerHTML = content;

    let searchInput = document.getElementById('searchInput');
    // Update the placeholder of the search input
    searchInput.placeholder = searchPlaceholder;

    searchInput.addEventListener('input', searchItem);
}

changeCategory('drink');

function searchItem() {
    const searchTerm = document.getElementById('searchInput');
    const filter = searchTerm.value.toLowerCase();
    const currentData = document.querySelectorAll('.category-row .con');

    currentData.forEach(each => {
        const name = each.querySelector('.card-title b').textContent.toLowerCase();
        const price = each.querySelector('.card-price').textContent.toLowerCase();

        if (name.includes(filter) || price.includes(filter)) {
            each.style.display = 'block';
        } else {
            each.style.display = 'none';
        }
    });
}

function showMore(category) {
    const items = document.querySelectorAll(`.${category}`);
    const hidden = Array.from(items).filter(item => item.style.display === 'none');

    hidden.slice(0, 8).forEach(item => {
        item.style.display = 'block';
    })

    if (hidden.length <= 8) {
        this.style.display = 'none';
    }
}


// Hardcoding :(
const categories = ['Drink', 'Curry', 'Fries', 'Salad', 'Fast', 'Soup', 'Special'];
categories.forEach((category) => {
    document.querySelectorAll(`.${category}`).forEach((item, index) => {
        if (index >= 8) {
            item.style.display = 'none';
        }
    });
})
