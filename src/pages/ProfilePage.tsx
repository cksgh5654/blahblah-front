import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/user.api";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { email: nickname } = useParams();

  useEffect(() => {
    if (!nickname) return;
    getUserInfo(nickname) //
      .then(setUser);
  }, [nickname]);
  return <p>profile</p>;
};

export default ProfilePage;
