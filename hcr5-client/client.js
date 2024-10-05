/**
 * Tworzy nasłuchującego clienta
 */

// Konfiguracja gniazda serwera. Pole 'NAME' jest dowolną nazwą 
// służącą do wewnętrznej identyfikacji serwera.
const SERVER_INFO = {
    NAME: 'hcr5-api',
    HOST: '172.28.181.103',
    PORT: 8001
};

var STX = "", ETX = "";
var keepConnection = false;

// Funkcje reakcji na zdarzenia.
var eventCallback = {
    // Odebranie danych.
    onDataReceive : function (data) {
        var rcvStr = Buffer.toString(data);
        console.log(">> on recv : ", rcvStr);

        if(rcvStr === "disconnect") {
            console.log("disconnect")
            socketDisconnect(SERVER_INFO.NAME);
            keepConnection = false;
        }

        var POSE_CURR = getCurrentPose('flange');
        if (rcvStr[0] == 'x') {
            if (rcvStr[1] == '+') {
                POSE_CURR.x += Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            } else if (rcvStr[1] == '-') {
                POSE_CURR.x -= Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            }
        } else if (rcvStr[0] == 'y') {
            if (rcvStr[1] == '+') {
                POSE_CURR.y += Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            } else if (rcvStr[1] == '-') {
                POSE_CURR.y -= Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            }
        } else if (rcvStr[0] == 'z') {
            if (rcvStr[1] == '+') {
                POSE_CURR.z += Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            } else if (rcvStr[1] == '-') {
                POSE_CURR.z -= Convert.stringToNumberArray(rcvStr.slice(2), ' ', 1)[0];
            }
        } else if (rcvStr[0] == 'r') {
            if (rcvStr[1] == 'x') {
                if (rcvStr[2] == '+') {
                    POSE_CURR.rx += Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                } else if (rcvStr[2] == '-') {
                    POSE_CURR.rx -= Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                }
            } else if (rcvStr[1] == 'y') {
                if (rcvStr[2] == '+') {
                    POSE_CURR.ry += Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                } else if (rcvStr[2] == '-') {
                    POSE_CURR.ry -= Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                }
            } else if (rcvStr[1] == 'z') {
                if (rcvStr[2] == '+') {
                    POSE_CURR.rz += Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                } else if (rcvStr[2] == '-') {
                    POSE_CURR.rz -= Convert.stringToNumberArray(rcvStr.slice(3), ' ', 1)[0];
                }
            }
        }
        moveLinear('flange', POSE_CURR);

        console.log(">> cmd done.");
    },

    // nawiązanie połączenia z serwerem.
    onConnection : function () {
        sendMessageToServer('test')
        console.log(">> on connection");
    },

    // Zamknięcie polączenia z serwerem.
    onClose : function () {
        console.log(">> on close");
    }


};

// Funkcja wysylająca wiadomość do serwera.
function sendMessageToServer(msg) {
    socketSend(SERVER_INFO.NAME, msg);
}

// Funkcja ustawiajaca parametry gniazda i nawiązująca komunikację z serwerem.
function setupServer() {
    // Stworzenie nowego gniazda do połączenia z serwerem.
    socketCreate(SERVER_INFO.NAME, SERVER_INFO.HOST, SERVER_INFO.PORT);
    // Ustawienie prefiksów i sufiksów.
    socketSetPrefixSuffix(SERVER_INFO.NAME, STX, ETX);

    socketAddListener(SERVER_INFO.NAME, "data", eventCallback.onDataReceive);
    socketAddListener(SERVER_INFO.NAME, "connection", eventCallback.onConnection);
    socketAddListener(SERVER_INFO.NAME, "close", eventCallback.onClose);

    // Otwarcie gniazda.
    socketOpen(SERVER_INFO.NAME);
    // Oczekiwanie na połączenie z serwerem. Drugi parametr określa maksymalny czas 
    // oczekiwania na nawiązanie połączenia w milisekundach.
    
    // let isConnected = false;
    // while(!isConnected) {
    //     // socketWaitConnection(SERVER_INFO.NAME, 5000);
    //     sleep(1000)
    //     console.log("test")
    // }
    // socketWaitConnection(SERVER_INFO.NAME, 10000);
    keepConnection = true;
    while(keepConnection) {
        sleep(1000)
        console.log('spie se')
    }
    // while()

}

function serverListen() {
    var count = 1;

    while (count <= 3) {
        var isSuccess = sendMessageToServer("GET:\n");
        if (isSuccess === false) {
            console.log("failed to send target");
            break;
        }

        count++;
        wait(500);
    }
}

function stopListening() {
    socketDisconnect(SERVER_INFO.NAME);
}

setupServer();
// serverListen();