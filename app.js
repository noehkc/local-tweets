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

	this.reset();
}

// Remove tweet
function removeTweet(e){
	if(e.target.classList.contains('remove-tweet')){
					e.target.parentElement.remove();
				}

	//remove from storage
	removeTweetLocalStorage( e.target.parentElement.textContent );			
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
	
	
	//loop through local storage array and print value
	tweets.forEach(function(tweet){
		const removeBtn = document.createElement('a');
		removeBtn.classList = 'remove-tweet';
		removeBtn.textContent = "X";
		
		//create an <li> element
		const li = document.createElement('li');
		li.textContent = tweet;
			//Add the remove button to each tweet
		li.appendChild(removeBtn);
		tweetList.appendChild(li);
	})
}

//Remove tweet from local storage

function removeTweetLocalStorage(tweet){
	//get tweets from storage

	let tweets = getTweetsFromStorage();

	//Remove the x from the tweet
	const tweetDelete = tweet.substring(0, tweet.length -1);

	// Loop through the tweets and remove the tweet that is equal

	tweets.forEach(function(tweetLS, index){
		if(tweetDelete === tweetLS){
			tweets.splice(index, 1);
		}
	});
	//save the data
	localStorage.setItem('tweets', JSON.stringify(tweets));
}