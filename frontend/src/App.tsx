import { gql, useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ArticleMediaList from "./components/ArticleMediaList.tsx";
import ArticleMediaListContainer from "./components/ArticleMediaListContainer.tsx";
import { ArticleMediaObjectSkeleton } from "./components/ArticleMediaObjectSkeleton.tsx";
import Pagination from "./components/Pagination.tsx";
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
      <ArticleMediaListContainer>
        {[...Array(10).keys()].map((i) => (
          <ArticleMediaObjectSkeleton key={i} />
        ))}
      </ArticleMediaListContainer>
    );
  } else if (data) {
    content = (
      <div>
        <ArticleMediaList articles={data.articleList.nodes} />

        <Pagination
          count={Math.ceil(data.articleList.meta.total / limit)}
          page={offset}
          onPageChange={handlePageChange}
          allowedLimits={allowedLimits}
          limit={limit}
          onRowSizeChange={handleRowSizeChange}
        />
      </div>
    );
  }

  return <Wrapper>{content}</Wrapper>;
}
