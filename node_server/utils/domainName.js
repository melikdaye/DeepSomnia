
function removeHttp(url) {
    return url.replace(/^https?:\/\//, '');
}

const getNodeServerName = (request) => {
    let hostName;
    if (request.headers.host === "http://localhost:5000")
        hostName = `${request.headers.host}`
    else
        hostName = `${request.headers.host}/api`

    return hostName
}
const getClientServerName = (request) =>{
    let clientName;
    if (removeHttp(request.headers.origin) === request.headers.host){
        clientName = request.headers.host
    }
    else{
        clientName = request.headers.origin
    }
    return clientName
}

module.exports = {getNodeServerName,getClientServerName}