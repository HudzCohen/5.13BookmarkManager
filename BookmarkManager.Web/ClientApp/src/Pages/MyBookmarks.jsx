import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookmark } from "../BookmarkContext";


const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [title, setTitle] = useState();
    const [editId, setEditId] = useState();
    const { user } = useBookmark();


    const loadBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        setBookmarks(data);
    }

    useEffect(() => {
        loadBookmarks();
    }, []);

    const onDeleteClick = async (id) => {
        await axios.post(`/api/bookmark/deletebookmark?id=${id}`);
        loadBookmarks();
    }

    const onEditClick = async (b) => {
        setEditId(b.id);

    }

    const onUpdateClick = async (bookmark) => {
        bookmark.title = title;
        await axios.post('/api/bookmark/updatebookmark', bookmark);
        setEditId('');
        setTitle('');
        loadBookmarks();
    }


    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: 20 }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back, {user.firstName} {user.lastName}</h1>
                            <Link to="/addbookmark" className="btn btn-dark">Add a Bookmark</Link>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks.map(b => (
                                    <tr key={b.id}>
                                        <td>
                                            {editId !== b.id && b.title}
                                            {editId === b.id && <input type="text" className="form-control" placeholder="Title"
                                                value={title} onChange={e => setTitle(e.target.value)} />}
                                        </td>
                                        <td>
                                            <a href={b.url} target="_blank">{b.url}</a>
                                        </td>
                                        <td>
                                            {editId !== b.id && <button className="btn btn-success" onClick={() => { onEditClick(b) }}>Edit Title</button>}
                                            {editId === b.id && <><button className="btn btn-warning" onClick={() => { onUpdateClick(b) }}>Update</button>
                                                <button className="btn btn-dark" style={{ marginLeft: 10 }} onClick={() => {setEditId(''), setTitle('') }}>Cancel</button>
                                            </>}
                                            <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => { onDeleteClick(b.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyBookmarks;



{/* {bookmarks.map(b => (
                                    <tr key={b.id}>
                                        <td>
                                            {!editMode && b.title}
                                            {editMode && <input type="text" className="form-control" placeholder="Title"
                                                value={title} onChange={e => setTitle(e.target.value)} />}
                                        </td>
                                        <td>
                                            <a href={b.url} target="_blank">{b.url}</a>
                                        </td>
                                        <td>
                                            {!editMode && <button className="btn btn-success" onClick={() => {setEditMode(true), setEditIds(...editIds, b.id)}}>Edit Title</button>}
                                            {editMode && <><button className="btn btn-warning" onClick={() => { onUpdateClick(b) }}>Update</button>
                                                <button className="btn btn-dark" style={{ marginLeft: 10 }} onClick={() => {setEditMode(false), setEditIds(editIds.filter(i => i !== id))}}>Cancel</button>
                                            </>}
                                            <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={() => { onDeleteClick(b.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))} */}

