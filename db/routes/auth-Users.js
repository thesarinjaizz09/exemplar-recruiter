try {
    const router = require('express').Router();
    const users = require('../models/user-model');
    const companies = require('../models/company-model');
    const { header, validationResult } = require('express-validator');
    const jwt = require('jsonwebtoken');
    const verifyUser = require("../middlewares/verify-jwt-token");
    const encrypter = require("../../lib/encryption/encrypter")
    const decrypter = require("../../lib/decryption/decrypter")
    const dotenv = require('dotenv');

    dotenv.config()
    const jwt__Key = process.env.ER_JWT_KEY;

    router.post("/register", [
        header("name", "Please provide a valid name...").isLength({ min: 3 }),
        header("email", "Please provide a valid email...").isEmail(),
        header("password", "Please provide a valid password...").isLength({ min: 8 }),
        header("phNumber", "Please provide a valid phone password...").isLength({ min: 8 }),
        header("phCode", "Please provide a valid phone code...").isLength({ min: 1 }),
        header("residenceCountry", "Please provide a valid residence country...").isLength({ min: 1 }),
        header("accountType", "Please provide a valid accountType...").isLength({ min: 7 }),
    ], async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid credentials...",
                errors: errors.array(),
            });
        } else if (errors.isEmpty()) {
            try {
                if (req.header('serverPass') === process.env.SERVER_PASSWORD) {
                    if (req.header("accountType") === 'employee') {
                        let registeredUserEmail = await users.findOne({
                            _email: req.header('email')
                        })

                        if (registeredUserEmail) {
                            return res.status(409).json({
                                id: 16,
                                statusCode: 409,
                                password: process.env.CLIENT_PASSWORD,
                                message: "Email already registered...",
                            });
                        } else {
                            let newUser = await users.create({
                                _name: `${req.header('name').trim()} `,
                                _email: req.header('email').trim(),
                                _password: await encrypter(req.header('password').trim()),
                                _phCountryCode: req.header("phCode"),
                                _wpCountryCode: req.header("phCode"),
                                _wpNumber: req.header("phNumber"),
                                _phNumber: req.header("phNumber"),
                                _originCountry: req.header('residenceCountry'),
                                _accountType: req.header('accountType')
                            })

                            const payload = {
                                credentials: {
                                    id: newUser._id
                                }
                            }

                            var token = jwt.sign(payload, jwt__Key);

                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "User registered succesfully...",
                                password: process.env.CLIENT_PASSWORD,
                                credentials: {
                                    authToken: token,
                                },
                            });
                        }
                    } else if (req.header("accountType") === 'employer') {
                        let registeredCompanyEmail = await companies.findOne({
                            _email: req.header('email')
                        })

                        if (registeredCompanyEmail) {
                            return res.status(409).json({
                                id: 16,
                                statusCode: 409,
                                password: process.env.CLIENT_PASSWORD,
                                message: "Email already registered...",
                            });
                        } else {
                            let newCompany = await companies.create({
                                _companyName: `${req.header('name').trim()} `,
                                _email: req.header('email').trim(),
                                _password: await encrypter(req.header('password').trim()),
                                _phCountryCode: req.header("phCode"),
                                _phNumber: req.header("phNumber"),
                                _originCountry: req.header('residenceCountry'),
                                _accountType: req.header('accountType')
                            })

                            const payload = {
                                credentials: {
                                    id: newCompany._id
                                }
                            }

                            var token = jwt.sign(payload, jwt__Key);

                            return res.status(201).json({
                                id: 13,
                                statusCode: 201,
                                message: "User registered succesfully...",
                                password: process.env.CLIENT_PASSWORD,
                                credentials: {
                                    authToken: token,
                                },
                            });
                        }
                    } else {
                        return res.status(400).json({
                            id: 20,
                            statusCode: 400,
                            message: "False account type...",
                        });
                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-users register route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    router.get("/login", [
        header("email", "Please provide a valid email...").isEmail(),
        header("password", "Please provide a valid password...").isLength({ min: 8 }),
        header("accountType", "Please provide a valid account type...").isLength({ min: 6 }),
    ], async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(411).json({
                id: 2,
                statusCode: 411,
                message: "Please provide valid credentials...",
                errors: errors.array(),
            });
        } else if (errors.isEmpty()) {
            try {
                if (req.header('serverPass') === process.env.SERVER_PASSWORD) {
                    if (req.header('accountType') === "employee") {
                        let user = await users.findOne({
                            _email: req.header("email")
                        })

                        if (user) {
                            let password = decrypter(user._password);
                            console.log(password)
                            if (req.header('password') === password) {

                                const payload = {
                                    credentials: {
                                        id: user._id,
                                    },
                                };

                                var token = jwt.sign(payload, jwt__Key);

                                return res.status(201).json({
                                    id: 13,
                                    statusCode: 201,
                                    message: "User authenticated succesfully...",
                                    password: process.env.CLIENT_PASSWORD,
                                    credentials: {
                                        authToken: token,
                                    },
                                });
                            } else {
                                return res.status(400).json({
                                    id: 14,
                                    statusCode: 400,
                                    message: "Wrong credentials entered...",
                                });
                            }
                        } else {
                            return res.status(400).json({
                                id: 14,
                                statusCode: 400,
                                message: "Wrong credentials entered...",
                            });
                        }
                    } else if (req.header('accountType') === "employer") {
                        let company = await companies.findOne({
                            _email: req.header("email")
                        })

                        if (company) {
                            let password = decrypter(company._password);
                            if (req.header('password') === password) {

                                const payload = {
                                    credentials: {
                                        id: user._id,
                                    },
                                };

                                var token = jwt.sign(payload, jwt__Key);

                                return res.status(201).json({
                                    id: 13,
                                    statusCode: 201,
                                    message: "User authenticated succesfully...",
                                    password: process.env.CLIENT_PASSWORD,
                                    credentials: {
                                        authToken: token,
                                    },
                                });
                            } else {
                                return res.status(400).json({
                                    id: 14,
                                    statusCode: 400,
                                    message: "Wrong credentials entered...",
                                });
                            }
                        } else {
                            return res.status(400).json({
                                id: 14,
                                statusCode: 400,
                                message: "Wrong credentials entered...",
                            });
                        }
                    }
                } else {
                    return res.status(400).json({
                        id: 20,
                        statusCode: 400,
                        message: "Access denied...",
                    });
                }
            } catch (error) {
                console.log("Some error occured in the auth-users login route: ", error)
                return res.status(500).json({
                    id: 20,
                    statusCode: 500,
                    message: "Internal server error...",
                });
            }
        }
    })

    router.get("/user", verifyUser, async (req, res) => {
        try {
            if (req.header('serverPass') === process.env.SERVER_PASSWORD) {
                const userData = await users.findById(req.credentials.id).select("-_password"); // Selecting all the fields except the password one from the user document
                if (!userData) {
                    return res.status(400).json({
                        id: 18,
                        statusCode: 400,
                        message: 'No such user data...'
                    })
                } else {
                    return res.status(200).json({
                        id: 12,
                        statusCode: 200,
                        message: "User data fetched successfully...",
                        password: process.env.CLIENT_PASSWORD,
                        data: userData
                    })
                }
            } else {
                return res.status(400).json({
                    id: 20,
                    statusCode: 400,
                    message: "Access denied...",
                });
            }
        } catch (error) {
            console.log("Some error occured in the auth-users user route: ", error)
            return res.status(500).json({
                id: 20,
                statusCode: 500,
                message: "Internal server error...",
            });
        }
    })

    router.get("/company", verifyUser, async (req, res) => {
        try {
            if (req.header('serverPass') === process.env.SERVER_PASSWORD) {
                console.log(req.header('serverPass') === process.env.SERVER_PASSWORD)
                const companyData = await companies.findById(req.credentials.id).select("-_password"); // Selecting all the fields except the password one from the user document
                if (!companyData) {
                    return res.status(400).json({
                        id: 18,
                        statusCode: 400,
                        message: 'No such user data...'
                    })
                } else {
                    return res.status(200).json({
                        id: 12,
                        statusCode: 200,
                        message: "User data fetched successfully...",
                        password: process.env.CLIENT_PASSWORD,
                        data: companyData
                    })
                }
            } else {
                return res.status(400).json({
                    id: 20,
                    statusCode: 400,
                    message: "Access denied...",
                });
            }
        } catch (error) {
            console.log("Some error occured in the auth-users company route: ", error)
            return res.status(500).json({
                id: 20,
                statusCode: 500,
                message: "Internal server error...",
            });
        }
    })

    module.exports = router;
} catch (error) {
    console.log("Some error occured in the auth-users main branch: ", error)
}