// import { tweetsData } from './data.js'
// console.log(tweetsData)

//Tweets Data
const tweetsData = [   
        {
            handle: `@TrollBot6542`,
            profilePic: `images/troll.png`,
            likes: 27,
            retweets: 10,
            tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
                Guaranteed return on investment. HMU DMs open!!`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
        },    
        {
            handle: '@Elon ✅',
            profilePic: `images/elon-img.jpg`,
            likes: 6500,
            retweets: 234,
            tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
            replies: [
                      {
                    handle: `@TomCruise ✅`,
                    profilePic: `images/tcruise.jpg`,
                    tweetText: `Yes! Sign me up! 😎🛩`,
                },
                      {
                    handle: `@ChuckNorris ✅`,
                    profilePic: `images/chucknorris.jpg`,
                    tweetText: `I went last year😴`,
                },
            ],
            isLiked: false,
            isRetweeted: false,
            uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
        },
        {
            handle: `@NoobCoder12`,
            profilePic: `images/flower.jpg`,
            likes: 10,
            retweets: 3,
            tweetText: `Are you a coder if you only know HTML?`,
            replies: [
                {
                    handle: `@StackOverflower ☣️`,
                    profilePic: `images/overflow.jpg`,
                    tweetText: `No. Onviosuly not. Go get a job in McDonald's.`,
                },
                {
                    handle: `@YummyCoder64`,
                    profilePic: `images/love-img.jpg`,
                    tweetText: `You are wonderful just as you are! ❤️`,
                },
            ],
            isLiked: false,
            isRetweeted: false,
            uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
        },     
]

//Main JavaScript


const tweetInput = document.querySelector("#tweet-input");
const tweetBtn = document.getElementById("tweet-btn");


let hidden=true;
let hiddenbtn = true;
//UUID-Generator

const generateUUID = ()  =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );


//EventListener-All-other-clicks
document.addEventListener('click',(e) =>{
    if(e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes);
        
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet);
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply);
        
    }
    else if(e.target.id === 'tweet-btn'){
        handleClickBtn()
    }
});

//like-click
function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId;
    })[0];
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--;
        targetTweetObj.isLiked=false;
        
    }
    else{
        targetTweetObj.likes++;
        targetTweetObj.isLiked=true;
    }
    render(); 
}

//retweet-click
function handleRetweetClick(tweetId){
    const targetTweetObj=tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId;
    })[0]
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--;
        targetTweetObj.isRetweeted=false;
    }
    else{
        targetTweetObj.retweets++;
        targetTweetObj.isRetweeted = true;
    }
    render();
}

//data-function
function getFeedHtml(){
    let feedHtml=``;
    tweetsData.forEach((tweets)=>{
        let likedIconClass = '';
        let retweetIconClass='';
        let repliesHtml=``;
        if(tweets.isLiked){
            likedIconClass='liked'
        }
        if(tweets.isRetweeted){
            retweetIconClass='retweeted'
        }

        if(tweets.replies.length > 0){
            for(let i=0;i<tweets.replies.length;i++){
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                            <img src="${tweets.replies[i].profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${tweets.replies[i].handle}</p>
                                <p class="tweet-text">${tweets.replies[i].tweetText}</p>
                            </div>
                    </div>
                </div>`
            }  
        };

        feedHtml +=`
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweets.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweets.handle}</p>
                        <p class="tweet-text">${tweets.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply='${tweets.uuid}'></i>
                                ${tweets.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likedIconClass}"
                                data-likes='${tweets.uuid}'></i>
                                ${tweets.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" 
                                data-retweet='${tweets.uuid}'></i>
                                ${tweets.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweets.uuid}">
                    ${repliesHtml}
                </div>  
            </div>
            `
    });
    return feedHtml;
};

//tweet-button-click
function handleClickBtn(){
    const newTweet={
        handle: `@New-user`,
        profilePic: `images/love.jpg`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: generateUUID()
    }
    
    if(tweetInput.value){
        tweetsData.unshift(newTweet);
    }
    render();
    tweetInput.value='';
}

//reply-click
function handleReplyClick(replyId){
    if(hidden){
        document.querySelector(`#replies-${replyId}`).classList.remove("hidden");
        hidden=false;
    }
    else{
        document.querySelector(`#replies-${replyId}`).classList.add("hidden");
        hidden=true;
    }
    
}



function render(){
    document.querySelector(".feed").innerHTML=getFeedHtml();
}
render();