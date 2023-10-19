function orderFood(button) {
    const food_id = button.getAttribute("food-id");
    const food_name = button.getAttribute("food-name");
    const food_price = button.getAttribute("food-price");
    const food_quantity = button.getAttribute("food-quantity");
    const button_action = button.getAttribute("button-action");
    const user_id = document.getElementById("user-id").textContent;
    console.log(`${food_id}, ${food_name}, ${food_price}, ${food_quantity}, ${button_action}, ${user_id}`);

    fetch("/addCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            food_id: food_id,
            food_name: food_name,
            food_quantity: food_quantity,
            food_price: food_price,
            button_action: button_action,
        }),
    })
        .then((response) => {
            console.log('Response:', response);
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                if (button_action === "add") {
                    button.innerText = "Added, remove from Cart";
                    button.setAttribute("button-action", "remove");
                } else if (button_action === "remove") {
                    button.innerText = "Order";
                    button.setAttribute("button-action", "add");
                }
            } else {
                console.error("Request failed", data.msg);
            }
        })
        .catch((err) => {
            console.error("Request failed", err);
        });
}
