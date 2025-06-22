import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_USER_URL}/dashboard`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token || ""}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) setUser(data.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div style={{ padding: 32, textAlign: "center" }}>Loading profile...</div>
    );
  if (!user)
    return (
      <div style={{ padding: 32, textAlign: "center" }}>No profile found.</div>
    );

  return <ProfileCard user={user} />;
}

export default ProfilePage;