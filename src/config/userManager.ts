import {UserManager} from "oidc-client-ts";

const userManager = new UserManager({
    authority: 'http://localhost:8090/realms/doc-management',
    client_id: 'doc-web-client',
    redirect_uri: 'http://localhost:5173',
    post_logout_redirect_uri: 'http://localhost:5173',
});

export default userManager