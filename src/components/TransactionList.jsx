import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SectionCard from "./SectionCard";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

function TransactionList({ transactions, user, onFilter }) {
  const [selected, setSelected] = useState("all");

  const handleFilter = (type) => {
    setSelected(type);
    if (onFilter) onFilter(type === "all" ? "" : type);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <Typography color="text.secondary" align="center">
        No transactions yet.
      </Typography>
    );
  }

  return (
    <SectionCard sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        color="primary"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Transactions
      </Typography>
      <ButtonGroup fullWidth sx={{ mb: 2 }}>
        <Button
          variant={selected === "all" ? "contained" : "outlined"}
          onClick={() => handleFilter("all")}
        >
          All
        </Button>
        <Button
          variant={selected === "income" ? "contained" : "outlined"}
          color="success"
          onClick={() => handleFilter("income")}
        >
          Income
        </Button>
        <Button
          variant={selected === "expense" ? "contained" : "outlined"}
          color="error"
          onClick={() => handleFilter("expense")}
        >
          Expense
        </Button>
      </ButtonGroup>
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
    </SectionCard>
  );
}

export default TransactionList;