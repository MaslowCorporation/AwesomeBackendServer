
/* PLOP_INJECT_IMPORT */

/* PLOP_INJECT_GLOBAL_CODE */

// The function StringIsEmpty checks if a given string is empty.
// An empty string here is considered to be null, or contains only whitespaces, tabs, newlines etc. 
// If the string has any character other than these, it is considered to be not empty.

// Function Definition
export function StringIsEmpty(str) {
    
    // Firstly, we check if the string is null.
    // If it is null, we return true because it is considered as empty.
    if (str == null) {
        return true;
    }
    
    // If the string is not null, we move to the next check where we trim() the string.
    // The trim() function in javascript removes the whitespaces, tabs, newlines etc, from both the start and end of the string.
    // After trim() operation, if the string length is 0, it means that there is no other character present in the string other than whitespaces, tabs, newlines etc.
    // Hence, in this case we return true because the string is considered as empty.
    if (str.trim().length == 0) {
        return true;
    }
    
    // If neither of the two conditions above hold true,
    // It means that the string is not null and it has at least one character other than the whitespaces, tabs, newlines etc.
    // Hence, in this case the string is not empty and we return false.
    return false;
}

