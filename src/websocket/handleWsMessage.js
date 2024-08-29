const handleWsMessage = (message) => {
    try {
        if(!message.type){
            throw {error: "No message type"}
        }

        switch(message.type){
            case "moveAxis":
                handleMoveAxis(message);
        }

    } catch(err) {
        console.error(err);
    }
}

const handleMoveAxis = (message) => {
    console.log(message);
}


module.exports = handleWsMessage;