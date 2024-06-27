// take the input tag as an object using ID
var categoryInput = document.getElementById("category");
var nameInput=document.getElementById('name');
var priceInput=document.getElementById("price");
var descriptionInput=document.getElementById("description");
var imageInput=document.getElementById("image");
var productList=[];
var updateIndex=0;


// to avoid error in new browser or specificall empty local storage data, i'll use if condition
if (localStorage.getItem('productList') !=null) {
    // set a vlue to product list variable array in global scope, this value from local storage passing through JSON then json method parse().
// the line below is here not at he bottom or after the addfunction because if it was at the bottom and i clicked add it conflicts between the productlist array which has no value at the top and the product list which has value at the bottom.
// in conclusion we put it here due to syntax from top to bottom and rendering rules 
productList=JSON.parse(localStorage.getItem('productList'));
}


//   ====================          Regex validation          ===================
// define regex as object has properties have values
// const Regex={
//     catreg:/(grocery|men Fashion|women Fashion|babyCare|sanitary|handTools)/,
//     namereg:/^[a-zA-z]{3}.{0,22}$/,
//     pricereg:/^[0-9]{1,4}$/,
//     descriptionreg:/^[a-zA-Z].{2,99}$/,
//     imagereg:/(\.jpg|\.png)$/i
// }

// // since 
// categoryInput.addEventListener('change',function () {
//     validation(categoryInput,Regex.catreg)
    
// })
// nameInput.addEventListener('keyup',function () {
//     validation(nameInput,Regex.namereg)
    
// })
// priceInput.addEventListener('keyup',function () {
//     validation(priceInput,Regex.pricereg)
    
// })
// descriptionInput.addEventListener('keyup',function () {
//     validation(descriptionInput,Regex.descriptionreg)
    
// })
// imageInput.addEventListener('change',function () {
//     console.log(imageInput.value);
//     validation(imageInput,Regex.imagereg)
    
// })

//  function validation (input,reg) {
//     let testreg=reg
//     if (testreg.test(input.value)) {
//         input.classList.add('valid');
//         input.classList.remove('invalid');
    
//     } else {
//         input.classList.add('invalid');
//         input.classList.remove('valid');

        
//     }
//  }

        //   ==========  course validation ===========
        // ********* attention for the below please soooooooo important 
        // here we defined the name properties as same as name of id of the input (category input has id="category" so the property name category, name input has id="name" so the property name name, and so on) 
        const regex={
            category:/(grocery|men Fashion|women Fashion|babyCare|sanitary|handTools)/,
            name:/^[a-zA-z]{3}.{0,22}$/,
            price:/^[0-9]{1,4}$/,
            description:/^[a-zA-Z].{2,99}$/,
            image:/(\.jpg|\.png)$/i
        };

        // now i want to add event to all ainputs
        var keyupInputs=document.querySelectorAll('.form-control');        
        // now all inputs are in node list and i need to add event 
        for (let i = 0; i < keyupInputs.length; i++) {
            keyupInputs[i].addEventListener('keyup',function () {
                // if i used this in call back function it refers to the elemnt that i'm working on and validating
                validation(this)
            })
            
        }

        // i defined a clss in html change for selecting
        var changeInputs=document.querySelectorAll('.change');
        for (let i = 0; i < changeInputs.length; i++) {
            changeInputs[i].addEventListener('change',function () {
                // if i used this in call back function it refers to the elemnt that i'm working on and validating
                validation(this)
            })
            
        }

        function validation (input) {
            if (regex[input.id].test(input.value)) {
                input.classList.add('valid');
                input.classList.remove('invalid');
    
            } else {
                input.classList.add('invalid');
                input.classList.remove('valid');

        
            }
            preview()

        }
        
//   ====================          to add item and show the added          ===================

// function to save product as an object inside the array using array method:push()
function addItem() {
    // to store the product specifications we use object and properties;
    var product={
        // attention plese: how do you get the vlaue of selected option
        category:categoryInput.options[categoryInput.selectedIndex].text,
        name:nameInput.value,
        price:priceInput.value,
        description:descriptionInput.value,
        image:`./image/${imageInput.files[0]?.name}`
    };
    productList.push(product);
    localStorage.setItem('productList',JSON.stringify(productList))
    showadded();
    clearForm();
}


