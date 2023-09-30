import React, { useState } from "react";

const gradeLinks = {
  1: "https://chat.whatsapp.com/JvadEkIxhcmGGxttpwjjTe",
  2: "https://chat.whatsapp.com/Dddjtrl1y1QK2BEmbwvnLf",
  3: "https://chat.whatsapp.com/BEFc5d2B14q7rcJ0gCtI3k",
  4: "https://chat.whatsapp.com/EtkMd4uHB907ohQKPJ0jiz",
  5: "https://chat.whatsapp.com/FqKeNPtUE7dIOcGWnBU9hw",
  6: "https://chat.whatsapp.com/GtRzWg8fT9DHr7lk6QrLhG",
  7: "https://chat.whatsapp.com/KPjxsgvH1BC6M1TqSXaRPA",
  8: "https://chat.whatsapp.com/KY3cd3tApf5LGRQmsuicNo",
};

export const GroupLink = () => {
  const [grade, setGrade] = useState(
    localStorage.getItem("grade") ? localStorage.getItem("grade") : ""
  );
  window.location.replace(gradeLinks[grade]);
  return (
    <div>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};
