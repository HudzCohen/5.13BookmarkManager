import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios';

const Home = () => {

    const [popularBookmarks, setPopularBookmarks] = useState([]);


    useEffect(() => {
        const getPopularBookmarks = async () => {
           const { data } = await axios.get('/api/bookmark/getpopularbookmarks');
           setPopularBookmarks(data);
        }

        getPopularBookmarks();
    }, []);
    
    return (
        <div className="container" style={{marginTop: 80, textAlign: 'center'}}>
           <main role="main" className='pb-3'>
            <div>
                <h1>Welcome to the React Bookmark App!</h1>
                <h3>Top most 5 bookmarked links</h3>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                       {popularBookmarks.map(pb => (
                        <tr key={pb}>
                            <td>
                                <a href={pb.url} target='_blank'>{pb.url}</a></td>
                            <td>{pb.valueOccurence}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
           </main>
        </div>
    );
};

export default Home;