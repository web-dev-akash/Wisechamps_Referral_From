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

  let whatsappHerf = `https://wa.me?text=Hi!%20%0AI%20am%20enjoying%20Wisechamps%20LIVE%20QUIZZES%20%26%20solving%20COMPLEX%20QUESTIONS%20every%20week%20%F0%9F%8E%AF%0Aanddd%20I%20am%20improving%20my%20IQ%20LEVEL%20regularly%0A%0ACome%20join%20me%20in%20this%20FUN%20%26%20INTERESTING%20way%20of%20LEARNING%20%0AClick%20here%20%F0%9F%91%87%0Ahttps%3A%2F%2Freferral.wisechamps.com%3FrefereeId%3D${phone}%0A%0ASee%20you%20there%20%F0%9F%92%A1`;

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
      const resUser = await axios.post(url, { phone: phone, referral: true });
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
        <h3
          className="animate__animated animate__fadeInRight"
          style={{
            marginTop: "30px",
          }}
        >
          Welcome to WiseChamps Quizzing CLUB
        </h3>
        <p className="animate__animated animate__fadeInLeft pointers">
          <b>{user.name.toUpperCase()}</b>
          {"  "}
          is taking our live quizzes every week to 👇
          <p>Practice Complex questions</p>
          <p>Remove Competition Fear</p>
          <p>Learning speed-solving tricks</p>
          <p>Fun!!! 🤩</p>
        </p>
        <p className="animate__animated animate__fadeInRight">
          Please fill out this form to JOIN OUR QUIZZING WHATSAPP GROUP and
          <b> AVAIL 10 FREE QUIZZES 🥳</b>
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
