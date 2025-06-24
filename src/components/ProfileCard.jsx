import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 420,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: "0 8px 24px rgba(25, 118, 210, 0.15)" },
      }}
    >
      <Box 
        sx={{ 
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          p: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box 
          sx={{ 
            position: "absolute", 
            top: -20, 
            right: -20, 
            width: 120, 
            height: 120, 
            borderRadius: "50%", 
            background: "rgba(255,255,255,0.1)",
          }} 
        />
        <Box 
          sx={{ 
            position: "absolute", 
            bottom: -30, 
            left: -30, 
            width: 160, 
            height: 160, 
            borderRadius: "50%", 
            background: "rgba(255,255,255,0.08)",
          }} 
        />

        <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#1976d2",
              width: 70,
              height: 70,
              fontSize: 32,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "3px solid rgba(255,255,255,0.8)",
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} color="white">
              {user?.name}
            </Typography>
            <Typography color="rgba(255,255,255,0.8)" fontSize="0.9rem">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            CURRENT BALANCE
          </Typography>
          <Typography variant="h4" fontWeight={700} color="success.main">
            ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Member since
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
          </Typography>
        </Box>

        {user?.bio && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              {user.bio}
            </Typography>
          </>
        )}
      </CardContent>
    </Paper>
  );
}

export default ProfileCard;
