const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

//easy

//I want to go to https://flights.flyfrontier.com/en/
//I want to search best fares list for FROM denver, TO vegas.
//If there is a flight available, I want to be notified.

//hard

//if there isn't a flight to vegas, I want to go to https://flights.flyfrontier.com/en/#westcoast
//I can do this by clicking or just go right to it
//I want to see what other flights from Denver are available

//do a queryselectorAll on the div.from's.  Give it a variable.  Find Denver. You'll do a find on innerText - you are looking for "Denver (DEN)"

//Do a queryselectorAll on the div.to's.  Give it a variable.  Find Vegas.  You'll do a find on innerText - you are looking for "To Las Vegas (LAS)"

function findVegasTrip () {
  const fromList = Array.from(document.querySelectorAll('div.from'))
  const toList = Array.from(document.querySelectorAll('div.to'))

  //https://stackoverflow.com/questions/2125714/explanation-of-slice-call-in-javascript  just gonna use Array.from

  const fromDenver = fromList.findIndex((from) => {
    return from.innerText === "Denver (DEN)"

  })

  // const toVegas = toList.find((to) => {
  //   return to.innerText === "To Las Vegas (LAS)"
  // })

  return new Promise((resolve, reject) => {
    if ((fromDenver !== -1) && (toList[fromDenver].innerText === "To Las Vegas (LAS)")) {
      resolve('Yaaaaay! Book your trip to Vegas this week!');
    } else {
      reject('No Vegas for you.');
    }
  });


}

nightmare.goto('https://flights.flyfrontier.com/en/').wait('article.custom-deals')
  .evaluate(findVegasTrip).end()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Search failed:', error);
  });
