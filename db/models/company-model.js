try {
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const { Schema } = mongoose;

    dotenv.config()

    const candidatesResume = new Schema({
        _userId: {
            type: String,
            default: ""
        },
        _note: {
            type: String,
            default: ""
        },
    }, {
        timestamps: true
    })

    const jobTags = new Schema({
        _tag: {
            type: String,
            default: ""
        }
    })

    const jobsSchema = new Schema({
        _jobTitle: {
            type: String,
            default: ""
        },
        _email: {
            type: String,
            default: ""
        },
        _jobTags: [jobTags],
        _jobType: {
            type: String,
            default: ""
        },
        _experience: {
            type: Number,
            default: 1
        },
        _minimumSalary: {
            type: Number,
            default: 0
        },
        _maximumSalary: {
            type: Number,
            default: 100
        },
        _region: {
            type: String,
            default: ""
        },
        _location: {
            type: String,
            default: ""
        },
        _files: {
            type: String,
            default: ""
        },
        _description: {
            type: String,
            default: ""
        }
    }, {
        timestamps: true
    })

    const CompanySchema = new Schema({
        _companyName: {
            type: String,
            required: true
        },
        _email: {
            type: String,
            required: true
        },
        _password: {
            type: String,
            required: true
        },
        _verified: {
            type: Boolean,
            default: false
        },
        _phCountryCode: {
            type: Number,
            default: 91
        },
        _phNumber: {
            type: Number,
            default: 0
        },
        _accountType: {
            type: String,
            default: "employee"
        },
        _originCountry: {
            type: String,
            default: 0
        },
        _description: {
            type: String,
            default: ""
        },
        _profilePicture: {
            type: String,
            default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAElBMVEXm7fa1wdDQ2ubI0t/a4+2/ytj1bxs9AAACCElEQVR4nO2b61bDIBAGy2Xf/5VtG6hQIAY17hJnfulGe+bkbPYLCb3dAAAAAAAAAAAAAAAAAAAAYIoYJERtiVnEPZDgFzKP7sU64oX0Zr6C+Lv0dsqNi/ekzffKSNq0+J602Sb/Ujo1uSnzQ9LWeuWw9IOgbZuYknZeW3cD6b8ihj5iWXpIWFH6hvRfYUB6dMF18JV08A9ERXp/lNVI8R85uoOCtJ+R3ky3H/MHxBWl/UrS6R4pykrSTp6kX1aRrkAaaaR/SdpHH6Mv7zybSikd/D3Ig0qM+1qoWwk9aV8d1JLOlbhTMRfj+by20n5PWjfGJTlLU+n2dH7UoR7jRS73K1WMB/lc5jLykEb6P0tvy+syxptKPT2Kp2Ra0nUuvxTbSv3nunM6V4jxs6XrXC4qRbCba4+0vnZup2LuQjyCvZGHNNJXkx7FeDE+zE2PNsYHwV4fNBbj0lQuE+O60leJcSHGkUYa6QPS7SYU8W+V+pVcEPVneeMY785pG09Nc2VyNa67sP2mtLUY320PG+9cUi47t1Op326pbVJZfeQhjfTVpKWN8fdKJW1hZ02e03MxrryHKVeWivHxatxwjE/e5RnZATl5IRLjSCP9c9lE92sJQ54X3/DAnVO/EDWlOsV52nPnd4rzGmVJ6SXb437L4M/hRGUAAAAAAAAAAAAAAAAAAACAIR8d+hm+4P9RtgAAAABJRU5ErkJggg=="
        },
        _category: {
            type: String,
            default: ""
        },
        _city: {
            type: String,
            default: ""
        },
        _postcode: {
            type: Number,
            default: ""
        },
        _facebookLink: {
            type: String,
            default: ""
        },
        _twitterLink: {
            type: String,
            default: ""
        },
        _googleLink: {
            type: String,
            default: ""
        },
        _linkedinLink: {
            type: String,
            default: ""
        },
        _canditadesResume: [candidatesResume],
        _jobs: [jobsSchema]
    }, {
        timestamps: true
    })

    const Companies = mongoose.model('companies', CompanySchema);
    module.exports = Companies;
} catch (err) {
    console.log(err)
}