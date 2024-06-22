export const getFirstLetter = (word) => {
    // Check if the word is not empty
    if (word && typeof word === 'string' && word.length > 0) {
      // Return the first character of the word
      return word[0];
    } else {
      // Return an empty string or handle the error as per your requirement
      return '';
    }
  }
  
