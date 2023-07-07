import React, { useEffect, useState } from 'react';
import styles from './AdminPanel.module.css'; 
import { Link, Outlet } from 'react-router-dom';
import { AddUserByAdmin, deleteUserByAdmin, getUserList, updateUserByAdmin } from '../../../api/APIRequests';
import { Toaster, toast } from 'react-hot-toast';

const AdminPannel = () => {
  return (
    <div className=' border border-2' style={{width: '100%', boxSizing:'border-box'}} >
      <div className="row">
        <div className={`col-md-3 ${styles.left_col}`}>
            {/* manage admin */}
            <Link to='/admin/adminpanel/manageuser' class={`card p-4 mt-5 ms-auto me-auto ${styles.card}`} style={{width:'80%', height:'fit-content'}}>
                Manage User
            </Link> 
             {/*manage user  */}
            <Link to='/admin/adminpanel/manageadmin' class={`card p-4 mt-5 ms-auto me-auto ${styles.card}`} style={{width:'80%', height:'fit-content'}}>
                Manage admin
            </Link>  
        </div>

        <div className={`col-md-9 ${styles.right_col}`} >
            <Outlet/>
        </div>
      </div>
    </div>
  );
}

// initial form data
const initialState = {
    firstName: '', 
    lastName:'', 
    email:'', 
    password:'', 
}

// manage user
export const ManageUser = () => {
    const [formData, setFormData] = useState({firstName:'', lastName:'', password:'', email:''}); 
    const [userList, setUserList] = useState([]); 

    const [selectedUser, setSelectedUser] = useState({}); 
    const [edit, setEdit] = useState(false); 
    const [userAdded, setUserAdded] = useState(false);  
    const [deleted, setDeleted] = useState(false); 
    
    useEffect(() =>{
        const {email, password, firstName, lastName, _id} = selectedUser; 
        setFormData({firstName:firstName, lastName, email,}); 
    }, [selectedUser]); 

    useEffect(() => {
        const userList = getUserList();
        userList.then(data => {
            setUserList(data);
        })
    }, [userAdded, edit, deleted]); 

    // handle delete button 
    const handleDeleteButton = (id) => {
        console.log(id)
        const deleteUserPromise = deleteUserByAdmin(id); 
        toast.promise(deleteUserPromise, {
            loading:<b>deleting...</b>, 
            success: (data) => <b>user deleted successfully</b>, 
            error: (erro) => <b>Can't delete user. Something went wrong!</b>
        }).then(() => {
            setDeleted(!deleted); 
        })
    }

    // handle edit button
    const handleUserSelection = (id) => {
        const filteredUser = userList.filter(user => user._id === id); 
        console.log(filteredUser); 
        setSelectedUser(...filteredUser); 
        setEdit(true); 
    }

    // handle update button 
    const handleUpdateButton = (id) => {
        // update actoin
        const updateUserPromise = updateUserByAdmin({id ,...formData}); 
        toast.promise(updateUserPromise, {
            loading: <b>updating...</b>, 
            success: (data) => <b>Updated successfully</b>, 
            error: (error) => <b>Some went wrong!</b>
        }).then(() => {
            setEdit(false); 
            setSelectedUser({}); 
            setFormData(initialState); 
        })
    }

    // handle input change button
    const handleChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    // handle add user button
    const handleAddButton = e => {
        e.preventDefault(); 
        
        const addUserPromise = AddUserByAdmin(formData); 
        toast.promise(addUserPromise, {
            loading: <b>Adding...</b>, 
            success: (data) => <b>{data.message}</b>, 
            error: (error) => <b>Failed to create user</b>
        }).then(() => {
            setUserAdded(!userAdded); 
            setFormData(initialState); 
        })
    }

    return (
        <div>
            <Toaster/>
            <div className="container-fluid mt-4">
                <form className='ms-auto me-auto' style={{maxWidth:'800px'}}>
                    <div className="d-flex gap-5 " >
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="FirstiName" className="col-form-label fw-bold">First Name</label>
                            </div>
                            <div className="col-auto">
                                <input onChange={handleChange} value={formData.firstName} type="text" id="FirstiName" className="form-control" name='firstName' placeholder='firstName' />
                            </div>
                        </div>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="lastName" className="col-form-label fw-bold">Last Name:</label>
                            </div>
                            <div className="col-auto">
                                <input onChange={handleChange} value={formData.lastName} type="text" id="lastName" className="form-control" name="lastName" placeholder='lastName' />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-5 mt-4 " >
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="email" className="col-form-label fw-bold">Email    </label>
                            </div>
                            <div className="col-auto">
                                <input onChange={handleChange} value={formData.email} type="text" id="email" className="form-control" name='email' placeholder='email' />
                            </div>
                        </div>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor="password" className="col-form-label fw-bold">Password</label>
                            </div>
                            <div className="col-auto">
                                <input onChange={handleChange} value={formData.password} type="text" id="password" className="form-control" name='password' placeholder='password' />
                            </div>
                        </div>
                    </div>
                   {(edit) ? (
                        <>
                            <button onClick={() => handleUpdateButton(selectedUser._id)} type="button" className='btn btn-primary mt-3' >Update</button>
                            <button type="button" onClick={() => {
                                setEdit(false); 
                                setFormData(initialState)
                            }} className='btn btn-primary mt-3 ms-4' >cancel</button>
                        </>
                       ): (
                        <button onClick={handleAddButton}  type="button" className='btn btn-primary mt-3' >Add User</button>
                   )}
                </form>
            </div>
            <hr/>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email </th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className='d-flex justify-content-evenly'>
                                    <button onClick={() => handleUserSelection(user._id)} type='button' className='btn btn-secondary'>Edit</button>
                                    <button onClick={(e) => handleDeleteButton(user._id)} type='button' className='btn btn-danger'>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}

export const ManageAdmin = () => {
    return (
        <div>
            <h3>Manage user</h3>
        </div>
    )
}

export default AdminPannel;
