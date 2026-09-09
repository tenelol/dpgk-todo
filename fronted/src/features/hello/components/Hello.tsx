import axios from "axios";
import { useEffect, useState } from "react";

export function Hello() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/hello")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
