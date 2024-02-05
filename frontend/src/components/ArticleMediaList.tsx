import { Article } from "../types";
import ArticleMediaListContainer from "./ArticleMediaListContainer";
import { ArticleMediaObject } from "./ArticleMediaObject";

const ArticleMediaList = ({ articles }: { articles: Article[] }) => {
  return (
    <ArticleMediaListContainer>
      {articles.map((article) => {
        return <ArticleMediaObject key={article.id} {...article} />;
      })}
    </ArticleMediaListContainer>
  );
};

export default ArticleMediaList;
