import { useSelector } from "react-redux";
import { getUserName } from "./userSlice";

function UserName() {
  const userName = useSelector(getUserName);

  if (!userName) return null;
  return (
    <div className="text-sm font-semibold hidden md:block">{userName}</div>
  );
}

export default UserName;
