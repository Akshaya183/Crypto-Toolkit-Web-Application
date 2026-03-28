function generateKey(text, key){
    key = key.toUpperCase();
    let newKey = "";
    for(let i=0, j=0; i<text.length; i++){
        if(text[i].match(/[A-Z]/)){
            newKey += key[j % key.length];
            j++;
        } else {
            newKey += text[i];
        }
    }
    return newKey;
}

function encrypt(){
    let text = document.getElementById("text").value.toUpperCase();
    let key = document.getElementById("key").value.toUpperCase();

    if(text === "" || key === ""){
        alert("Please enter text and key!");
        return;
    }

    let result = "";
    let j = 0;

    for(let i=0; i<text.length; i++){
        let char = text[i];

        if(char >= 'A' && char <= 'Z'){
            let k = key[j % key.length];

            let encryptedChar = String.fromCharCode(
                ((char.charCodeAt(0) - 65 + (k.charCodeAt(0) - 65)) % 26) + 65
            );

            result += encryptedChar;
            j++;
        } else {
            result += char; // keep spaces
        }
    }

    document.getElementById("result").innerHTML = "Encrypted: " + result;
}

function decrypt(){
    let text = document.getElementById("text").value.toUpperCase();
    let key = document.getElementById("key").value.toUpperCase();

    if(text === "" || key === ""){
        alert("Please enter text and key!");
        return;
    }

    let result = "";
    let j = 0;

    for(let i=0; i<text.length; i++){
        let char = text[i];

        if(char >= 'A' && char <= 'Z'){
            let k = key[j % key.length];

            let decryptedChar = String.fromCharCode(
                ((char.charCodeAt(0) - 65 - (k.charCodeAt(0) - 65) + 26) % 26) + 65
            );

            result += decryptedChar;
            j++;
        } else {
            result += char;
        }
    }

    document.getElementById("result").innerHTML = "Decrypted: " + result;
}