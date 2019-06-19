'use strict'
refreshApi();
console.log('whatever');

function refreshApi(){
  document.querySelectorAll('li').forEach(li => li.remove());
  document.querySelectorAll('option').forEach(option => option.remove());

  fetch('/api/items')
  .then(auctions => auctions.json())
  .then(auctions => {
    auctions.forEach(auction => {
      let li = document.createElement('li');
      li.innerText = `${auction.title} (highest bid: ${auction.highestBid}, ${auction.highestBidderName})`;
      document.querySelector('ul').appendChild(li);
      
      let option = document.createElement('option');
      option.innerText = auction.title;
      option.value = auction.title;
      option.id = auction.id;
      document.querySelector('.selector').appendChild(option);
    })
    .catch(console.error);
  });
}

document.querySelector('.submitbutton').addEventListener('click', (event) => {
  event.preventDefault();
  
  fetch(`/api/items/${document.querySelector('option:checked').id}/bids`,
    {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          name : document.querySelector('#name').value,
          amount: document.querySelector('#amount').value
        })
    })
    .then(response => response.json())
    .then(response =>{
      document.querySelector('.message').innerText = response.message;

      if (response.message !== 'Your bid is below the highest bid!'){
        refreshApi();
        document.querySelector('#name').value = '';
        document.querySelector('#amount').value = '';
      }
    });
});