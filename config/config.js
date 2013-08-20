
module.exports = {

    development : {
        db:'mongodb://localhost/sorry',
        logger: "DEBUG"

    },

    test : {
        db:'mongodb://localhost/sorry',
        logger: "DEBUG"
    },

    production: {
        db:'mongodb://localhost/sorry',
        logger: "ERROR"
    }

}