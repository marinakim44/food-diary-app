import UserPool from "./cognitoConfig";

export const logout = () => {
  const user = UserPool.getCurrentUser();

  if (user) {
    user.signOut();
  }
};
