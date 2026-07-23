// ===============================
// HASH GPT APP.JS
// Powered By Crypt Hashir
// ===============================

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const API_KEY = "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";

const MODEL_ID = "openai/gpt-oss-20b:free";

// Elements

const messages =
document.getElementById("messages");

const input =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendButton");

const typing =
document.getElementById("typing");

const welcome =
document.getElementById("welcome");

const sidebar =
document.getElementById("sidebar");

const menuBtn =
document.getElementById("menuButton");

const closeSidebar =
document.getElementById("closeSidebar");

const overlay =
document.getElementById("overlay");

const themeBtn =
document.getElementById("themeButton");

const darkBtn =
document.getElementById("darkTheme");

const lightBtn =
document.getElementById("lightTheme");

const newChat =
document.getElementById("newChat");




// State

let isGenerating = false;

let chatHistory = [];




// ===============================
// LOADING SCREEN
// ===============================


window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader")
.style.display="none";

},3000);

});




// ===============================
// SIDEBAR
// ===============================


menuBtn.onclick=()=>{

sidebar.classList.add("active");

overlay.classList.add("active");

};


closeSidebar.onclick=closeMenu;

overlay.onclick=closeMenu;



function closeMenu(){

sidebar.classList.remove("active");

overlay.classList.remove("active");

}




// ===============================
// THEME SYSTEM
// ===============================


function setTheme(mode){

if(mode==="light"){

document.body.classList.add("light");

localStorage.setItem(
"theme",
"light"
);

}

else{

document.body.classList.remove("light");

localStorage.setItem(
"theme",
"dark"
);

}

}



const savedTheme =
localStorage.getItem("theme");


if(savedTheme){

setTheme(savedTheme);

}



themeBtn.onclick=()=>{

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
?"light"
:"dark"
);

};



darkBtn.onclick=()=>setTheme("dark");

lightBtn.onclick=()=>setTheme("light");





// ===============================
// SEND MESSAGE
// ===============================


sendBtn.onclick=sendMessage;



input.addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendMessage();

}

});






async function sendMessage(){


if(isGenerating)
return;


const text =
input.value.trim();


if(!text)
return;



addMessage(
text,
"user"
);


input.value="";


welcome.style.display="none";



chatHistory.push({

role:"user",

content:text

});



await askAI(text);



}







// ===============================
// OPENROUTER AI
// ===============================



async function askAI(userText){


isGenerating=true;

sendBtn.disabled=true;


typing.classList.remove("hidden");



try{


const response =
await fetch(
API_URL,
{

method:"POST",


headers:{


"Authorization":
`Bearer ${API_KEY}`,

"Content-Type":
"application/json"

},



body:JSON.stringify({

model:MODEL_ID,


messages:[


{

role:"system",

content:

`You are Hash GPT.

You were developed by Crypt Hashir.

Answer professionally.

Use headings, spacing, bullet points and code blocks when needed.`

},


...chatHistory


]

})


});





const data =
await response.json();



let reply;



if(data.choices){

reply =
data.choices[0]
.message
.content;

}

else{

reply =
"API error. Check your API key and model ID.";

}



typing.classList.add("hidden");



addMessage(
reply,
"ai"
);



chatHistory.push({

role:"assistant",

content:reply

});



}

catch(error){


typing.classList.add("hidden");


addMessage(

"Connection error. Please check your API configuration.",

"ai"

);


console.error(error);


}




isGenerating=false;

sendBtn.disabled=false;


}








// ===============================
// MESSAGE DISPLAY
// ===============================



function addMessage(text,type){


const div =
document.createElement("div");


div.className =
"message "+
(type==="user"
?"user-message"
:"ai-message");



div.innerHTML =
formatText(text);



messages.appendChild(div);



messages.scrollTop =
messages.scrollHeight;


}







// ===============================
// BASIC MARKDOWN FORMAT
// ===============================



function formatText(text){


return text

.replace(
/\*\*(.*?)\*\*/g,
"<strong>$1</strong>"
)

.replace(
/\n/g,
"<br>"
)

.replace(
/`(.*?)`/g,
"<code>$1</code>"
);


}







// ===============================
// NEW CHAT
// ===============================



newChat.onclick=()=>{


messages.innerHTML="";


chatHistory=[];


welcome.style.display="block";


};







// ===============================
// AUTO RESIZE INPUT
// ===============================



input.addEventListener(
"input",
()=>{

input.style.height="auto";


input.style.height =
input.scrollHeight+"px";


});







// ===============================
// DEVELOPER QUESTION HANDLER
// ===============================


function checkDeveloperQuestion(text){


const q=text.toLowerCase();



if(

q.includes("who developed") ||

q.includes("who created") ||

q.includes("developer")

){


return "Hash GPT was developed by Crypt Hashir.";

}


return null;


}
