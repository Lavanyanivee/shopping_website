/*Creating index page*/

var clothingCard = document.getElementById('clothing-card');
var isAccessory = document.getElementById('accessories-card');

function generateCard(data) {



    var card = document.createElement('div');
    card.className = 'card';

    var productLink = document.createElement('a');
    card.appendChild(productLink);
    productLink.href = './product.html?id=' + data.id;

    var thumbnail = document.createElement('img');
    thumbnail.src = data.preview;
    thumbnail.className = 'img';
    productLink.appendChild(thumbnail);

    var details = document.createElement('div');
    details.className = 'details';
    productLink.appendChild(details);

    //Create a H3 element with TEXT-NODE NAME
    var newTitleElement = document.createElement("h3");
    newTitleElement.className = 'name';
    newTitleElement.innerHTML = data.name;
    details.appendChild(newTitleElement);

    var newBrandElement = document.createElement("h4");
    newBrandElement.className = 'brand';
    newBrandElement.innerHTML = data.brand;
    details.appendChild(newBrandElement);

    var newPriceElement = document.createElement("h5");
    newPriceElement.className = 'price';
    newPriceElement.innerHTML = data.price;
    details.appendChild(newPriceElement);


    if (data.isAccessory === false) {
        clothingCard.appendChild(card);

    } else if (data.isAccessory === true) {

        isAccessory.appendChild(card);

    }
    return card;
}
// for (i = 0; i <= productList.length; i++) {
//     generateCard(productList[i]);
// }

var productArr = [];

function renderCardGrid() {
    for (i = 0; i < productArr.length; i++) {
        generateCard(productArr[i]);

    }
}

xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
        productArr = JSON.parse(xhttp.responseText);
        // console.log(productArr);
        renderCardGrid();
    }

}
xhttp.send();

/*Creating product page*/

var productBigImg = document.getElementById('productImg');

var productName = document.getElementById("name");

// Product Brand
var productBrand = document.getElementById("brand");

// Product Price
var productPrice = document.getElementById("price");

// Product Description
var productDescription = document.getElementById("description");

// Product Preview Image 0
var photo0 = document.getElementById("img0");

// Product Preview Image 1
var photo1 = document.getElementById("img1");

// Product Preview Image 2
var photo2 = document.getElementById("img2");

// Product Preview Image 3
var photo3 = document.getElementById("img3");

// Product Preview Image 4
var photo4 = document.getElementById("img4");

// Product Preview Image 5
var photo5 = document.getElementById("img5");

var currentObj = null;
var addToCartBtn = document.get
var productObj = [];

var pageId = window.location.search.split('=')[1];
// console.log(pageId);
$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + pageId, function (responseText, status) {
    productObj = responseText;
    currentObj = productObj;
    // console.log('currentobj', currentObj);

    productBigImg.src = productObj.preview;
    productName.innerHTML = productObj.name;
    productBrand.innerHTML = productObj.brand;
    productPrice.innerHTML = productObj.price;
    productDescription.innerHTML = productObj.description;
    photo0.src = productObj.photos[0];
    photo1.src = productObj.photos[1];
    photo2.src = productObj.photos[2];
    photo3.src = productObj.photos[3];
    photo4.src = productObj.photos[4];



    photo0.onclick = function () {
        productBigImg.src = productObj.photos[0];
    }
    photo1.onclick = function () {
        productBigImg.src = productObj.photos[1];
    }
    photo2.onclick = function () {
        productBigImg.src = productObj.photos[2];
    }
    photo3.onclick = function () {
        productBigImg.src = productObj.photos[3];
    }
    photo4.onclick = function () {
        productBigImg.src = productObj.photos[4];
    }
    $(document).on("click", ".previewImg img", function () {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
    });
});

var addToCartBtn = document.getElementById('add-to-cart');
var cart = document.getElementById('cart-count');
var myCartData = [];
var cartInitialValue;

if (localStorage.getItem('cart-count') == null) {
    localStorage.setItem('cart-count', '0')
} else {
    var cartValue = localStorage.getItem('cart-count');
    localStorage.setItem('cart-count', cartValue);

}
console.log('cartcount ' + localStorage.getItem('cart-count'));

function cartCount() {
    if (localStorage.getItem('cart-count') == null) {
        cartInitialValue = 0;

    } else {
        cartInitialValue = JSON.parse(window.localStorage.getItem('cart-count'));
        cart.innerHTML = cartInitialValue;
    }
    var cartCurrentValue = cartInitialValue + 1;
    window.localStorage.setItem('cart-count', cartCurrentValue);
    cart.innerHTML = window.localStorage.getItem("cart-count");

}
cart.innerHTML = window.localStorage.getItem("cart-count");

function addDataIntoList(productData) {
    if (window.localStorage.getItem("product-list") === null) {
        myCartData = [];
    } else {
        myCartData = JSON.parse(window.localStorage.getItem("product-list"));

    }
    if (myCartData.length === 0) {
        var myObj = {
            id: productData.id,
            title: productData.name,
            count: 1,
            price: productData.price,
            preview: productData.preview
        };
        myCartData.push(myObj);
    } else if (myCartData.length != 0) {
        var w = 0;
        if (myCartData[i].id == productData.id) {
            myCartData[i].count = parseInt(myCartData[i].count) + 1;
            w += 1;

        }
    }
    if (w == 0) {
        var myObj = {
            id: productData.id,
            title: productData.name,
            count: 1,
            price: productData.price,
            preview: productData.preview
        };
        myCartData.push(myObj);
    }
    window.localStorage.setItem("product-list", JSON.stringify(myCartData));
}
addToCartBtn.addEventListener('click', function () {
    var productId = window.location.search.split("=")[1];
    var urlLink = "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;

    function getDataForLocalStorage() {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    var productData = JSON.parse(this.responseText);
                    addDataIntoList(productData);
                }
            }
        }
        http.open("GET", urlLink, true);
        http.send();

    }
    cartCount();
    getDataForLocalStorage();


});