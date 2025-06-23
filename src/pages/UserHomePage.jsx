import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SectionCard from "../components/SectionCard";
import ProfileCard from "../components/ProfileCard";
import TransactionList from "../components/TransactionList";

function UserHomePage({ user, transactions }) {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Welcome back, {user?.name?.split(" ")[0] || "User"}!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <ProfileCard user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <SectionCard>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={600}
              sx={{ mb: 2 }}
            >
              Recent Transactions
            </Typography>
            <TransactionList transactions={transactions} />
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserHomePage;
