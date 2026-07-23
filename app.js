let chat = [];

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");


// SEND MESSAGE

async function sendMessage(){

let text = input.value.trim();

if(!text) return;


addMessage(text,"user");

input.value="";


let loading = addMessage("Thinking...","ai");


try{


let response = await fetch(
"https://openrouter.ai/api/v1/chat/completions",
{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":"Bearer "+AI_CONFIG.API_KEY

},


body:JSON.stringify({

model:AI_CONFIG.MODEL,

messages:[

{

role:"system",

content:
"You are "+AI_CONFIG.NAME+
". You are an advanced AI assistant skilled in coding, cybersecurity, business, education and general knowledge."

},


{

role:"user",

content:text

}

]

})

});



let data = await response.json();



loading.remove();



if(data.choices){

addMessage(
data.choices[0].message.content,
"ai"
);

}

else{

addMessage(
"API Error: "+JSON.stringify(data),
"ai"
);

}



}

catch(error){

loading.remove();

addMessage(
"Connection error.",
"ai"
);

}


}




// ADD MESSAGE

function addMessage(text,type){


let div=document.createElement("div");


div.className="message "+type;


div.innerHTML=`

<div class="avatar">
${type=="ai"?"🤖":"👤"}
</div>


<div class="content">
${text}
</div>

`;


chatBox.appendChild(div);


chatBox.scrollTop=chatBox.scrollHeight;


return div;

}





// NEW CHAT

function newChat(){

chatBox.innerHTML="";

addMessage(
"New conversation started.",
"ai"
);

}





// CLEAR CHAT

function clearChat(){

chatBox.innerHTML="";

}




// SETTINGS

function toggleSettings(){

let box=document.getElementById("settings");

box.style.display =
box.style.display=="block"
?"none"
:"block";

}



function saveSettings(){

let name=
document.getElementById("aiName").value;


document.getElementById("aiTitle").innerText=name;


toggleSettings();

}




// THEME

function toggleTheme(){

document.body.classList.toggle("light");

}




// SIDEBAR MOBILE

function toggleSidebar(){

document
.getElementById("sidebar")
.classList.toggle("active");

}





// EXPORT CHAT

function exportChat(){

let text=
chatBox.innerText;


let file=
new Blob([text],
{type:"text/plain"});


let a=document.createElement("a");

a.href=
URL.createObjectURL(file);

a.download="HashGPT-chat.txt";

a.click();

}




// VOICE

function voiceInput(){


if(!("webkitSpeechRecognition" in window)){

alert("Voice not supported");

return;

}


let speech =
new webkitSpeechRecognition();


speech.lang="en-US";


speech.start();



speech.onresult=function(e){

input.value=
e.results[0][0].transcript;

};


}
