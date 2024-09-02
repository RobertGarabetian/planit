"use server";
import Script from "next/script";

const GoogleSignIn = () => {
  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async></Script>

      <div
        id="g_id_onload"
        data-client_id="186577469833-1pca5lb11tl76b7afp1pu4btu1nt3ghi.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="OAuthFunction"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
};

export default GoogleSignIn;
