module.exports = function () {
    return {
        text: 'Please input zip code:',
        newMapping: {
            "*": require('./zipcodeToBarcode')
        }
    }
};