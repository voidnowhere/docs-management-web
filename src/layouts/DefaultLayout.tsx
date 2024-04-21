import {Link, Outlet} from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {useAuth} from "react-oidc-context";
import LogoutButton from "@/components/features/auth/LogoutButton.tsx";
import LoginButton from "@/components/features/auth/LoginButton.tsx";
import {Suspense} from "react";
import LoadingPage from "@/pages/LoadingPage.tsx";

function DefaultLayout() {
    const auth = useAuth()

    return (<>
        <div className='flex mt-2 p-2'>
            <div className='flex justify-center grow'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to='/' className={navigationMenuTriggerStyle()}>
                                Home
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem hidden={!auth.isAuthenticated}>
                            <Link to='/docs' className={navigationMenuTriggerStyle()}>
                                Docs
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem hidden={!auth.isAuthenticated}>
                            <Link to='docs/shared' className={navigationMenuTriggerStyle()}>
                                Shared
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <LoginButton/>
                <LogoutButton/>
            </div>
        </div>
        <Suspense fallback={<LoadingPage/>}>
            <Outlet/>
        </Suspense>
    </>)
}

export default DefaultLayout