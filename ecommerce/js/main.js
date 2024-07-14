var products =[];
var total =0;
var cart=[];
// import { getData } from "./fetchData.js";
// import {modifyId} from "./sproduct.js";
const innitApp = ()=>{
    if(localStorage.getItem("myCart"))
        cart = JSON.parse(localStorage.getItem("myCart"));
    if(localStorage.getItem("myTotal")){
        total = JSON.parse(localStorage.getItem("myTotal"));
    }
    fetch('js/products.json')
    .then(response =>response.json())
    .then(data =>{
        products=data;
        var mainImg = document.getElementsByClassName("mainImg")[0];
        const smallImg = Array.from(document.getElementsByClassName("small-img"));
        smallImg.forEach(element => {
            element.onclick=function(){
                mainImg.src=element.src;
                mainImg.id=element.id;
                const price = document.getElementById("price"); 
                var price_ = 0;
                products.forEach(element=>{
                    if(element.id==parseInt(mainImg.id))
                        price_=element.price;
                });
                price.innerHTML=`$${price_}`;
            }
        });
        setHrefs();
        if(window.location=='cart.html') removeButtons();
        if(window.location=='cart.html') displayToCart();
    });
};
innitApp();
const bar = document.getElementById("bar"); 
const nav = document.getElementById("navbar"); 
if(bar) {
    bar.addEventListener("click", ()=>{
        nav.classList.add("active"); 
    });
}
const close_ = document.getElementById("close"); 
if(close_){
    close_.addEventListener("click", ()=>{
        nav.classList.remove("active"); 
    });
}
const sizeSelector = document.getElementById("size-selector");
const getProId = ()=>{
    return parseInt(document.getElementsByClassName("mainImg")[0].id); 
};
const getProSize =()=>{
    return sizeSelector.options[ sizeSelector.selectedIndex ].value;
};
const inputQuantity = document.getElementById("inputQuantity");
const getQuantity =() =>{
    return parseInt(inputQuantity.value);
};
function positionProductInCart (id, size) {
    var idx=-1;
    cart.forEach(element => {
        if(element.product_id==id&&element.product_size==size){
            idx = cart.indexOf(element);
        }
    });
    return idx;
}
function addToCart (id, quantity, size) {
    if(size=="") return;
    if(cart.length<1){
        cart = [{
            product_id : id, 
            product_quantity : quantity, 
            product_size : size
        }];
    }
    else{
        const idx = positionProductInCart(id, size);
        if(idx!=-1){
            cart[idx].product_quantity=quantity+cart[idx].product_quantity;
        }
        else { 
            cart.push({
                product_id : id, 
                product_quantity : quantity, 
                product_size : size
            });
        }
    }
    cart.forEach(element => {
        console.log(element);
    });
    total +=quantity*getPrice(id);
    console.log(total);
    localStorage.setItem("myTotal", JSON.stringify(total)); 
    localStorage.setItem("myCart", JSON.stringify(cart));
}
function getPrice(id){
    var t = 0;
    products.forEach(element=>{
        if(element.id==id) {
            t =element.price;
        }
    });
    return t;
}
const button = document.getElementById("add-to-cart"); 
if(button){
    button.addEventListener("click", (event) => {
        // console.log("clicked");
        addToCart(getProId(), getQuantity(), getProSize());
       
    });
}

// localStorage.removeItem("myTotal");
// localStorage.removeItem("myCart");
 
const setHrefs= () =>{
    const products_page = Array.from(document.getElementsByClassName("pro")); 
    // console.log(products_page);
    products_page.forEach((element)=>{
        element.addEventListener("click", function(event){
            localStorage.setItem("currentId", element.id);
            window.location='sproduct.html';
            // console.log(document.getElementsByClassName("mainImg"));
            // console.log(document);
            // var mainImg = document.getElementsByClassName("mainImg")[0];
            // var mainEle = products.filter((ele)=>{
            //     return ele.id==element.id;
            // })[0]; 
            // console.log(mainEle);
            // console.log(mainImg);
            // mainImg.src=mainEle.image;
            // mainImg.id=mainEle.id;
            // imageGroup = products.filter(element2=>{
            //     return element2.similar == mainEle.similar;
            // });
            // var i=0;
            // smallImg = Array.from(document.getElementsByClassName("small-img")); 
            // smallImg.forEach(element2=>{
            //     element2.src = imageGroup[i].image;
            //     element2.id=imageGroup[i].id;
            //     i++;
            // });
        });
    });
};
function removeButtons(){
    // let table = document.getElementById("cart-table");
    const buttons = Array.from(document.getElementsByClassName("remove-button"));
    // console.log(buttons);
    buttons.forEach(element=>{
        element.addEventListener("click", event=>{
            const row = element.closest('tr');
            row.remove();
        });
    });
}
function displayToCart(){
    const table = document.querySelector('#cart-table tbody');
    cart.forEach(element=>{
        let newRow = table.insertRow();
        let pro = products.filter(pro=>{
            return pro.id==element.product_id;
        })[0];
        let price = pro.price;
        let img = pro.image;
        let name = pro.name;
        let qty = element.product_quantity;
        let sub = price*qty;
        let size =  element.product_size;
        newRow.innerHTML = `<td><i class="fa-solid fa-xmark remove-button"></i></td><td><img src="${img}" alt="" id="small-img"></td><td id="small-des">${name}</td><td>${size}</td><td id="price">$${price}</td><td><input type="number" value="${qty}"></td><td id="total-price">$${sub}</td>`;
    });
    let subtotal = total;
    document.querySelector('#cart-subtotal').innerHTML=`$${subtotal}`;
    document.querySelector('#cart-total').innerHTML=`$${total}`;
}




