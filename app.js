// ===============================
// HASH GPT APP.JS
// Gemini API Version
// Powered By Crypt Hashir
// ===============================


// ===============================
// GEMINI CONFIG
// ===============================

const GEMINI_KEY = "AQ.Ab8RN6KOYjV2832GtnfratLwdXzKyeWULat1-e3PDx1wObU8uw";

const GEMINI_MODEL = "gemini-2.5-flash";

const API_URL =
`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;


// ===============================
// ELEMENTS
// ===============================

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


// ===============================
// STATE
// ===============================

let isGenerating = false;

let chatHistory = [];


// ===============================
// LOADING SCREEN
// ===============================

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader =
document.getElementById("loader");

if(loader)
loader.style.display="none";

},3000);

});


// ===============================
// SIDEBAR
// ===============================

if(menuBtn){

menuBtn.onclick=()=>{

sidebar.classList.add("active");

if(overlay)
overlay.classList.add("active");

};

}


if(closeSidebar){

closeSidebar.onclick=closeMenu;

}


if(overlay){

overlay.onclick=closeMenu;

}


function closeMenu(){

sidebar.classList.remove("active");

if(overlay)
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


if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
?"light"
:"dark"
);

};

}


if(darkBtn)
darkBtn.onclick=()=>setTheme("dark");


if(lightBtn)
lightBtn.onclick=()=>setTheme("light");

// ===============================
// SEND MESSAGE
// ===============================


if(sendBtn){

sendBtn.onclick=sendMessage;

}


if(input){

input.addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendMessage();

}

});

}




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


if(welcome)
welcome.style.display="none";



chatHistory.push({

role:"user",

content:text

});


await askAI(text);


}





// ===============================
// GEMINI AI
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

"Content-Type":"application/json"

},


body:JSON.stringify({

contents:[

{

role:"user",

parts:[

{

text:

`You are Hash GPT.

You were developed by Crypt Hashir.

Answer professionally.
Help with AI, coding, cybersecurity, business, study and life advice.

Use headings, bullet points and code blocks when needed.

Conversation:
${chatHistory.map(
m=>m.role+": "+m.content
).join("\n")}

User:
${userText}`

}

]

}

]

})

}


);



const data =
await response.json();



alert(JSON.stringify(data));



let reply;



if(data.candidates){

reply =
data.candidates[0]
.content
.parts[0]
.text;

}

else{


reply =
"Gemini API error. Check your API key or model.";


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


console.error(error);


typing.classList.add("hidden");



addMessage(

"Connection error. Check Gemini API configuration.",

"ai"

);


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
// TEXT FORMAT
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


if(newChat){

newChat.onclick=()=>{


messages.innerHTML="";


chatHistory=[];


if(welcome)
welcome.style.display="block";


};

}





// ===============================
// AUTO RESIZE INPUT
// ===============================


if(input){

input.addEventListener(

"input",

()=>{


input.style.height="auto";


input.style.height =
input.scrollHeight+"px";


}

);

}
