/**
 * Created by horyu1234 on 2017-11-14.
 */
const axios = require('axios');
const GLOBAL = require("./global.json");

exports.verifyRecaptcha = async function (responseToken, remoteIp, callback) {
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${GLOBAL.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${responseToken}&remoteip=${remoteIp}`;
    try {
        const response = await axios.get(verifyUrl);
        callback(response.data.success || false);
    } catch (e) {
        callback(false);
    }
};