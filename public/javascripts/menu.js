// change data accroding to the category
function changeCategory(category) {
   
    let content = "";
    let searchPlaceholder = "Search";

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

    
    // Update the content of the 'changeCategory' div
    document.getElementById('changeCategory').innerHTML = content;

    // Update the placeholder of the search input
    document.getElementById('searchInput').placeholder = searchPlaceholder;
}
