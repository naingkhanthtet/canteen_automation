let cart_count = 0;
const user_id = document.getElementById("user-id").innerText;
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


function checkCart() {
    fetch("/checkCart")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const order_button = document.getElementById(`order-button-${item.mid}`);
                // if (user_id === item.uid) {
                if (order_button) {
                    if (item.mid) {
                        order_button.innerText = "Added, remove from Cart";
                        order_button.setAttribute("button-action", "remove");
                    } else {
                        order_button.innerText = "Order";
                        order_button.setAttribute("button-action", "add");
                    }
                }
                // }
            });
        })
        .catch((err) => {
            console.error("Request failed", err);
        });
}

// checkCart();
setInterval(checkCart, 1000);


function cartCount() {
    fetch(`/cartCount/${user_id}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                cart_count = data.cartCount;
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
}

// cart_count();
setInterval(cartCount, 1000);


const cart_button_container = document.getElementById("cart-button-container");
let addedInCart = new Set();


// this a big function
function inCart() {
    fetch('/inCart')
        .then((response) => response.json())
        .then((data) => {
            const newItems = new Set();
            data.forEach((item) => {
                newItems.add(item.mid);

                if (!addedInCart.has(item.mid)) {
                    cart_button_container.innerHTML += `
                        <div class="container-${item.mid} cart-item">
                            <div class="row m-3 rounded-4"
                             style="border: 1px solid rgb(241, 166, 97); background-color: white; display: flex; flex-wrap: wrap; align-items: center; padding: 10px;">

                            <div class="col-md-3"
                                 style="border-right: 2px solid rgb(241, 166, 97); padding: 0 10px; margin-bottom: 10px; width: 250px;">
                                <div class="cart-name" style="font-size: 15px;"><b>${item.mname}</b></div>
                            </div>

                            <div class="col-md-3"
                                 style="border-right: 2px solid rgb(241, 166, 97); padding: 0 10px; margin-bottom: 10px; width: 250px;">
                                <div id="${item.mid}-price" class="price" style="margin-top: 10px; font-size: 20px;">${item.price}</div>
                            </div>
                            
                            <div id="${item.mid}" class="col-md-3 d-flex justify-content-center">
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary" type="button" id="minus-btn" onclick="decreaseItemQ(${item.mid})"
                                            style="background-color: red; color: white; padding: 10px;">-
                                    </button>
                                    <input type="text" id="${item.mid}-quantity" class="quantity form-control text-center" value="1"
                                           style="width: 40px;" min="0" max="5">
                                    <button class="btn btn-outline-secondary" type="button" id="plus-btn" onclick="increaseItemQ(${item.mid})"
                                            style="background-color: green; color: white; padding: 10px;">+
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    `;
                    addedInCart.add(item.mid);
                }

                // update price for each item with +, - buttons
                let parse_input = parseInt(document.getElementById(`${item.mid}-quantity`).value, 10);
                let total_price = item.price * parse_input;
                document.getElementById(`${item.mid}-price`).textContent = `${total_price}`;
            });
            addedInCart.forEach((itemMid) => {
                if (!newItems.has(itemMid)) {
                    const remove_container = document.querySelector(`.container-${itemMid}`);
                    if (remove_container) {
                        remove_container.remove();
                    }
                }
            });
            addedInCart = newItems;

            // calculate final price
            let final_price = 0;
            const all_price = document.querySelectorAll(".price");
            all_price.forEach((each) => {
                const price = parseInt(each.textContent, 10);
                final_price += price;
            });
            document.getElementById("final-price").textContent = final_price;
        })
        .catch((err) => {
            // console.error("Request failed", err);
        });
}

setInterval(inCart, 1000);

// inCart();

function deleteOrdersAfterConfirmed() {
    fetch('/delCartOrders', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: user_id
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log(data.msg);
            } else {
                console.error("Request failed", data.msg);
            }
        })
        .catch((error) => {
            console.error('Removing the cart orders have problem', error);
        });
    // window.location.href = '/viewVoucher';
    window.location.href = `/voucherPage/${user_id}`;
}

// add cart items to new database table if 'Order' confirmed
function submitOrder() {
    const cart_container = document.querySelectorAll(".cart-item");

    cart_container.forEach((item) => {
        const food_name = item.querySelector(".cart-name").textContent;
        const food_price = parseInt(item.querySelector(".price").textContent);
        const food_quantity = parseInt(item.querySelector(".quantity").value);
        // https://www.geeksforgeeks.org/how-to-convert-javascript-datetime-to-mysql-datetime/
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const uid = parseInt(user_id);

        const ordered = {
            uid: uid,
            food_name: food_name,
            date: date,
            food_quantity: food_quantity,
            food_price: food_price
        };

        fetch('/submitOrder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ordered),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.msg);
                } else {
                    console.error("Request failed", data.msg);
                }
            })
            .catch((error) => {
                console.error('Order submission error', error);
            });
    });

    deleteOrdersAfterConfirmed();
}


// CART Function
function decreaseItemQ(itemId) {
    const input_value = document.getElementById(`${itemId}-quantity`);
    if (parseInt(input_value.value) > 0) {
        const current_value = parseInt(input_value.value, 10);
        input_value.value = current_value - 1;
    }

    if (parseInt(input_value.value) === 0) {
        fetch("/removeIfZero", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: itemId
            }),
        })
            .then((response) => {
                // console.log('Response:', response);
                return response.json();
            })
            .catch((err) => {
                console.error("Request failed", err);
            });
    }
}

function increaseItemQ(itemId) {
    const input_value = document.getElementById(`${itemId}-quantity`);
    if (parseInt(input_value.value) < 5) {
        const current_value = parseInt(input_value.value, 10);
        input_value.value = current_value + 1;
    }
}

function updateButton(selectedItem) {
    document.querySelector('.btn.selection').innerText = selectedItem;
}

function enableDropdown() {
    document.querySelector('.btn.selection').disabled = false;
}

function disableDropdown() {
    document.querySelector('.btn.selection').disabled = true;
}
