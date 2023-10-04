import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setProfile } from "../../redux/Slices/userSlice";
import "./editName.scss";
import Button from "../button/button";
import axios from "axios";

function EditName() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName);
  const [editUserName, setEditUserName] = useState(userName);
  const userProfile = useSelector((state) => state.user);
  const [isEditMode, setEditMode] = useState(false);
  useEffect(() => {
    if (token != '') {
      axios("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },        
      })
        .then((res) => {
          dispatch(setProfile(res.data.body));
        })
        .catch(() => {
        });
    }
  }, [token, dispatch]);
  const handleEditClick = () => {
    setEditMode(true);
  };
  console.log(editUserName)
  const handleCancelClick = () => {
    setEditMode(false);
  };
  console.log(editUserName)
  const handleSaveClick = e => {
    e.preventDefault();
    axios(`http://localhost:3001/api/v1/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({
        userName: `${editUserName}`
      }),
    })
      .then((res) => {
        console.log(res.data.body)
        dispatch(setUserName(res.data.body.userName));
        setEditUserName(res.data.body.userName);
      })
      .catch(() => {
      });
    setEditMode(false);
  };
  return (
    <div className="editName">
      <div className="user_welcome">
        <h1>
          Welcome back <br />
          {isEditMode ? (
            <form className="input_editName">
              <input
                type="text" 
                min={5}
                required
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
               <Button text="Save" className="edit-button" onClick={handleSaveClick} />
            </form>
          ) : (
            userProfile && `${userProfile.firstName} ${userProfile.lastName} !`
          )}
        </h1>
        {isEditMode ? (
            <Button text="Cancel" className="edit-button" onClick={handleCancelClick} />
        ) : (
          <div className="button_editName">
            <Button text="Edit Name" className="edit-button" onClick={handleEditClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditName;