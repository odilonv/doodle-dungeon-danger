function checkUppercase(password) {
    return /[A-Z]/.test(password) ? null : "The password must contain at least one uppercase letter.";
}

function checkSpecialCharacter(password) {
    return /[!@#$&*%_-]/.test(password) ? null : "The password must contain at least one special character.";
}

function checkDigit(password) {
    return /[0-9]/.test(password) ? null : "The password must contain at least one digit.";
}

function checkIsEmail(email) {
    if (!email) return "Email address is required.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Invalid email address.";
}

function checkIsPhoneNumber(phoneNumber) {
    if (!phoneNumber) return "Phone number is required.";
    return /^\d{10}$/.test(phoneNumber) ? null : "Invalid phone number.";
}

function checkAge(dateOfBirth) {
    if (!dateOfBirth) return "Date of birth is required.";
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    else if (age < 18)
        return "You must be at least 18 years old to register.";
    else if (age > 114)
        return "You are too old.";
    return null;
}

function checkOnlyAlphabets(name) {
    if (!name) return "This field is required.";
    return /^[a-zA-ZÀ-ÿ- ]+$/.test(name) ? null : "This field must contain only letters.";
}

// Can contain spaces, only alphabets, and hyphens
function checkCity(city) {
    if (!city) return "City is required.";
    return /^[a-zA-Z- ]+$/.test(city) ? null : "City must contain only letters.";
}

function checkPassword(password) {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    const uppercase = checkUppercase(password);
    if (uppercase !== null) return uppercase;
    const specialCharacter = checkSpecialCharacter(password);
    if (specialCharacter !== null) return specialCharacter;
    const digit = checkDigit(password);
    if (digit !== null) return digit;
    return null;
}

export { checkIsEmail, checkCity, checkPassword, checkIsPhoneNumber, checkAge, checkUppercase, checkSpecialCharacter, checkDigit, checkOnlyAlphabets };
