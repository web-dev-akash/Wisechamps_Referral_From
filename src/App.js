import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const formDiv = document.getElementById("crmWebToEntityForm");
  const query = new URLSearchParams(window.location.search).get("phone");
  const [phone, setPhone] = useState(query);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getReferralUser = async (phone) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.app/referral?phone=${phone}`;
      const data = await fetch(url);
      const res = await data.json();
      if (res.message) {
        setLoading(false);
        setError(true);
        return;
      }
      setUser(res.name);
      formDiv.style.display = "block";
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      return;
    }
  };

  useEffect(() => {
    // if (phone) {
    //   getReferralUser(phone);
    // }
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!phone || !query || error) {
    return (
      <div>
        <p>This Referral Link is not valid, please try again</p>
      </div>
    );
  }

  return (
    <div className="App">
      <p>{user.toUpperCase()} referred you for this</p>
    </div>
  );
}

export default App;
