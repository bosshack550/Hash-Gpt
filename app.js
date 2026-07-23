const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");


// SEND MESSAGE

async function sendMessage(){

    let text = input.value.trim();

    if(!text) return;


    addMessage(text,"user");

    input.value="";


    let loading = addMessage(
        "Thinking...",
        "ai"
    );


    try{


        let response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {

        method:"POST",

        headers:{

        "Content-Type":"application/json",

        "Authorization":
        "Bearer "+AI_CONFIG.API_KEY

        },


        body:JSON.stringify({

        model:AI_CONFIG.MODEL,


        messages:[

        {
        role:"system",
        content:
        "You are Hash GPT, an advanced AI assistant for coding, cybersecurity, business, education and general questions."
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
        "API Error. Check API key or credits.",
        "ai"
        );

        }



    }

    catch(error){

        loading.remove();

        addMessage(
        "Connection error: "+error.message,
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

${type==="ai"?"🤖":"👤"}

</div>


<div class="content">

${text}

</div>

`;


chatBox.appendChild(div);


chatBox.scrollTop =
chatBox.scrollHeight;


return div;

}





// NEW CHAT

function newChat(){

chatBox.innerHTML="";

addMessage(
"New chat started.",
"ai"
);

}





// CLEAR

function clearChat(){

chatBox.innerHTML="";

}





// SETTINGS

function toggleSettings(){

let s=document.getElementById("settings");

s.style.display =
s.style.display==="block"
?"none"
:"block";

}



function saveSettings(){

let name =
document.getElementById("aiName").value;


document.getElementById("aiTitle").innerText=name;


toggleSettings();

}





// DARK LIGHT

function toggleTheme(){

document.body.classList.toggle("light");

}




// SIDEBAR

function toggleSidebar(){

document
.getElementById("sidebar")
.classList.toggle("active");

}





// EXPORT

function exportChat(){

let data =
chatBox.innerText;


let file =
new Blob(
[data],
{type:"text/plain"}
);


let link=document.createElement("a");


link.href=
URL.createObjectURL(file);


link.download="HashGPT.txt";


link.click();

}




// VOICE

function voiceInput(){


if(!window.webkitSpeechRecognition){

alert("Voice not supported");

return;

}


let speech =
new webkitSpeechRecognition();


speech.lang="en-US";


speech.start();



speech.onresult=function(e){

input.value =
e.results[0][0].transcript;

};


}
