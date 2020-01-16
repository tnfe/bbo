/**
 * Returns true if the given string is an absolute URL, false otherwise.
 */
const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str);

export default isAbsoluteURL;
