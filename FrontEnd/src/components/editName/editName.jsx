import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setProfile } from "../../redux/Slices/userSlice";
import "./editName.scss";
import Button from "../button/button";
import axios from "axios";
import Alert from "../alert/alert";

function EditName() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [editUserName, setEditUserName] = useState("");
  const userProfile = useSelector((state) => state.user);
  const [isEditMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  }, [token, dispatch]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = () => {
    axios(`http://localhost:3001/api/v1/user/profile`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        "userName": editUserName,
      }),
    })
      .then((res) => {
        dispatch(setUserName(res.data.body.userName));
        setEditUserName(res.data.body.userName);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
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
                style={{ width: "200px" }}
                type="text"
                required
                minLength={5}
                placeholder={`Your last username: ${userProfile.userName}`}
                onChange={(e) => setEditUserName(e.target.value)}
              />
              <Button text="Save" className="edit-button" onClick={handleSaveClick} />
            </form>
          ) : userProfile.userName ? (
            userProfile.userName
          ) : (
            `${userProfile.firstName} ${userProfile.lastName} !`
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
      {errorMessage && <Alert alert={errorMessage} />}
    </div>
  );
}

export default EditName;