
/*****************
  FACEBOOK component
*****************/

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


/*****************
  YELP component
*****************/

// yelp zipcode search input
const searchZipBtn = document.querySelector('#yelpForm');

//yelp results
const searchResults = document.querySelector('#results');

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + yelpApiKey);


searchZipBtn.addEventListener('submit', (e) => {
  // will migrate css in dedicated css file in actual project
  if (document.querySelector('#zipcode').value === '') {
   document.querySelector('#error').style.display = 'block';
    document.querySelector('#error').style.backgroundColor = 'red';
     document.querySelector('#error').style.width = '200px';
      document.querySelector('#error').style.padding = '5px';
       document.querySelector('#error').style.color = 'white';
        document.querySelector('#error').innerHTML = "Please enter a vaild zipcode";
  }else{
  document.querySelector('#error').style.display = "none";
   document.querySelector('#loading').style.display = 'block';
    document.querySelector('#results').innerHTML = '';
     queryBrewsResults();
  }
e.preventDefault();
});


function queryBrewsResults(e) {
   
const zipCode = document.querySelector('#zipcode').value;
const radius = document.querySelector('input[name="mi"]:checked').value * 1609.344; //convert miles to metters

fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=breweries&limit=20&location=${zipCode}&distance=${radius}`, {
    headers: myHeaders 
    })
    .then((res) => {
        return res.json();
     })
     .then((data) => {
        //  console.log(data);
         let brews = data.businesses;
         let output = '';
         if (!brews) {
          document.querySelector('#error').style.display = "block";
          document.querySelector('#error').innerHTML = "No beer found!";
          document.querySelector('#loading').style.display = 'none';
         } else{
       for (let i = 0; i < brews.length; i++) {
         output += `<div class="searchedReturn">
         <img class="yelpImg" src='${brews[i].image_url}'><br>
         <strong>Brewery Name:</strong> <i class="fas fa-beer"></i> ${brews[i].name}<br>
         <strong>Location:</strong> <i class="fas fa-map-marker"></i> ${brews[i].location.address1}, ${brews[i].location.city} ${brews[i].location.state}<br>
         <strong>Phone Number:</strong> <i class="fas fa-phone"></i> ${brews[i].phone}<br>
         <strong>Price Range:</strong> <i class="far fa-credit-card"></i> ${brews[i].price}<br>
         <strong>Rating:</strong> <i class="fas fa-star"></i> ${brews[i].rating}/5<br>
         <strong>View on Yelp:</strong> <i class="fab fa-yelp"></i> <a href="${brews[i].url}">Click Me!</a><br>
         </div><br>
         `;
         console.log(data);
       }
         document.querySelector('#error').style.display = 'none';
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').innerHTML = output;
      //  searchReturn(data);
       clearFields(zipCode);
      }
    })
}

clearFields = (zipCode) => {
  zipCode = '';
}


/*****************
  BEER component
*****************/

document.querySelector('#findBeerBtn').addEventListener('click', (e) => {
  if (document.querySelector('#beerName').value === '') {
    // will migrate css in dedicated css file in actual project
    document.querySelector('#beerError').style.display = 'block';
     document.querySelector('#beerError').style.backgroundColor = 'red';
      document.querySelector('#beerError').style.width = '200px';
       document.querySelector('#beerError').style.padding = '5px';
        document.querySelector('#beerError').style.color = 'white';
         document.querySelector('#beerError').innerHTML = "Please enter a beer name";
   }else{
   document.querySelector('#beerError').style.display = "none";
     queryBeerResults();
   }
 e.preventDefault();
});
function queryBeerResults(e) {
  const beerName = document.querySelector('#beerName').value;
  fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
    .then((res) => {
        return res.json();
     })
     .then((beerinfo) => {
         console.log(beerinfo);
         if (beerinfo.length === 0) {
          document.querySelector('#beerError').style.display = "block";
          document.querySelector('#beerError').innerHTML = "No beer found!";
         } else{
         let beerOutput = '';
         for (let i = 0; i < beerinfo.length; i++) {
           beerOutput += `<div class="searchedBeerReturn">
           <img class="beerImg" src='${beerinfo[i].image_url}'><br>
           <strong>Beer Name:</strong> ${beerinfo[i].name}<br>
           <strong>Description:</strong>${beerinfo[i].description}<br>
           <strong>Alcohol by volume:</strong> ${beerinfo[i].abv}v<br>
           <strong>Food Pairing:</strong> ${beerinfo[i].food_pairing[i]}<br>
           <strong>IBU level:</strong> ${beerinfo[i].ibu}<br>
           <strong>Hops:</strong> ${beerinfo[i].ingredients.hops[i].name}<br>
           </div><br>
           `;
         }
         document.querySelector('#beerInfo').innerHTML = beerOutput;
        }
     });
    }