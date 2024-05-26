import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const BookmarkContext = createContext();

const BookmarkContextComponent = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        }

        loadUser();
    }, []);

    if(isLoading) {
        return <div className="container" style={{marginTop: 80, textAlign: "center"}}>Loading...</div>
    }

    return (
        <BookmarkContext.Provider value={{ user, setUser}}>
            {children}
        </BookmarkContext.Provider>
    )
}


const useBookmark = () => useContext(BookmarkContext);

export { BookmarkContextComponent, useBookmark };