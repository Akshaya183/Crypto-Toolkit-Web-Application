// RC4 Algorithm (KSA + PRGA)
function rc4(text, key){
    let S = [];
    let j = 0;
    let result = "";

    // Step 1: Initialization
    for(let i = 0; i < 256; i++){
        S[i] = i;
    }

    // Step 2: KSA
    for(let i = 0; i < 256; i++){
        j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;

        // swap
        let temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }

    // Step 3: PRGA
    let i = 0;
    j = 0;

    for(let k = 0; k < text.length; k++){
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;

        // swap
        let temp = S[i];
        S[i] = S[j];
        S[j] = temp;

        let t = (S[i] + S[j]) % 256;
        let keyStream = S[t];

        result += String.fromCharCode(text.charCodeAt(k) ^ keyStream);
    }

    return result;
}


// HEX conversion (for clean UI)
function toHex(str){
    let result = "";
    for(let i = 0; i < str.length; i++){
        result += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
}

function fromHex(hex){
    let result = "";
    for(let i = 0; i < hex.length; i += 2){
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result;
}


// MAIN FUNCTION
function process(){
    let text = document.getElementById("text").value.trim();
    let key = document.getElementById("key").value.trim();

    if(text === "" || key === ""){
        alert("Please enter text and key!");
        return;
    }

    // block numeric-only input
    if(/^[\d\s'"]+$/.test(text)){
        alert("Please enter meaningful text, not only numbers!");
        return;
    }

    // check hex
    let isHex = /^[0-9a-fA-F]+$/.test(text);

    let input = isHex ? fromHex(text) : text;

    let output = rc4(input, key);

    let finalOutput = isHex ? output : toHex(output);

    document.getElementById("result").innerHTML =
        isHex ? "Decrypted: " + finalOutput : "Encrypted: " + finalOutput;
}