// add after validation
document.getElementById('addItem').addEventListener('click',function () {
    if (categoryInput.classList.contains('valid')&&nameInput.classList.contains('valid')&&priceInput.classList.contains('valid')&&descriptionInput.classList.contains('valid')&&imageInput.classList.contains('valid')) {
        addItem()
        // عايز اشيل البريفيو بعد الاضافه
        document.getElementById('preview').classList.add('opacity-0')
        
    } else{
        window.alert('invalid item data')
    }
})

//   ====================          to show the added          ===================
    
// function to show  only the lately added item
function showadded(){
    // first define row var with empty string
    var row='';

//     // for loop to count and add product list one by one till it reach length
//  for (let i = 0; i < productList.length; i++) {
//     row+=
//     `
//     <tr>
//       <th scope="row">${i}</th>
//       <td>${productList[i].category}</td>
//       <td>${productList[i].name}</td>
//       <td>${productList[i].price}</td>
//       <td>${productList[i].description}</td>
//       <td>${productList[i].image}</td>
// <td>
//    <button class="btn btn-warning">Update</button>
//    <button class="btn btn-danger onclick="deleteItem(${lastIndex})">Delete</button>
//</td>
//     </tr>
//     `
    
//  }
// //  show the row variable
//  document.getElementById("rowCont").innerHTML=row


//   ========= for better performance instead of using for loop =============
// define last index variable 
var lastIndex=productList.length-1;
row=`
<tr>
<th scope="row">${lastIndex+1}</th>
<td>${productList[lastIndex].name}</td>
<td>${productList[lastIndex].category}</td>
<td>${productList[lastIndex].price}</td>
<td>${productList[lastIndex].description}</td>
<td><img class="itemImg" src="${productList[lastIndex].image}" alt="" ></td>
<td>
    <button class="btn btn-warning"  onclick="update(${lastIndex})">Update</button>
    <button class="btn btn-danger"  onclick="deleteItem(${lastIndex})">Delete</button>
</td>
</tr>
`;
document.getElementById("rowCont").innerHTML+=row;
};


//   ====================          function to clear form after adding item          ===================

function clearForm() {
    categoryInput.options[categoryInput.selectedIndex].text="Chose category"
    nameInput.value="";
    priceInput.value="";
    descriptionInput.value="";
    imageInput.value="";
    categoryInput.classList.remove('valid');
    nameInput.classList.remove('valid');
    priceInput.classList.remove('valid');
    descriptionInput.classList.remove('valid');
    imageInput.classList.remove('valid');
};


//   ====================          to show saved product list          ===================

// function to show  the produst list after resfreshed the site and calling back data from local storage. 
function showList(list,term) {
    var row=''
    // i used ternary operator below in line 169: to make one line condition 
    for (let i = 0; i < list.length; i++) {
        row+=`
    <tr>
    <th scope="row">${i+1}</th>
    <td>${list[i].category}</td>
    <td>${term?list[i].name.toLowerCase().replaceAll(term.toLowerCase(),`<span class="bg-warning rounded-2 fw-bolder ">${term}</span>`):list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].description}</td>
    <td><img class="itemImg" src="${list[i].image}" alt="" ></td>
    <td>
        <button class="btn btn-warning" onclick="update(${i})">Update</button>
        <button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button>
                        </td>
    </tr>
    `;
    
    }
    document.getElementById("rowCont").innerHTML=row;
 
}

showList(productList);   


//   ====================          search and return vlaues back to show list function for search and highlight        ===================
// first of all get text of search input
var searchInput=document.getElementById("search");
function search() {
    // the i declared new array for seach to puch search items inside.
    // attention please its defined in the function scope not globally so as not to be  far away from oninput fuction of clearing and storing in another meaning dynamic with oninput event 
    // حطيت تعريف المصفوفه جوه الداله علشان يفضل يخير فيها من عند المسح مش بس يضيف يعنى بتتغير مع كل ضغطة زرار جوه الانبت 
    var seachList=[];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            seachList.push(productList[i]);
        }
    };
    // from search function i sent to values search list array to show the list of search and search input vlaue to highlight typed charcters
    // i sent the value of search input to show list function as it's responsible for showing list of items in table
    showList(seachList,searchInput.value);
};


