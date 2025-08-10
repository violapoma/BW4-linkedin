import { useEffect, useState } from "react";
import { useToken } from "../contexts/tokenContext";
import AnotherUserPreview from "./AnotherUserPreview";

function MoreProfiles({ currentID }) {
  console.log('more profiles currentID', currentID);
  const allProfilesEP = "https://striveschool-api.herokuapp.com/api/profile/";
  const { token } = useToken();

  const [users, setUsers] = useState([]);

  const fetchProfiles = async () => {
    console.log('more profiles, token', token)
    try {
      const res = await fetch(allProfilesEP, {
        headers: {
          Authorization: token,
        },
      });
      const profiles = await res.json();

      // console.log('profiles', profiles)
      let filtered = [];
      if (currentID == '')
        filtered = profiles.filter((profile) => profile.id !== currentID);
      else 
        filtered = profiles; 

      const randomUsers = [];
      const usedIdxs = new Set();

      // console.log('filtered length', filtered.length)

      while (randomUsers.length < 6) {
        const randIdx = Math.floor(Math.random() * filtered.length);
        if (!usedIdxs.has(randIdx)) {
          usedIdxs.add(randIdx);
          randomUsers.push(filtered[randIdx]);
        }
      }

      setUsers(randomUsers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [currentID]);

  console.log("users", users);

  return (
    <div className="mt-4 rounded-3 bg-white border p-4">
      <h3 className="fs-5 mb-3">More profiles for you</h3>
      {users.map((user) => (
        <AnotherUserPreview profile={user} key={user._id} />
      ))}
    </div>
  );
}
export default MoreProfiles;
