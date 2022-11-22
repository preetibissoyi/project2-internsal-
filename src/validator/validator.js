const mongoose = require("mongoose");

const isValidShortName = function (name) {
  if (/^[a-z]{2,10}/i.test(name)) {
    return true;
  }
};

const isValidFullName = function (fullname) {
  if (/^[a-zA-Z]+ [a-zA-Z]+$/i.test(fullname)) {
    return true;
  }
};
const isValidLink = function (link) {
  if (
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.#?&//=]*)/i.test(
      link
    )
  ) {
    return true;
  }
};

const isValidName = function (name) {
  if (/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/i.test(name)) {
    return true;
  }
};

const isValidId = function (data) {
  return mongoose.Types.ObjectId.isValid(data); // intern
};

const isValidEmail = function (mail) {
  if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      mail
    )
  ) {
    return true;
  }
};
const isValidMobile = function (mobile) {
  if (
    /^\d{0,3}[\- ]?[ ]*[\(]?\d{3}[\)]?[\- ]?[ ]*\d{3}[\- ]?[ ]*\d{4}$/.test(
      mobile
    )
  ) {
    return true;
  }
};

module.exports = {
  isValidEmail,
  isValidId,
  isValidMobile,
  isValidName,
  isValidShortName,
  isValidFullName,
  isValidLink,
};
