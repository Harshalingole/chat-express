import { dummyUsers } from "./data";
import UserList from "./user-list";

const OnlineAvailableUserList = () => {
  return (
    <section className="bg-white/70 rounded-lg col-span-2 h-full shadow-xl p-4 border-r overflow-y-auto">
      <UserList  />
    </section>
  );
};

export default OnlineAvailableUserList;
