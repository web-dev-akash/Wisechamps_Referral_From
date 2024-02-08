import React from "react";
import { useEffect, useState } from "react";
import { RaceBy } from "@uiball/loaders";
import logo from "./logo.png";
import whatsapp from "./assets/whatsapp.svg";
import axios from "axios";
import giftVoucher from "./assets/voucher.PNG";
export const Home = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [phone, setPhone] = useState(
    query.get("refereeId") ? query.get("refereeId") : ""
  );
  const [user, setUser] = useState({ name: "Akash" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    phone: "",
    parent_name: "",
    student_name: "",
    student_grade: "",
    relation: "",
    source_campaign: "Referral Community",
  });

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  let whatsappHerf = `https://wa.me?text=Hi!%20I%20am%20learning%20a%20lot%20through%20Wisechamps%20Final%20Exam%20Practice%20Sessions.%20These%20quizzes%20are%20FUN%20%26%20INTERESTING%20way%20of%20LEARNING%20regularly.%20%0A%0AI%20am%20sure%20this%20time%20I%20will%20Ace%20my%20final%20Math%20and%20Science%20Exams.%0A%0AWinners%20also%20get%20gifts!%20So%20Don%27t%20Miss%20out...%0A%0AClick%20here%20to%20register%20your%20name%20and%20participate%20in%20free%20sessions%20%F0%9F%91%87%0Ahttps%3A%2F%2Freferral.wisechamps.com%3FrefereeId%3D${phone}%20%0A%0ASee%20you%20there%20%F0%9F%92%A1`;

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setRegisterForm({
      ...registerForm,
      [name]: value,
      source_campaign: "Referral Community",
    });
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

  console.log(registerForm);
  const handleRegisterFormClick = async (e, data, refereeId) => {
    try {
      e.preventDefault();

      if (
        !data.email ||
        !data.phone ||
        !data.parent_name ||
        !data.student_name ||
        !data.student_grade ||
        !data.relation
      ) {
        alert("Please Fill all the required details.");
        return;
      }
      if (!emailRegex.test(data.email)) {
        alert("Please Enter a Valid Email");
        return;
      }
      if (data.phone.length < 10) {
        alert("Please Enter a Valid Phone Number");
        return;
      }
      if (data.parent_name.length < 3) {
        alert("Please Enter a Valid Parent Name");
        return;
      }
      if (data.student_name.length < 3) {
        alert("Please Enter a Valid Student Name");
        return;
      }
      if (data.student_grade === "none") {
        alert("Please select a Valid Student Grade");
        return;
      }
      if (data.relation === "none") {
        alert("Please choose a valid Referee");
        return;
      }
      setLoading(true);
      const url = `https://backend.wisechamps.com/user/add`;
      const res = await axios.post(url, {
        email: data.email,
        phone: data.phone,
        parent_name: data.parent_name,
        student_name: data.student_name,
        student_grade: data.student_grade,
        referralId: refereeId ? refereeId : "",
        relation: data.relation,
        source_campaign: data.source_campaign
          ? data.source_campaign
          : "Referral Community",
      });
      const mode = res.data.mode;
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
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

  if (mode === "useradded") {
    return (
      <div className="quizSubmitted">
        <h1>Thank You</h1>
        <p>
          We have shared the group joining link on your registered whatsapp
          number
        </p>
      </div>
    );
  }

  if (mode === "duplicateuser") {
    return (
      <div className="quizSubmitted">
        <h1>OPPS!</h1>
        <p
          style={{
            margin: "-10px",
          }}
        >
          It looks like you are already registered with us.
        </p>
      </div>
    );
  }

  if (mode === "user") {
    return (
      <div className="quizSubmitted">
        <p>
          <p
            style={{
              marginBottom: "20px",
            }}
          >
            <b>Invite Your Friends And Get</b>
          </p>
          <div
            style={{
              margin: "auto",
              maxWidth: "95%",
              position: "relative",
            }}
          >
            <div
              className="voucherName"
              style={{
                top: "0",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {user.studentName}
            </div>
            <img src={giftVoucher} width={"100%"} alt="Amazon Gift Voucher" />
            <p>
              <b>₹300 Amazon Gift Voucher</b>
            </p>
          </div>
        </p>
        <p
          className="tagLine"
          style={{
            margin: "0 auto 30px auto",
            padding: "10px",
            borderRadius: "50px",
            border: "1px solid",
          }}
        >
          Once they register with us and join the quiz.
        </p>
        <div>
          <a href={whatsappHerf}>
            <img
              alt="Share on WhatsApp"
              src={whatsapp}
              width={"40px"}
              height={"40px"}
            />
            <p>Click here to Invite</p>
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
            marginTop: "70px",
          }}
        >
          Welcome to WiseChamps Final Exam Practice Sessions
        </h3>
        <p className="animate__animated animate__fadeInLeft pointers">
          <b>{user?.studentName.toUpperCase()}</b>
          {"  "}
          is taking our live quizzes every week 👇
          <p>Practice Complex questions</p>
          <p>Remove Competition Fear</p>
          <p>Learning speed-solving tricks</p>
          <p>Fun!!! 🤩</p>
        </p>
        <p className="animate__animated animate__fadeInRight">
          Fill out this form to REGISTER & JOIN OUR FINAL EXAM PRACTICE SESSION
          ON WHATSAPP GROUP and
          <b> AVAIL 5 FREE SESSIONS 🥳</b>
        </p>
        <div id="crmWebToEntityForm">
          <form>
            <div>
              <label htmlFor="parent_name">Parent Name</label>
              <input
                type="text"
                inputMode="text"
                onChange={handleFormChange}
                name="parent_name"
                id="parent_name"
                required
              />
            </div>
            <div>
              <label htmlFor="student_name">Student Name</label>
              <input
                type="text"
                inputMode="text"
                onChange={handleFormChange}
                name="student_name"
                id="student_name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                inputMode="email"
                onChange={handleFormChange}
                name="email"
                id="email"
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                inputMode="tel"
                onChange={handleFormChange}
                name="phone"
                id="phone"
                required
              />
            </div>
            <div>
              <label htmlFor="student_grade">Student Grade</label>
              <select
                onChange={handleFormChange}
                name="student_grade"
                id="student_grade"
                required
              >
                <option value={"none"}>-None-</option>
                <option value={"1"}>Grade 1</option>
                <option value={"2"}>Grade 2</option>
                <option value={"3"}>Grade 3</option>
                <option value={"4"}>Grade 4</option>
                <option value={"5"}>Grade 5</option>
                <option value={"6"}>Grade 6</option>
                <option value={"7"}>Grade 7</option>
                <option value={"8"}>Grade 8</option>
              </select>
            </div>
            <div>
              <label htmlFor="relation">Who Referred You</label>
              <select
                onChange={handleFormChange}
                name="relation"
                id="relation"
                required
              >
                <option value={"none"}>-None-</option>
                <option value={"Friend"}>Friend</option>
                <option value={"Cousin"}>Cousin</option>
              </select>
            </div>
            <button
              style={{
                border: "none",
                padding: "0rem 5.5rem",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => handleRegisterFormClick(e, registerForm, user.id)}
            >
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                Submit
              </p>
            </button>
          </form>
        </div>
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

      <div className="main animate__animated animate__fadeInRight">
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
