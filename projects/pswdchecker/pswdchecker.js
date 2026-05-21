const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const strength = document.getElementById("strength");

const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "password123",
    "abc123",
    "welcome"
];

passwordInput.addEventListener("input", checkPassword);

function checkPassword() {

    const pswd = passwordInput.value;
    const username = usernameInput.value.toLowerCase();

    let score = 0;

    // LENGTH CHECK
    if(pswd.length < 8){
        score -= 5;
    }
    else if(pswd.length < 12){
        score += 1;
    }
    else if(pswd.length < 15){
        score += 3;
    }
    else{
        score += 5;
    }

    // USERNAME CHECK
    if(pswd.toLowerCase().includes(username) && username !== ""){
        score -= 5;
    }

    // COMMON PASSWORD CHECK
    for(let weak of commonPasswords){
        if(pswd.toLowerCase().includes(weak)){
            score -= 10;
        }
    }

    // SEQUENCE CHECK
    if(hasSequence(pswd)){
        score -= 4;
    }

    // REPEATED CHARACTERS
    if(hasRepeated(pswd)){
        score -= 3;
    }

    // CHARACTER DIVERSITY
    if(/[A-Z]/.test(pswd)) score++;
    if(/[a-z]/.test(pswd)) score++;
    if(/[0-9]/.test(pswd)) score++;
    if(/[^A-Za-z0-9]/.test(pswd)) score++;

    // PASSPHRASE BONUS
    if(pswd.includes(" ") && pswd.length > 15){
        score += 3;
    }

    // DISPLAY RESULT
    if(pswd.length === 0){
        strength.innerText = "";
    }
    else if(score <= 0){
        strength.innerText = "WEAK";
        strength.style.color = "red";
    }
    else if(score <= 4){
        strength.innerText = "OKAY";
        strength.style.color = "orange";
    }
    else if(score <= 9){
        strength.innerText = "STRONG";
        strength.style.color = "green";
    }
    else{
        strength.innerText = "VERY STRONG";
        strength.style.color = "blue";
    }
}

function hasSequence(pswd){

    let lower = pswd.toLowerCase();

    return lower.includes("1234") ||
           lower.includes("abcd") ||
           lower.includes("qwerty") ||
           lower.includes("asdf");
}

function hasRepeated(pswd){

    let count = 1;

    for(let i=1;i<pswd.length;i++){

        if(pswd[i] === pswd[i-1]){

            count++;

            if(count >= 4){
                return true;
            }

        } else {
            count = 1;
        }
    }

    return false;
}
// toggle eye icon
const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");
const icon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
    if(password.type === "password"){
        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});