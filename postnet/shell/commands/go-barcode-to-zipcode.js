module.exports = function () {
    return {
        text: 'Please input bar code:',
        newMapping: {
            '*': require('./barcode-to-zipcode')
        }
    };

}