import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./cognitoConfig";

export const resetPassword = (email, verificationCode, newPassword) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        console.log("Password reset successful!");
        resolve("Password reset successful!");
      },
      onFailure: (err) => {
        console.error("Password reset failed:", err);
        reject(err);
      },
    });
  });
};
