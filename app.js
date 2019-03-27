//Variables
const tweetList = document.getElementById('tweet-list');


//Event Listeners
eventListeners();
function eventListeners() {
	//  Form Submission 
	document.querySelector('#form').addEventListener('submit', newTweet);
	
	// Remove tweet from the list
    tweetList.addEventListener('click', removeTweet);
    
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//Functions

function newTweet(e) {
	e.preventDefault();
	
	//read text area value
	const tweet = document.getElementById('tweet').value;
	
	//create the remove button
	const removeBtn = document.createElement('a');
	removeBtn.classList = 'remove-tweet';
	removeBtn.textContent = "X";
	
	//create an <li> element
	const li = document.createElement('li');
	li.textContent = tweet;
		//Add the remove button to each tweet
	li.appendChild(removeBtn);
	tweetList.appendChild(li);
	addTweetLocalStorage(tweet);
}

// Remove tweet
function removeTweet(e){
	if(e.target.classList.contains('remove-tweet')){
					e.target.parentElement.remove();
				}else{

				}
}

//Add tweets to local storage

function addTweetLocalStorage(tweet){
		let tweets = getTweetsFromStorage();
		// Add the tweet into the array
		tweets.push(tweet);
	// Convert array into string
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage(){
		let tweets;
		const tweetsLS = localStorage.getItem('tweets');
	//Get the values, if null is returned then we create an empty array
	if(tweetsLS === null){
		tweets = [];
	}else{
		tweets = JSON.parse(tweetsLS);
	}
	return tweets;
}

function localStorageOnLoad(){
    let tweets = getTweetsFromStorage();
    console.log(tweets);
}