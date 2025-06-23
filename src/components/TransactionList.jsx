import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SectionCard from "./SectionCard";
import Button from "@mui/material/Button";

function TransactionList({ transactions, user }) {
  if (!transactions || transactions.length === 0) {
    return (
      <Typography color="text.secondary" align="center">
        No transactions yet.
      </Typography>
    );
  }

  return (
    <SectionCard sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        color="primary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Welcome back, {user?.name?.split(" ")[0] || "User"}!
      </Typography>
      <List>
        {transactions.map((tx, idx) => (
          <Box key={tx._id || idx}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 0,
              }}
            >
              <ListItemText
                primary={tx.remarks}
                secondary={new Date(tx.createdAt).toLocaleDateString()}
                sx={{ flex: 1 }}
              />
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color={
                  tx.transaction_type === "income"
                    ? "success.main"
                    : "error.main"
                }
                sx={{ minWidth: 90, textAlign: "right" }}
              >
                {tx.transaction_type === "income"
                  ? `+${Number(tx.amount).toLocaleString()}`
                  : `-${Number(tx.amount).toLocaleString()}`}
              </Typography>
            </ListItem>
            {idx < transactions.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: 8, fontWeight: 600, px: 4, boxShadow: 2 }}
      >
        Get Started
      </Button>
    </SectionCard>
  );
}

export default TransactionList;