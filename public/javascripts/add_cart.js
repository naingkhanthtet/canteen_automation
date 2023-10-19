let cart_count = 0;
const user_id = document.getElementById("user-id").innerText;
console.log(user_id);
const cart_button = document.getElementById("add_cart");

function orderFood(button) {
    const food_id = button.getAttribute("food-id");
    const food_name = button.getAttribute("food-name");
    const food_price = button.getAttribute("food-price");
    const food_quantity = button.getAttribute("food-quantity");
    const button_action = button.getAttribute("button-action");
    // console.log(`${food_id}, ${food_name}, ${food_price}, ${food_quantity}, ${button_action}, ${user_id}`);

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
            // console.log('Response:', response);
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

fetch("/checkCart")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const order_button = document.getElementById(`order-button-${item.mid}`);
            if (item.mid) {
                order_button.innerText = "Added, remove from Cart";
                order_button.setAttribute("button-action", "remove");
            } else {
                order_button.innerText = "Order";
                order_button.setAttribute("button-action", "add");
            }

            // const item_state = order_button.getAttribute("button-action");
            // // cart button
            // if (item_state === "add") {
            //     cart_count--;
            // } else if (order_button.textContent === "remove") {
            //     cart_count++;
            // }
        });
    })
    .catch((err) => {
        console.error("Request failed", err);
    });


function pollUpdate() {
    setInterval(() => {
        fetch(`/cartCount/${user_id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    cart_count = data.cartCount;
                    console.log(cart_count);
                    if (data.cartCount > 0) {
                        cart_button.style.display = "block";
                        document.getElementById("cart_count").textContent = cart_count.toString();
                    } else {
                        cart_button.style.display = "none";
                    }
                } else {
                    console.error("Request failed", data.msg);
                }
            })
            .catch((err) => {
                console.error("Request failed", err);
            });
    }, 700);
}
pollUpdate();

