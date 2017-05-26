// Parses JSON strings like JSON.parse

const { literal, optional, and, or, param } = require("../parser");

const jsonObject = literal('UNIMPLEMENTED');
const jsonArray = literal('UNIMPLEMENTED');
const jsonString = literal('UNIMPLEMENTED');
const jsonNumber = literal('UNIMPLEMENTED');

const parseJson = or(jsonObject, jsonArray, jsonString, jsonNumber);

module.exports = {
    parseJson
}
