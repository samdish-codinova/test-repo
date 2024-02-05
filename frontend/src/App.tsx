import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { ArticleMediaObject } from "./components/ArticleMediaObject.tsx";
import { ArticleMediaObjectSkeleton } from "./components/ArticleMediaObjectSkeleton.tsx";
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

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setOffset(value);
  };

  const handleRowSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(e.target?.value);
    if (!selectedPage) return;

    setLimit(selectedPage);
  };

  let content = null;
  if (loading) {
    content = (
      <ArticleMediaList>
        {[...Array(10).keys()].map((i) => (
          <ArticleMediaObjectSkeleton key={i} />
        ))}
      </ArticleMediaList>
    );
  } else if (data) {
    content = (
      <div>
        <ArticleMediaList>
          {data.articleList.nodes.map((article) => {
            return <ArticleMediaObject key={article.id} {...article} />;
          })}
        </ArticleMediaList>

        <Stack
          className="pagination-container"
          alignItems="center"
          pt={3}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Pagination
            count={Math.ceil(data.articleList.meta.total / limit)}
            page={offset}
            onChange={handlePageChange}
          />

          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="body1" my={2} color="#000">
              Row Size
            </Typography>
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
  marginBottom: "6rem",
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));
