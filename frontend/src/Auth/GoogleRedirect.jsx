import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      navigate("/");
    } else {
      console.error("No token found in URL after Google callback.");
      navigate("/login");
    }
  }, [navigate, search]);

  return <div className="text-black font-lg m-8">Logging you in…</div>;
}
