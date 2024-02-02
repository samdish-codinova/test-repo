import { CircularProgress, Container, styled } from "@mui/material";
import { ArticleMediaObject } from "./components/ArticleMediaObject.tsx";
import { gql, useQuery } from "@apollo/client";
import { Article, Meta } from "./types.ts";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Wrapper = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const query = gql`
  query ArticleList($limit: Int, $offset: Int) {
    articleList(limit: $limit, offset: $offset) {
      nodes {
        id
        title
        content
        createdAt
      }
      meta {
        limit
        offset
        total
      }
    }
  }
`;

type ArticleListVariables = {
  limit: number;
  offset: number;
};

function useArticleList(variables: ArticleListVariables) {
  return useQuery<{ articleList: { nodes: Article[]; meta: Meta } }>(query, {
    variables,
  });
}

export function App() {
  const [offset, setOffset] = useState(1);

  const limit = 10;
  const { data, loading } = useArticleList({
    limit,
    offset,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setOffset(value);
  };

  let content = null;
  if (loading) {
    content = <CircularProgress />;
  } else if (data) {
    content = (
      <div>
        <ArticleMediaList>
          {data.articleList.nodes.map((article) => {
            return <ArticleMediaObject key={article.id} {...article} />;
          })}
        </ArticleMediaList>
        <Stack direction="column" alignItems="center" mt={3}>
          <StyledPagination
            count={Math.ceil(data.articleList.meta.total / limit)}
            page={offset}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    );
  }
  return <Wrapper>{content}</Wrapper>;
}

const ArticleMediaList = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

const StyledPagination = styled(Pagination)(() => ({
  ".MuiPaginationItem-root": {
    color: "white",
  },
  ".MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "#ffffff5c",
  },
}));
