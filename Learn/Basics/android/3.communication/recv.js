/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Send and receive data to and from instrumented process.

Target: id.reversing.classop
*/

'use strict';

var i = 2;
function handleMessage(message)
{
    // Accessing object is easy.
    // The sent information will be hold in "payload" field.
    send(message.magic * i);
    i++;
    recv(handleMessage);
}

/*
Receiving asynchonously.
When data is received, the event is handled by a callback.
*/
recv(handleMessage);
console.log("Script running");