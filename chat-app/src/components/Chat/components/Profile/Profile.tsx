import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/store';

import './Profile.scss';
import caret from '../../../../assets/images/caret.png';
import activeDot from '../../../../assets/images/active_dot.png';
import settingIcon from '../../../../assets/images/settings_btn.png'
import { logout, updateProfile } from '../../../../store/authSlice';
import Modal from '../../../Modal/Modal';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const user = useAppSelector((state: any) => state.auth.user);

    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [firstName, setFirstName] = useState<string>(user.firstName);
    const [lastName, setLastName] = useState<string>(user.lastName);
    const [email, setEmail] = useState<string>(user.email);
    const [gender, setGender] = useState<string>(user.gender);
    const [password, setPassword] = useState<string>("password");
    const [avatar, setAvatar] = useState("");

    const logoutEvent = () => {
        dispatch<any>(logout(null));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        const form = { firstName: firstName, lastName: lastName, email: email, gender: gender, avatar: avatar } as {[key: string]: string};
        if (password.length > 0) form.password = password;
        const formData = new FormData();

        for (const key in form) {
            formData.append(key, form[key]);
        }
        
        const updateProfileReq = await dispatch<any>(updateProfile(formData));
        if (updateProfileReq.payload === undefined) dispatch(logout(null));
        setShowProfileModal(false);
    }
    
    return (
        <div id="profile">
            <img width='60' height='60' src={user.avatar} alt='User avatar' />
            <img id="active-dot" src={activeDot} alt='activeDot' />

            <div className='details'>
                <h4 className='name m-0'>{user.firstName} {user.lastName}</h4>
                <h5 className='job m-0'>Senior UI/UX Designer</h5>
                <h6 onClick={() => setShowProfileOptions(!showProfileOptions)} className='status m-0'>Online <img src={caret} alt="" /></h6>
            </div>
            <div className='settings'>
                <img onClick={() => setShowProfileModal(true)} src={settingIcon} alt="settingIcon" />
            </div>
            {
                showProfileOptions &&
                    <div id="profile-options-1">
                        <p onClick={logoutEvent}>Logout</p>
                    </div>
            }

            {
                showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}>
                        <Fragment key="header">
                            <h3 className="m-0">Update profile</h3>
                        </Fragment>
                        <Fragment key="body">
                            <form action="">
                                <div className="input-field mb-1">
                                    <input onChange={event => setFirstName(event.target.value)} value={firstName} type="text" placeholder="First Name" required />
                                </div>
                                <div className="input-field mb-1">
                                    <input onChange={event => setLastName(event.target.value)} value={lastName} type="text" placeholder="Last Name" required />
                                </div>
                                <div className="input-field mb-1">
                                    <select onChange={event => setGender(event.target.value)} value={gender} required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="input-field mb-1">
                                    <input onChange={event => setEmail(event.target.value)} value={email} type="email" placeholder="Email" required />
                                </div>
                                <div className="input-field mb-2">
                                    <input onChange={event => setPassword(event.target.value)} value={password} type="password" placeholder="Password" required minLength={8}/>
                                </div>
                                <div className="input-field mb-2">
                                    <input onChange={(event: any) => setAvatar(event.target.files[0])} type="file" />
                                </div>
                            </form>
                        </Fragment>
                        <Fragment key="footer">
                            <button className="btn-success" onClick={submitForm}>UPDATE</button>
                        </Fragment>
                    </Modal>
            }
        </div>
    );
}

export default Profile;