import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WebSocket = () => {
    const [ws,setWs] = useState(null)

        
    var username = makeId(5);
    var stompClient;
    var sessionId = "";
    var localTS = 0;

    function makeId(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function connect(event) {

        if(username) {
            var socket = new SockJS('http://localhost:8081/websocket');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, onConnected, onError);
        }
        event.preventDefault();

    }


    function onConnected() {
        console.log("1");
        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/public', onMessageReceived);
        //console.log("session id: ", sessionId);
        stompClient.subscribe('/user/' + username + '/msg', onMessageReceived);

        // Tell your username to the server
        stompClient.send("/app/chat.register",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )
    }

    function onError(){}


    function sendMessage(){
        localTS += 1;
        let CtoS_Msg = {
            sender: username,
            sessionId: sessionId,
            type: 'OP',
            ts: localTS,
            op: null
        };
        stompClient.send("/app/chat.send", {}, JSON.stringify(CtoS_Msg));
    }

    function onMessageReceived(payload){
        let StoC_msg = JSON.parse(payload.body);
        if(StoC_msg.type === 'JOIN') {
            if(StoC_msg.sender === username){
                sessionId = StoC_msg.sessionId;
                //stompClient.subscribe('/user/' + sessionId + '/msg', onMessageReceived);
            }
        }
    }
    return(
        <div>
            <input type='button' value='連線' onClick={connect} />
            <input type='button' value='送出訊息' onClick={sendMessage} />
        </div>
    )
}

export default WebSocket;