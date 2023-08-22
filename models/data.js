import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true
    },
    moduleDesc: {
        type: String,
        required: true
    },
    moduleContents: {
        type: [
            new mongoose.Schema({
                type: {
                    pathName: {
                        type: String,
                        required: true
                    },
                    pathLink: {
                        type: String,
                        required: true
                    },
                    markAsDone: {
                        type: Boolean,
                        required: true,
                        default: false
                    },
                    dateAdded: {
                        type: Date,
                        required: true,
                        default: Date.now
                    },
                    rating: {
                        type: Number,
                        min: 1,
                        max: 5,
                        default: null
                    }
                }
            })
        ],
        required: true,
        default: []
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model('Data',dataSchema);
