$(document).ready(function(){
  //calling functions here
    loadProducts();
    $(".product-section").on("click", ".delete-btn", handleDelete);
    $(".product-section").on("click", ".edit-btn", handleUpdate);
    $("#add").click(addProduct);
    $("#save-changes").click(function(evt) {   //save changes
      var id = $("#updateId").val();
      var title = $(".UpdateInputName").val();
      var desc = $(".UpdateInputDesc").val();
      var price = $(".UpdateInputCost").val();
     

      $.ajax({
       url: "http://localhost:3001/products/" + id,
       data: { title, desc, price },
       method: "PATCH",
       success: function(response) {
         console.log(response);
         loadProducts();
         $("#edit-form").modal("hide");
       }
     });
   });
  });



//function to load products
const loadProducts = function() {
    $.ajax({
        url:  "http://localhost:3001/products",
        method: "GET",
        error: function(response) {
           var div = $(".product-section");
         div.html("An Error has occured");
        },
        success: function(response) {
          console.log(response);
          var div = $(".product-section");
              div.empty();
              for(var i =0; i < response.length; i++){
                  div.append(
                    `<div class="col-lg-4 col-md-6 col-10 p-5 mt-5" data-id="${response[i]._id}">
                    <div class = "productCard"> 
                    <img class = "product-img" src ="./images/shampoo.jpg">
                    <div class = "p-4 product-details">
                    <h2 class="title" >${response[i].title}</h2>
                        <span class="price">${response[i].price}</span>
                        <span class="desc">${response[i].desc}</span>
                        <button class="own-btn edit-btn"  data-toggle="modal" data-target="#edit-form">Edit</button>
                        <button class="own-btn delete-btn">Delete</button>
                    </div>
                </div>
                </div>`
                  )
              }
            
          
        }
      });
  }

//function to delete product  
  function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".productCard");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
      url: "http://localhost:3001/products/" + id,
      method: "DELETE",
      success: function() {
        loadProducts();
      }
    });
  }

//create product function
  function addProduct() {
    var title = $(".inputName").val();
    var desc = $(".inputDesc").val();
    var price = $(".inputCost").val();

    console.log(title,desc, price)
    $.ajax({
      url: "http://localhost:3001/products",
      method: "POST",
      data: { title, desc, price},
      success: function(response) {
        $(".inputName").val("");
        $(".inputDesc").val("");
        $(".inputCost").val("");
        loadProducts();
        $("#create").modal("hide");
      }
    });
  }  
  
//handle update function
  function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".productCard");
    let id = parentDiv.attr("data-id");
    $.get("http://localhost:3001/products/" + id, function(
      response
    ) {
      console.log(response);
      $("#updateId").val(response._id);
      $(".UpdateInputName").val(response.title);  //
      $(".UpdateInputDesc").val(response.desc);
      $(".UpdateInputCost").val(response.price);

    });
  }


  