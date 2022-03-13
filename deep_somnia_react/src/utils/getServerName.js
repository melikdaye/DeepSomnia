const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () => {
    return isDevelopment
        ? "http://localhost:5000"
        : `http://${window.location.hostname}/api`;
};

export {getServer};