//   ====================          delete function        ===================
// to delete item we established a function to do that
// then i put it with onclick event ( onclick="deleteItem()") in show list fun and show added function in button tag==>(<button class="btn btn-danger" onclick="deleteItem()">Delete</button>) when i click i call the function
function deleteItem(index) {
    // i use splice method to delete the item (   splice(index of item in array , number of deleted item begining from the index)    )
    // so how to get the index of item i clicked on to delete?
    // i  set a parameter to the function called index this parameter get its value from onclick="deleteItem(${i with showlist function or lastIndex with showAddd function})" the function sents back the irretation number as it represents the index.  
    productList.splice(index,1);
    // now, i deleted from the array but not from the local storage, the local storage still has the array with its indices like before no change. so, ihave to sent the array after modification to local storage with the same key to change the value to the new one.
    localStorage.setItem('productList',JSON.stringify(productList)); 
    // to show the table after i deleted item from the array i'll call showList function with productList parameter
    showList(productList)

}
//   ====================          to preview item info          ===================
// function to preview product
function preview() {
    var item={
        // attention plese: how do you get the vlaue of selected option
        category:categoryInput.options[categoryInput.selectedIndex].text,
        name:nameInput.value,
        price:priceInput.value,
        description:descriptionInput.value,
        image:`./image/${imageInput.files[0]?.name}`
    };
    // 2 lines: to preview item when i click preview
    document.getElementById('preview').classList.remove('opacity-0','opacity-100');
    var preview=`
    <div class="container bg-success rounded-4 text-white h-100">
        <div class="row">
            <div class="col-12">
                <p id="categoryPrev">${item.category}</p>
            </div>
            <div class="col-8">
                <h4 id="namePrev">${item.name}</h4>
            </div>
            <div class="col-4">
                <h4><span id="pricePrev">${item.price}</span> EGP.</h4>
            </div>
            
            <div class="h-50">
                <div class="col-12">
                    <h6 id="descriptionPrev">${item.description}</h6>
                </div>
            </div>
        </div>
        <div class="row h-50">
            <div class="col-12 d-flex">
                <div class="w-50">
                    <img src="${item.image}" class="w-100 ms-4 mb-3 rounded-2" id="imagePrev">
                </div>
            </div>
        </div>
    </div>
    `
    //to insert html code into container
    document.getElementById("preview").innerHTML=preview;
}


//   ====================          update item info           ===================


// define global var for the index to use it different functions
function update(index) {
    // to move to th top line below
    document.documentElement.scrollTop=0;

    // set values to inputs
    categoryInput.options[categoryInput.selectedIndex].text=productList[index].category;
    nameInput.value=productList[index].name;
    priceInput.value=productList[index].price;
    descriptionInput.value=productList[index].description;

    document.getElementById('image').files[0]=productList[index].image;

    document.getElementById("addItem").classList.replace('d-inline-block','d-none')
    document.getElementById("update").classList.replace('d-none','d-inline-block')

    // store the index in var to use it in another function
    updateIndex=index;
    console.log(updateIndex);
    preview()
}

// i need to get the index to store updated info not adding a new one.
function updateItem() {
    productList[updateIndex].category=categoryInput.options[categoryInput.selectedIndex].text;
    productList[updateIndex].name=nameInput.value;
    productList[updateIndex].price=priceInput.value;
    productList[updateIndex].description=descriptionInput.value;
    productList[updateIndex].image=`./image/${imageInput.files[0]?.name}`


    // store the new list in local storage after item modification so as not to fly away
    localStorage.setItem('productList',JSON.stringify(productList))
    // show the new list after item modification in list and storing in local storage
    document.getElementById("update").classList.replace('d-inline-block','d-none')
    document.getElementById("addItem").classList.replace('d-none','d-inline-block')
    showList(productList);   
    clearForm();
    document.getElementById('preview').classList.add('opacity-0')

}

