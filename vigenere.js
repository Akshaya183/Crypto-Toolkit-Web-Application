// Check if number is prime
function isPrime(n){
    if(n <= 1) return false;

    for(let i = 2; i <= Math.sqrt(n); i++){
        if(n % i === 0){
            return false;
        }
    }
    return true;
}


// Modular exponentiation
function power(base, exp, mod){
    let result = 1;

    for(let i = 0; i < exp; i++){
        result = (result * base) % mod;
    }

    return result;
}


// Main function
function calculate(){
    let p = parseInt(document.getElementById("p").value);
    let g = parseInt(document.getElementById("g").value);
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);

    // Empty input check
    if(isNaN(p) || isNaN(g) || isNaN(a) || isNaN(b)){
        alert("Please enter all values!");
        return;
    }

    // Positive value check
    if(p <= 1 || g <= 0 || a <= 0 || b <= 0){
        alert("Please enter valid positive values!");
        return;
    }

    // Prime check
    if(!isPrime(p)){
        alert("Please enter a valid prime number for p!");
        return;
    }

    // g < p check
    if(g >= p){
        alert("Primitive root (g) must be less than p!");
        return;
    }

    // a, b < p check
    if(a >= p || b >= p){
        alert("Private keys (a and b) must be less than p!");
        return;
    }

    // Step 1: Public keys
    let A = power(g, a, p);
    let B = power(g, b, p);

    // Step 2: Shared keys
    let key1 = power(B, a, p);
    let key2 = power(A, b, p);

    // Output
    document.getElementById("result").innerHTML =
        "<b>Public Key A:</b> " + A + "<br>" +
        "<b>Public Key B:</b> " + B + "<br><br>" +
        "<b>Shared Key (A):</b> " + key1 + "<br>" +
        "<b>Shared Key (B):</b> " + key2;
}
