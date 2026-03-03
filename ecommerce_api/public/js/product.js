const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const product = e.target.product.value;

    axios.post('http://localhost:4000/products', {
        "productName" : product
    }).then((result) => {
        console.log(result.data.data)
    })
})