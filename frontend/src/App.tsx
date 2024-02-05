import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Container, styled } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ArticleMediaObject } from "./components/ArticleMediaObject.tsx";
import { Article, Meta } from "./types.ts";

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
        author {
          id
          name
          createdAt
          avatar
        }
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
  const allowedLimits = [10, 25, 50, 100];
  const [limit, setLimit] = useState(10);

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

  const handleRowSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(e.target?.value);
    if (!selectedPage) return;

    setLimit(selectedPage);
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
        <Stack alignItems="center" mt={3}>
          <StyledPagination
            count={Math.ceil(data.articleList.meta.total / limit)}
            page={offset}
            onChange={handlePageChange}
          />

          <Stack direction="row" gap={1} alignItems="center">
            <p>Row Size</p>
            <Box>
              <select value={limit} onChange={handleRowSizeChange}>
                {allowedLimits.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Box>
          </Stack>
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
