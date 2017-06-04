const SrOneOrMoreLettersRegExp = new RegExp("^[A-Za-zžđšćčŽĐŠĆČ ]+$");
const EngOneOrMoreLettersOrDigitsRegExp = new RegExp("^[0-9A-Za-z]+$");
const EmailRegExp = new RegExp("^[0-9A-Za-z]+\@[a-z]+\.[a-z]{2,4}$");

export default {
    isLettersSr: (test) => {
      return genericTest(test, SrOneOrMoreLettersRegExp);
    },

    isLettersOrNumbers: (test) => {
      return genericTest(test, EngOneOrMoreLettersOrDigitsRegExp);
    },

    isEmail: (test) => {
      return genericTest(test, EmailRegExp);
    }
}

const genericTest = (testString, pattern) => {
  if(testString && typeof testString === 'string' && testString.length) {
    return pattern.test(testString.trim());
  } else {
    return false;
  }
};
