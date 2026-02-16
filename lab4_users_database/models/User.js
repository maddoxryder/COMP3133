const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },

        username: {
            type: String,
            required: [true, "username is required"],
            minlength: [4, "username must be at least 4 characters"],
            maxlength: [100, "username cannot exceed 100 characters"]
        },

        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "invalid email address"]
        },

        address: {
            street: {
                type: String,
                required: [true, "address.street is required"]
            },
            suite: {
                type: String,
                required: [true, "address.suite is required"]
            },
            city: {
                type: String,
                required: [true, "address.city is required"],
                match: [/^[A-Za-z\s]+$/, "city must contain only letters and spaces"]
            },
            zipcode: {
                type: String,
                required: [true, "address.zipcode is required"],
                match: [/^\d{5}-\d{4}$/, "zipcode format must be 12345-1234"]
            },
            geo: {
                lat: {
                    type: String,
                    required: [true, "address.geo.lat is required"]
                },
                lng: {
                    type: String,
                    required: [true, "address.geo.lng is required"]
                }
            }
        },

        phone: {
            type: String,
            required: [true, "phone is required"],
            match: [/^\d-\d{3}-\d{3}-\d{4}$/, "phone format must be 1-123-123-1234"]
        },

        website: {
            type: String,
            required: [true, "website is required"],
            match: [/^https?:\/\/.+/i, "website must be a valid URL starting with http or https"]
        },

        company: {
            name: {
                type: String,
                required: [true, "company.name is required"]
            },
            catchPhrase: {
                type: String,
                required: [true, "company.catchPhrase is required"]
            },
            bs: {
                type: String,
                required: [true, "company.bs is required"]
            }
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
