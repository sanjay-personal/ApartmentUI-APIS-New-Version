var encoder = function encoder(data) {

    // Create buffer object, specifying utf8 as encoding
    let bufferObj = Buffer.from(data, "utf8");

    // Encode the Buffer as a base64 string
    let base64String = bufferObj.toString("base64");

    console.log("The encoded base64 string is:", base64String);

    return base64String;

}

var decoder = function decoder(data) {


    // Create a buffer from the string
    let bufferObj = Buffer.from(data, "base64");

    // Encode the Buffer as a utf8 string
    let decodedString = bufferObj.toString("utf8");

    console.log("The decoded string:", decodedString);

    return decodedString


}

module.exports = {
    decoder: decoder,
    encoder: encoder
}