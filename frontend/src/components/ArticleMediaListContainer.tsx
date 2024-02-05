import { styled } from "@mui/material/styles";

const ArticleMediaListContainer = styled("div")(({ theme }) => ({
  marginBottom: "6rem",
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

export default ArticleMediaListContainer;
