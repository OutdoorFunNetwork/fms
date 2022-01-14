type LocalUser = {
  accessToken: string;
  refreshToken: string;
};

const AuthHeader: { 'x-access-token': string } | {} = () => {
  const user: LocalUser | null = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')!) : null;

  if (user && user.accessToken) {
    return {
      'x-access-token': user.accessToken,
    };
  } else {
    return {};
  }
}

export default AuthHeader;