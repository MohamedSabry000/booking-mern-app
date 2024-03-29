import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],
    },
    // rooms: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Room'
    // }]
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        default: false,
        type: Boolean,
        required: false
    },
}); 

export default mongoose.model('Hotel', HotelSchema);