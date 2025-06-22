import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <Card
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 4,
        borderRadius: 4,
        boxShadow: 4,
        background: "#fff",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "#e3f2fd",
              color: "#1976d2",
              width: 64,
              height: 64,
              fontSize: 32,
              mb: 2,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h6" color="primary" fontWeight={700}>
            {user?.name}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            {user?.email}
          </Typography>
          <Typography fontWeight={600} sx={{ mt: 1 }}>
            Balance:{" "}
            <span style={{ color: "#388e3c", fontWeight: 700 }}>
              ${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </Typography>
          <Typography color="text.secondary" fontSize={14} sx={{ mt: 1 }}>
            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
          </Typography>
          <Typography color="text.secondary" fontStyle="italic" sx={{ mt: 2 }}>
            {user?.bio ? user.bio : "This user has not added a bio yet."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;