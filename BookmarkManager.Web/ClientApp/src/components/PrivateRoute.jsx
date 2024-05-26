import { Navigate } from "react-router-dom";
import { useBookmark } from "../BookmarkContext";

const PrivateRoute = ({children}) => {
    const {user} = useBookmark();

    return user ? children : <Navigate to='/login' replace />;
}


export default PrivateRoute;