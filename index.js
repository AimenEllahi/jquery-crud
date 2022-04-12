$(document).ready(function(){
    loadProducts();
    $(".product-section").on("click", ".delete-btn", handleDelete);
    $("#add").click(addProduct);
  });




const loadProducts = function() {
    $.ajax({
        url:  "http://localhost:3000/products",
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
                    `<div class="col-lg-3 col-md-5 col-10 productCard p-0 mt-5" data-id="${response[i]._id}">
                     <img class = "product-img" src ="./images/shampoo.jpg">
                    <div class="product-image-container p-4"  style="color: black;">
                        <h2 class="title" >${response[i].productname}</h2>
                        <span class="price">${response[i].productcost}</span>
                        <span class="desc">${response[i].desc}</span>
                        <div class="stars">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                        <button class="own-btn edit-btn">Edit</button>
                        <button class="own-btn delete-btn">Delete</button>
                    </div>
                </div>`
                  )
              }
            
          
        }
      });
  }

  function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".productCard");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
      url: "http://localhost:3000/products/" + id,
      method: "DELETE",
      success: function() {
        loadProducts();
      }
    });
  }


  function addProduct() {
    var title = $(".inputName").val();
    var desc = $(".inputDesc").val();
    var price = $(".inputCost").val();

    console.log(title,desc, price)
    $.ajax({
      url: "http://localhost:3000/products",
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