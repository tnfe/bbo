import setCookie from './set_cookie';

const deleteCookie = (name) => {
  setCookie(name, '', {
    hour: -1
  });
};

export default deleteCookie;
