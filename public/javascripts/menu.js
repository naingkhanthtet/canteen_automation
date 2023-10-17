changeCategory('Drink');

function changeCategory(category) {
    let content = "";
    let searchPlaceholder = "Search";
    console.log(categoryData);

    // Assuming you have a data structure like this with items for each category
    // const categoryData = {
    //     'Drink': [
    //         {
    //             name: 'Iced Mocha',
    //             description: 'Bitter and Milky',
    //             price: '3,000 MMK',
    //             image: 'public/img/iced Mocha.jpeg'
    //         },
    //     ],
    //
    //     'Fried': [
    //         {
    //             name: 'Crispy Chicken',
    //             description: 'Juicy and Crunchy',
    //             price: '4,500 MMK',
    //             image: '../img/crispy chicken.jpeg'
    //         },
    //     ],
    //
    //     'Salad': [
    //         {
    //             name: 'Crispy Chicken',
    //             description: 'Juicy and Crunchy',
    //             price: '4,500 MMK',
    //             image: '../img/crispy chicken.jpeg'
    //         },
    //     ],
    //
    //     'Fast_Food': [
    //         {name: 'Iced Mocha', description: 'Bitter and Milky', price: '3,000 MMK', image: '../img/iced Mocha.jpeg'},
    //     ],
    //
    //     'Soup': [
    //         {
    //             name: 'Crispy Chicken',
    //             description: 'Juicy and Crunchy',
    //             price: '4,500 MMK',
    //             image: '../img/crispy chicken.jpeg'
    //         },
    //     ],
    //
    //     'Curry': [
    //         {
    //             name: 'Crispy Chicken',
    //             description: 'Juicy and Crunchy',
    //             price: '4,500 MMK',
    //             image: '../img/crispy chicken.jpeg'
    //         },
    //     ],
    //
    // };

    if (categoryData.hasOwnProperty(category)) {
        const items = categoryData[category];
        content += "<h3 class='fw-bold text-center mt-5'>" + category + "</h3>";
        content += "<div class='row mt-5 g-0'>";
        items.forEach(item => {
            content += generateItemCard(item);
        });
        content += "</div>";
        searchPlaceholder = `Search for ${category}s`;
    }

    document.getElementById('changeCategory').innerHTML = content;

    // Update the placeholder of the search input
    document.getElementById('searchInput').placeholder = searchPlaceholder;
}

if (category === 'Drink') {
    content = "<h3 class='fw-bold text-center mt-5'>Drink</h3>";
    searchPlaceholder = "Search for Drinks";
} else if (category === 'Fried') {
    content = "<h3 class='fw-bold text-center mt-5'>Fried</h3>";
    searchPlaceholder = "Search for Frieds";
} else if (category === 'Salad') {
    content = "<h3 class='fw-bold text-center mt-5'>Salad</h3>";
    searchPlaceholder = "Search for Salads";
} else if (category === 'Fast_Food') {
    content = "<h3 class='fw-bold text-center mt-5'>Fast Food</h3>";
    searchPlaceholder = "Search for Fast Foods";
} else if (category === 'Soup') {
    content = "<h3 class='fw-bold text-center mt-5'>Soup</h3>";
    searchPlaceholder = "Search for Soups";
} else if (category === 'Curry') {
    content = "<h3 class='fw-bold text-center mt-5'>Curry</h3>";
    searchPlaceholder = "Search for Curries";
}


function generateItemCard(item) {
    return `
        <div class="col-md-3 mb-3">
            <div class="card justify-content-center" style="width: 16rem; margin-left: 5px; margin-top: 5px; border-color: orange;">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <div class="text-center">
                        <h5 class="card-title"><b>${item.name}</b></h5>
                        <p class="card-text" style="opacity: 60%;">${item.description}</p>
                        <p class="card-text" style="font-size: 30px;">${item.price}</p>
                        <a href="#" class="btn">Order</a>
                    </div>
                </div>
            </div>
        </div>

    `;
}