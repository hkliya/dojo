module.exports = function () {
    return {
        text: 'Please input zip code:',
        newMapping: {
            '*': require('./zipcode-to-barcode')
        }
    };
}