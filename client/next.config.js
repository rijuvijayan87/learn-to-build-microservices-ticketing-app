module.exports = {
    webpack: (config) => {
        config.watchOptions.poll = 300; // instructing next.js to poll every 300ms for any saved changes to be deployed
        return config;
    },
};