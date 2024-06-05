const { default: mongoose } = require("mongoose");

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected ...');
    } catch (error) {
        console.log(error.message ?? "Failed DB Connection !");
        process.exit(1);
    }
}

module.exports = {
    ConnectToDB
}