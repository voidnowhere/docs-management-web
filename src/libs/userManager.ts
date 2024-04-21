import {UserManager} from "oidc-client-ts";
import {OIDC_AUTHORITY, OIDC_CLIENT_ID, OIDC_POST_LOGOUT_REDIRECT_URI, OIDC_REDIRECT_URI} from "@/config";

const userManager = new UserManager({
    authority: OIDC_AUTHORITY,
    client_id: OIDC_CLIENT_ID,
    redirect_uri: OIDC_REDIRECT_URI,
    post_logout_redirect_uri: OIDC_POST_LOGOUT_REDIRECT_URI,
});

export default userManager