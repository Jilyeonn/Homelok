const product =[
    {
      id: 0,
      image: 'images/securityleverhandle.jpeg',
      title: 'Security Lever Handle',
      price: 2200
    },
    {
      id: 1,
      image: 'images/uboltprowifismartlock.jpeg',
      title: 'U-Bolt Pro WiFi Smart Lock',
      price: 1800
    },
    {
      id: 2,
      image: 'images/cctvcamera.jpeg',
      title: 'CCTV Camera',
      price: 1500
    },
    {
      id: 3,
      image: 'images/smokealarm.jpg',
      title: 'Smoke Alarm',
      price: 1500
    }
  ]
  
  const categories = [...new Set(product.map((item)=>{return item}))]
  
  document.getElementById('searchBar').addEventListener('keyup', (e)=>{
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item)=>{
      return(
        item.title.toLocaleLowerCase().includes(searchData)
      )
    })
    displayItem(filterData)
  })
  
  const displayItem = (items)=>{
    document.getElementById('root').innerHTML=items.map((item)=>{
        const { id, image, title, price } = item;
        return `
            <div class='item-list'>
                <div class='item'>
                    <img src='${image}' alt='${title}' />
                    <h3>${title}</h3>
                    <p class='price'>₱${price}.00</p>
                    <button 
                        class='add-to-cart' 
                        data-id='${id}' 
                        data-name='${title}' 
                        data-price='${price}' 
                        data-image='${image}'>
                        Add to cart
                    </button>
                </div>
            </div>
        `;
    }).join('')
    attachAddToCartListeners();
  }
  displayItem(categories);

  