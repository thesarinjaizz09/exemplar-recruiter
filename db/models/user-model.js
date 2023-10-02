try {
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    const { Schema } = mongoose;

    dotenv.config()

    const languagesSchema = new Schema({
        _language: {
            type: String,
            default: "English"
        },
        _priority: {
            type: Number,
            default: 1
        }
    })

    const preferedJobsSchema = new Schema({
        _jobTitle: {
            type: String,
            default: "UI/UX Designer"
        },
        _jobCategory: {
            type: String,
            default: "IT"
        },
        _jobCountry: {
            type: String,
            default: "uk"
        },
        _jobSalary: {
            type: Number,
            default: 2000
        }
    })

    const skillsSchema = new Schema({
        _skillName: {
            type: String,
            default: ""
        }
    })

    const employmentSchema = new Schema({
        _designation: {
            type: String,
            default: ""
        },
        _organization: {
            type: String,
            default: ""
        },
        _currentCompany: {
            type: Boolean,
            default: false
        },
        _workStartMonth: {
            type: String,
            default: ""
        },
        _workStartYear: {
            type: Number,
            default: 2023
        },
        _workEndMonth: {
            type: String,
            default: ""
        },
        _workEndYear: {
            type: Number,
            default: 2023
        },
        _description: {
            type: String,
            default: ""
        }
    })

    const educationSchema = new Schema({
        _education: {
            type: String,
            default: ""
        },
        _course: {
            type: String,
            default: ""
        },
        _university: {
            type: String,
            default: ""
        },
        _year: {
            type: Number,
            default: ""
        }
    })

    const itSkillsSchema = new Schema({
        _skill: {
            type: String,
            default: ""
        },
        _version: {
            type: String,
            default: ""
        },
        _lastUsed: {
            type: String,
            default: ""
        },
        _experinceYear: {
            type: Number,
            default: 2023
        },
        _experienceMonth: {
            type: String,
            default: ""
        }
    })

    const projectsSchema = new Schema({
        _projectTitle: {
            type: String,
            default: ""
        },
        _employment: {
            type: String,
            default: ""
        },
        _client: {
            type: String,
            default: ""
        },
        _projectStatus: {
            type: Boolean,
            default: false
        },
        _projectStartMonth: {
            type: String,
            default: ""
        },
        _projectStartYear: {
            type: Number,
            default: 2023
        },
        _projectEndMonth: {
            type: String,
            default: ""
        },
        _projectEndYear: {
            type: Number,
            default: 2023
        },
        _projectDescription: {
            type: String,
            default: ""
        }
    })

    const mailsSchema = new Schema({
        _subject: {
            type: String,
            default: "Notification..."
        },
        _body: {
            type: String,
            default: ""
        },
        _sender: {
            type: String,
            default: ""
        }
    }, {
        timestamps: true
    })

    const UserSchema = new Schema({
        _name: {
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
        _wpCountryCode: {
            type: Number,
            default: 91
        },
        _wpNumber: {
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
        _preferCountry: {
            type: String,
            default: "Uk, Usa, In"
        },
        _age: {
            type: Number,
            default: 0
        },
        _professionalTitle: {
            type: String,
            default: "Professional title"
        },
        _currentSalary: {
            type: Number,
            default: 0
        },
        _expectedSalary: {
            type: Number,
            default: 0
        },
        _description: {
            type: String,
            default: ""
        },
        _address: {
            type: String,
            default: ""
        },
        _city: {
            type: String,
            default: ""
        },
        _district: {
            type: String,
            default: ""
        },
        _state: {
            type: String,
            default: ""
        },
        _postcode: {
            type: Number,
            default: 0
        },
        _gender: {
            type: String,
            default: "male"
        },
        _profilePicture: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO9cHtp-svWkCeIygi8if8bhZnkqbOMO8keQ&usqp=CAU"
        },
        _resumeHeadline: {
            type: String,
            default: ""
        },
        _profileSummary: {
            type: String,
            default: ""
        },
        _desiredIndustry: {
            type: String,
            default: ""
        },
        _desiredFucntionalArea: {
            type: String,
            default: ""
        },
        _desiredRole: {
            type: String,
            default: ""
        },
        _desiredJobType: {
            type: String,
            default: ""
        },
        _desiredEmploymentType: {
            type: String,
            default: ""
        },
        _desiredShift: {
            type: String,
            default: ""
        },
        _availabiltyMonth: {
            type: String,
            default: ""
        },
        _availabiltyYear: {
            type: Number,
            default: 2023
        },
        _desiredSalaryCurrency: {
            type: String,
            default: ""
        },
        _expectedSalaryLakh: {
            type: String,
            default: ""
        },
        _expectedSalaryThousand: {
            type: String,
            default: ""
        },
        _desiredLocation: {
            type: String,
            default: ""
        },
        _desiredIndustry: {
            type: String,
            default: ""
        },
        _martialStatus: {
            type: String,
            default: ""
        },
        _passportNumber: {
            type: String,
            default: ""
        },
        _assistance: {
            type: String,
            default: ""
        },
        _workPermit: {
            type: String,
            default: ""
        },
        _dayOfBirth: {
            type: Number,
            default: 1
        },
        _monthOfBirth: {
            type: String,
            default: ""
        },
        _yearOfBirth: {
            type: Number,
            default: 2000
        },
        _resume: {
            type: String,
            default: ""
        },
        _mails: [mailsSchema],
        _projects: [projectsSchema],
        _itSkills: [itSkillsSchema],
        _education: [educationSchema],
        _employment: [employmentSchema],
        _keySkills: [skillsSchema],
        _preferedJobs: [preferedJobsSchema],
        _languages: {
            type: String,
            default: "English"
        }
    }, {
        timestamps: true
    })

    const Users = mongoose.model('users', UserSchema);
    module.exports = Users;
} catch (err) {
    console.log(err)
}