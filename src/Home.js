import React from "react";
import { useEffect, useState } from "react";
import logo from "./logo.png";
export const Home = () => {
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
      formDiv.style.display = "flex";
      document.getElementById("CONTACTCF18").value = res.contactid;
      console.log(res.contactid);
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
    if (phone) {
      getReferralUser(phone);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  if (!phone || !query || error) {
    formDiv.style.display = "none";
    return (
      <div>
        <p>This Referral Link is not valid, please try again</p>
      </div>
    );
  }
  return (
    <>
      <header className="animate__animated animate__fadeInLeft">
        <img src={logo} alt="Wisechamps" width={"120px"} />
      </header>
      <h3 className="animate__animated animate__fadeInRight">
        Welcome to Wisechampions Club
      </h3>
      <p className="animate__animated animate__fadeInLeft">
        <b>{user.toUpperCase()}</b>
        {"  "}
        is enjoying our Live quizzes every week, they believe in the power of
        interactive learning and thought you would enjoy it too
      </p>
      <p className="animate__animated animate__fadeInRight">
        Fill out the form to join our WhatsApp Group
      </p>
    </>
  );
};
