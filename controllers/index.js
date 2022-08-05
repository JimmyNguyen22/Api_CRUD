// GET

function getProduct() {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });
  // xử lý thành công
  promise.then(function (result) {
    console.log(result.data);
    renderProduct(result.data);
  });
  // xu ly thất bại
  promise.catch(function (error) {
    console.log(error.response.data);
  });
}

window.onload = function () {
  getProduct();
};

// POST : thêm product
document.querySelector("#btnCreate").onclick = function () {
  let product = new Product();
  product.id = Number(document.querySelector("#productId").value);
  product.name = document.querySelector("#productName").value;
  product.price = document.querySelector("#productPrice").value;
  product.img = document.querySelector("#productImage").value;
  product.type = document.querySelector("#productType").value;
  product.description = document.querySelector("#productDesc").value;
  // gọi api
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: product,
  });
  // thành công
  promise.then(function (result) {
    console.log(result.data);
    getProduct();
  });
  // xu ly thất bại
  promise.catch(function (error) {
    console.log(error.response.data);
  });
};

// DEL
function xoaProduct(productClick) {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + productClick,
    method: "DELETE",
  });
  // xử lý thành công
  promise.then(function (result) {
    console.log(result.data);
    getProduct();
  });
  // xử lý thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}

// GET : sửa
function suaProduct(maClick) {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + maClick,
    method: "GET",
  });
  // xử lý thành công
  promise.then(function (result) {
    let thongTin = result.data;
    // load thongTin lên giao diện
    document.querySelector("#productId").value = thongTin.id;
    document.querySelector("#productName").value = thongTin.name;
    document.querySelector("#productPrice").value = thongTin.price;
    document.querySelector("#productImage").value = thongTin.img;
    document.querySelector("#productType").value = thongTin.type;
    document.querySelector("#productDesc").value = thongTin.description;
  });
  // xử lý thất bại
  promise.catch(function (error) {
    console.log(error);
  });
}

// PUT: cập nhật
document.querySelector("#btnUpdate").onclick = function () {
  let prod = new Product();
  prod.id = Number(document.querySelector("#productId").value);
  prod.name = document.querySelector("#productName").value;
  prod.price = document.querySelector("#productPrice").value;
  prod.img = document.querySelector("#productImage").value;
  prod.type = document.querySelector("#productType").value;
  prod.description = document.querySelector("#productDesc").value;
  // gọi api
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + prod.id,
    method: "PUT",
    data: prod,
  });
  promise.then(function (result) {
    console.log(result.data);
    getProduct();
  });
  promise.catch(function (error) {
    console.log(error);
  });
};

// GET tìm kiem
document.querySelector("#btnSearch").onclick = function () {
  let productSearch = document.querySelector("#inputSearch").value;
  let promise = axios({
    url:
      "http://svcy.myclass.vn/api/Product/SearchByName?name=" + productSearch,
    method: "GET",
  });
  // xử lý thành công
  promise.then(function (result) {
    if (result.data.name === productSearch) {
      return getProduct();
    }
  });
  // xử lý thất bại
  promise.catch(function (error) {
    console.log(error);
  });
};

function renderProduct(arrProduct) {
  let html = "";
  for (let i = 0; i < arrProduct.length; i++) {
    let prod = arrProduct[i];
    html += `
        <tr> 
            <td>${prod.id}</td>
            <td><img src="${prod.img}" alt="..." style="width: 100px"></td>
            <td>${prod.name}</td>
            <td>${prod.price}</td>
            <td>${prod.description}</td>
            <td>${prod.type}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaProduct('${prod.id}')">
            <i class="fa fa-trash"></i>
            </button>
            <button class="btn btn-primary" onclick="suaProduct('${prod.id}')">
            <i class="fa fa-edit"></i>
            </button>
            </td>
        </tr>
      `;
  }
  document.querySelector("tbody").innerHTML = html;
}
