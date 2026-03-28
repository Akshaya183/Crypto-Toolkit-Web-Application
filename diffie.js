function power(base, exp, mod){
    let result = 1;
    for(let i = 0; i < exp; i++){
        result = (result * base) % mod;
    }
    return result;
}

function calculate(){
    let q = parseInt(document.getElementById("q").value);
    let g = parseInt(document.getElementById("g").value);
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);

    if(isNaN(q) || isNaN(g) || isNaN(a) || isNaN(b)){
        alert("Please enter all values!");
        return;
    }

    // Step 1: Public keys
    let A = power(g, a, q);
    let B = power(g, b, q);

    // Step 2: Shared secret
    let key1 = power(B, a, q);
    let key2 = power(A, b, q);

    document.getElementById("result").innerHTML =
        "Public Key A: " + A + "<br>" +
        "Public Key B: " + B + "<br><br>" +
        "Shared Key (A): " + key1 + "<br>" +
        "Shared Key (B): " + key2;
}