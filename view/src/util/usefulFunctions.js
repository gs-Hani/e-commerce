// make minimum age required 18 years =========================================================
export function maxBirthDate () {
    const            birthDay = new Date();
                     birthDay.setFullYear( birthDay.getFullYear() - 18 );
    const  newDate = birthDay.toLocaleString('en-GB', { timeZone: 'UTC' }).split(",");
    return newDate[0].split("/").reverse().join("-");
}

// validate password ==========================================================================
export function matchPassword (password1) {  
    const password2 = document.getElementById("password").value;
    const password3 = document.getElementById("confirm-password").value;
    if   (password1 === password2 && password1 === password3) { 
           document.getElementById("submit").disabled = false;
           document.getElementById("submit").value    = "Submit";
    } else { 
           document.getElementById("submit").disabled = true;
           document.getElementById("submit").value    = "passwords don't match";
    }  
}
