import * as React from 'react';
import { NavMenu } from './NavMenu';
import { useCookies } from 'react-cookie'
import jwt from 'jwt-decode'
import { LoginModal } from './AuthentificationComponents/LoginModal';
import { CreateAccountPage } from './AuthentificationComponents/CreateAccountPage';


//cum vrem sa arate paginile


export const Layout = (props) => {
    const [cookies] = useCookies(['token'])
    const [authentificated, setAuthentificated] = React.useState(false)
    const createAccount = window.location.href.split("/").pop() === 'create-account' ? 1 : 0
    React.useEffect(() => {
        console.log(cookies.token)
        console.log('----------------------------------------------------------')
        console.log(createAccount)
        if (cookies.token === null) {
            setAuthentificated(false)
            return
        }
        if (!cookies.token) {
            setAuthentificated(false)
            return
        }
        const user = jwt(cookies.token);
        //console.log(jwt)
        const date = new Date(user.exp * 1000);
        if (new Date() > date) {
            setAuthentificated(false)
            return
        }
        setAuthentificated(true)
    }, [])
    return (<div>
        {authentificated === true &&
            <div>
                <NavMenu />
                {props.children}</div>}
        {(authentificated === false && createAccount)&&
            <CreateAccountPage/>}
        {(authentificated === false && !createAccount)&&
            <div>
                <LoginModal />
            </div>}
    </div>
    )
}

