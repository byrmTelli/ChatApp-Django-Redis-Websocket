const roomName=JSON.parse(document.getElementById('room-name').textContent);
const conversation=document.getElementById('conversation')
const sendButton=document.getElementById('send')
const inputField=document.getElementById('comment')
const user=JSON.parse(document.getElementById('user').textContent)

//websocket başlatalım

const chatSocket= new WebSocket("ws://"+window.location.host+"/ws/chat/"+roomName+"/");

//mesaj geldiğinde


chatSocket.onmessage=function(e){
    const data=JSON.parse(e.data)
    console.log("bu mesaj "+data.user+" tarafından gönderildi.")


    if (user == data.user) {
        var message = `<div class="row message-body">
            <div class="col-sm-12 message-main-sender">
                <div class="sender">
                    <div class="message-text">
                        ${data.message}
                    </div>
                    <span class="message-time pull-right">
                        ${data.created_date}
                    </span>
                </div>
            </div>
        </div>`;
    } else {
        var message = `<div class="row message-body">
            <div class="col-sm-12 message-main-receiver">
                <div class="receiver">
                    <div class="message-text">
                        ${data.message}
                    </div>
                    <span class="message-time pull-right">
                        ${data.created_date}
                    </span>
                </div>
            </div>
        </div>`;
    }
    
    conversation.innerHTML+=message
};


chatSocket.onclose=function(e){
    console.error("socket beklenmedik şekilde kapandı.")
}


inputField.focus();


inputField.onkeyup=function(e){
    if(e.keyCode==13){
        sendButton.click()
    }
}


sendButton.onclick=function (e){
   const message=inputField.value 
   chatSocket.send(JSON.stringify({
    "message":message
   }))

   inputField.value="";

}