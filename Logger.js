const fs = require('fs');
const moment = require( 'moment' );
const path = require('path');

let dir = path.join(__dirname, '/logs'); console.log(dir);

if (!fs.existsSync(dir)){
    try {
        fs.mkdirSync(dir);
    } catch ( error ) {
        console.log('Erro ao criar diretorio para Logs!');
    }
}

class Logger {
    info(msg) {
        const now = moment().utcOffset("-03:00").format( 'YYYY-MM-DD' );
        
        fs.appendFile(`${dir}info-` + now + '.log', "INFO: " + msg + '\n', (err) => {
            if (err) {
                console.log('Erro ao gravar log logs/server.log', err);
            }
        });
    }

    /*
    debug(url, request, response, route) {
        const requestBody = JSON.parse(JSON.stringify(request))
        const responseBody = JSON.parse(JSON.stringify(response))

        if (requestBody.password) {
            delete requestBody.password;
            
            requestBody.password = "ENCRYPTED";
        }

        if (responseBody.cpf) {
            responseBody.cpf = "*****" + responseBody.cpf.slice(5);
        }

        if (Object.values(requestBody)[0].cpfCliente) {
            let cpf = Object.values(requestBody)[0].cpfCliente;
            let newCpf = "*****" +  cpf.substring(5)

            Object.values(requestBody)[0].cpfCliente = newCpf
        }
             
        if (requestBody.sessionToken) {
            requestBody.sessionToken = "**************" + requestBody.sessionToken.slice(15);
        }

        const now = moment().utcOffset("-03:00").format('YYYY-MM-DD');
        const nowWithMinutes = moment().utcOffset("-03:00").format('YYYY-MM-DD HH:mm:ss');

        
        fs.appendFile(`${dir}routes-` + now + '.log',
         "ROUTE: " + route + '\n' + 'DATE: ' + nowWithMinutes + '\n' + 'URL: ' + url + '\n' + 'REQUEST: ' + JSON.stringify(requestBody) + '\n' + 'RESPONSE: ' + JSON.stringify(responseBody)  + '\n' + '----' + '\n', 
         (err) => {           
            if (err) {
                console.log('Erro ao gravar log logs/server.log');
            }
        });
    }
    */
}

module.exports = new Logger();