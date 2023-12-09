import React from "react";
import { useEffect, useState } from "react";
import { RaceBy } from "@uiball/loaders";
import logo from "./logo.png";
import whatsapp from "./assets/whatsapp.svg";
import axios from "axios";
export const Home = () => {
  const formDiv = document.getElementById("crmWebToEntityForm");
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [phone, setPhone] = useState(
    query.get("refereeId") ? query.get("refereeId") : ""
  );
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("");

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  let whatsappHerf = `https://wa.me?text=Hey%20Friend!%0A%0ALike%20me%20you%20can%20improve%20your%20*VITAMIN%20IQ*%20by%20attempting%20daily%20quizzes%20with%20*WISECHAMPS*.%0A%0AAnswer%20today%27s%20amazing%20question%20and%20get%20free%20quiz%20credits.%0A%0AQuiz%20Link%20-%20https%3A%2F%2Freferral.wisechamps.com%3FrefereeId=${phone}`;

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleClick = async (email) => {
    try {
      if (!emailRegex.test(email)) {
        alert("Please enter a Valid Email");
        return;
      }
      setLoading(true);
      const urlUser = `https://backend.wisechamps.com/user`;
      const resUser = await axios.post(urlUser, { email: email });
      const mode = resUser.data.mode;
      setMode(mode);
      if (mode === "user") {
        setUser(resUser.data.user);
        setPhone(resUser.data.user.phone);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const getReferralUser = async (phone) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.com/user`;
      const resUser = await axios.post(url, { phone: phone });
      const mode = resUser.data.mode;
      if (mode === "user") {
        setUser(resUser.data.user);
      }
      formDiv.style.display = "flex";
      document.getElementById("CONTACTCF18").value = resUser.data.user.id;
      setLoading(false);
      setMode("referee");
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      return;
    }
  };

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
    if (phone) {
      getReferralUser(phone);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            width: "90%",
          }}
        >
          Loading please wait...
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </div>
    );
  }

  if (error) {
    formDiv.style.display = "none";
    return (
      <div>
        <p>This Referral Link is not valid, please try again</p>
      </div>
    );
  }

  if (mode === "nouser") {
    return (
      <div className="email-not-found">
        <p>
          This Email is not registered with us. <br />
          Please use a registered Email Address
        </p>
        <div>
          <button id="submit-btn" onClick={() => setMode("")}>
            Try Again
          </button>
          <button
            id="submit-btn"
            onClick={() => {
              window.open(
                `https://wa.me/919717094422?text=${encodeURIComponent(
                  "Please send me my registered email"
                )}`,
                "_blank"
              );
              setMode("");
            }}
          >
            Get Your Registered Email
          </button>
        </div>
      </div>
    );
  }

  if (mode === "user") {
    return (
      <div className="quizSubmitted">
        <p>
          Challenge your friend and get a{" "}
          <p>
            <b>₹300 Amazon Gift Voucher</b>
          </p>
          once they register with us.
        </p>
        <div>
          <a href={whatsappHerf}>
            <img
              alt="Share on WhatsApp"
              src={whatsapp}
              width={"40px"}
              height={"40px"}
            />
            <p>Challenge a friend</p>
          </a>
        </div>
      </div>
    );
  }

  if (mode === "referee") {
    return (
      <div>
        <header
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          className="animate__animated animate__fadeInLeft"
        >
          <img src={logo} alt="Wisechamps" width={"120px"} />
        </header>
        <h3 className="animate__animated animate__fadeInRight">
          Welcome to Wisechampions Club
        </h3>
        <p className="animate__animated animate__fadeInLeft">
          <b>{user.name.toUpperCase()}</b>
          {"  "}
          is enjoying our Live quizzes every week, they believe in the power of
          interactive learning and thought you would enjoy it too
        </p>
        <p className="animate__animated animate__fadeInRight">
          Fill out the form to join our WhatsApp Group
        </p>
      </div>
    );
  }

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
        className="animate__animated animate__fadeInLeft"
      >
        <img src={logo} alt="Wisechamps" width={"120px"} />
      </header>

      <div className="main">
        <h3>Email</h3>
        <div className="form">
          <input
            className="input"
            type="email"
            placeholder="Enter Email"
            inputMode="email"
            onChange={handleChange}
          />
          <p>* Please use the registered Email.</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <button id="submit-btn" onClick={() => handleClick(email)}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
