function CartItem(name, description, price, quantity, imageSrc) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.imageSrc = imageSrc;
}

function Restaurant(name, priceRange, category, rating, address, imageSrc) {
    this.name = name;
    this.priceRange = priceRange;
    this.category = category;
    this.rating = rating;
    this.imageSrc = imageSrc;
    this.address = address;
}

$(document).ready(function () {

    if ($(document).attr("title") === "Restaurants") {
        // Event handler for retaurant links
        $(".restaurant_list_item").click(restaurantClicked);
    }

    if ($(document).attr("title") === "Cart") {
        populateCart();
    }

    if ($(document).attr("title") === "Menu") {
        var backgroundOverlay = "linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.25))";
        restaurantDetails = getRestaurantDetails();
        $(".restaurant_label").text(restaurantDetails.name);
        $(".restaurant_price_range").text(restaurantDetails.priceRange);
        $(".restaurant_address").text(restaurantDetails.address);
        $(".restaurant_rating").html(restaurantDetails.rating);
        $(".restaurant_category").text(restaurantDetails.category);
        $(".restaurant_header_container").css("background-image", backgroundOverlay + ",url(" + restaurantDetails.imageSrc + ")");

        var menuContainer = $(".menu_container").first();
        var menuItems = $(menuContainer).find(".menu_item");
        menuItems.each(function (i, item) {
            $(item).find(".menu_item_image img").attr("src", restaurantDetails.imageSrc);
            $(item).find(".menu_item_name").text(restaurantDetails.category + " " + (i + 1));
            $(item).find(".menu_item_price").text("$" + (getRndInteger(615, 2495)/100).toFixed(2));
        });
    }

    if ($(document).attr("title") === "Checkout") {
        $("#payment_mode_input").change(paymentModeChanged);
        $(".checkout_total_price").text("Total: $" + sessionStorage.getItem("cartTotalPrice"));
    }

    // Event Handler for plus button of cart item
    $(".plus_btn").click(increaseItemQuantity);

    // Event Handler for minus button of cart item
    $(".minus_btn").click(decreaseItemQuantity);

    // Event Handler for remove from cart buttons
    $(".remove_from_cart_button").click(removeCartItem);

    // Event Handler for when item quantity changes
    $('input[type="number"]').change(quantityInputChanged);

    $(".add_to_cart_button").click(addMenuItemToCart);

});

function paymentModeChanged() {
    if($(this).val() === "creditOnline"){
        $(".credit_card_info").css("display", "block");
        $(".credit_card_info input").attr("required", true);
    } else {
        $(".credit_card_info").css("display", "none");
        $(".credit_card_info input").attr("required", false);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function restaurantClicked() {
    var r = $(this);

    var imageSrc = r.find(".restaurant_image").css("background-image");
    imageSrc = imageSrc.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    var name = r.find(".restaurant_label").text();
    var priceRange = r.find(".restaurant_price_range").text();
    var category = r.find(".restaurant_category").text();
    var rating = r.find(".restaurant_rating").html();
    var address = r.find(".restaurant_address").text();

    var restaurant = new Restaurant(name, priceRange, category, rating, address, imageSrc);

    sessionStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));

}

function getRestaurantDetails() {
    if (sessionStorage.getItem("selectedRestaurant") === null) {
        return new Restaurant();
    }

    return JSON.parse(sessionStorage.getItem("selectedRestaurant"));
}

function getCartItemList() {
    var cartItems = [];
    // If cartItems not exist in session storage, return empty array
    if (sessionStorage.getItem("cartItems") === null) {
        return cartItems;
    }

    cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    return cartItems;
}

function addMenuItemToCart() {
    var menuItem = $(this).parent();
    var itemImageSrc = menuItem.find(".menu_item_image").find("img").attr("src");
    var itemName = menuItem.find(".menu_item_name").text();
    var itemDescription = menuItem.find(".menu_item_description").text();
    var itemPrice = parseFloat($(menuItem).find(".menu_item_price").first().text().replace('$', ''));
    var itemQuantity = 1;

    var cartItem = new CartItem(itemName, itemDescription, itemPrice, itemQuantity, itemImageSrc);

    var cartItems = getCartItemList();

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === itemName) {
            alert("This item is already in the cart");
            return;
        }

    }

    cartItems.push(cartItem);

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function increaseItemQuantity() {
    var quantityInput = $(this).parent().find("input");
    var value = parseInt(quantityInput.val());
    value++;
    quantityInput.val(value);

    var item = $(this).parent().parent();

    var itemName = item.find(".menu_item_name").text();

    var cartItems = getCartItemList();

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == itemName) {
            cartItems[i].quantity = value;
            break;
        }
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartTotalPrice();
}

function decreaseItemQuantity() {
    var quantityInput = $(this).parent().find("input");
    var value = parseInt(quantityInput.val());
    value = value <= 1 ? 1 : (value - 1);
    quantityInput.val(value);

    var item = $(this).parent().parent();

    var itemName = item.find(".menu_item_name").text();

    var cartItems = getCartItemList();

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == itemName) {
            cartItems[i].quantity = value;
            break;
        }
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartTotalPrice();
}

function quantityInputChanged() {
    if (isNaN($(this).val()) || $(this).val() <= 0) {
        $(this).val(1);
    }

    var item = $(this).parent().parent();

    var itemName = item.find(".menu_item_name").text();

    var cartItems = getCartItemList();

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == itemName) {
            cartItems[i].quantity = $(this).val();
            break;
        }
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartTotalPrice();
}

function removeCartItem() {
    var item = $(this).parent();

    var itemName = item.find(".menu_item_name").text();

    var cartItems = getCartItemList();

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == itemName) {
            cartItems.splice(i, 1);
            break;
        }
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    item.remove();

    updateCartTotalPrice();
}

function populateCart() {
    var cartItemList = getCartItemList();
    var carItems = $(".cart_container");

    cartItemList.forEach(function (item) {
        var cartItem = document.createElement("div");
        cartItem.classList.add("menu_item")

        var cartItemContent = `
        <button class="remove_from_cart_button" type="button">
            X
        </button>

        <div class="menu_item_image">
            <img src="${item.imageSrc}">
        </div>

        <div class="menu_item_details">
            <span class="menu_item_name">${item.name}</span>
            <span class="menu_item_description">${item.description}</span>
            <span class="menu_item_price">${"$" + item.price.toFixed(2)}</span>
        </div>

        <div class="menu_item_quantity">
            <button class="plus_btn" name="button">+</button>
            <input type="number" name="quantity" value="${item.quantity}" min="1">
            <button class="minus_btn" type="button">-</button>
        </div>

        <div class="menu_item_total_price">$0.00</div>`;

        cartItem.innerHTML = cartItemContent;

        carItems.append(cartItem);
    });

    updateCartTotalPrice();
}

function updateCartTotalPrice() {
    var cartContainer = $(".cart_container").first();
    var cartItems = $(cartContainer).find(".menu_item");
    var cartTotalPrice = 0.00;
    cartItems.each(function (i, item) {
        var itemPrice = parseFloat($(item).find(".menu_item_price").first().text().replace('$', ''));
        var itemQuantity = parseInt($(item).find("input").first().val());

        var itemTotalPrice = itemPrice * itemQuantity;
        $(item).find(".menu_item_total_price").first().text("$" + itemTotalPrice.toFixed(2));

        cartTotalPrice = cartTotalPrice + itemTotalPrice;
    });

    $(".cart_total_price").text("Total: $" + cartTotalPrice.toFixed(2));

    sessionStorage.setItem("cartTotalPrice", cartTotalPrice.toFixed(2));
}