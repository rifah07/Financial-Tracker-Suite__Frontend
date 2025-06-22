import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <Box
        sx={{ color: "#888", fontSize: "1.05rem", textAlign: "center", py: 3 }}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/money.svg"
          alt="No transactions"
          style={{ width: 48, opacity: 0.5, marginBottom: 12 }}
        />
        <Typography>
          No recent transactions yet.
          <br />
          Start tracking your finances!
        </Typography>
      </Box>
    );
  }
  return (
    <List>
      {transactions.map((tx, idx) => (
        <div key={tx._id}>
          <ListItem>
            <ListItemText
              primary={
                <span
                  style={{
                    fontWeight: 600,
                    color: tx.type === "debit" ? "#d32f2f" : "#388e3c",
                  }}
                >
                  {tx.type === "debit" ? "−" : "+"}$
                  {Math.abs(tx.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              }
              secondary={
                <>
                  <Typography color="primary" fontSize={14}>
                    {tx.description}
                  </Typography>
                  <Typography color="text.secondary" fontSize={13}>
                    {new Date(tx.createdAt).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
          {idx < transactions.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}

export default TransactionList;
