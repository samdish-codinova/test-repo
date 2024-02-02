import {CircularProgress, Container, styled} from "@mui/material";
import {ArticleMediaObject} from "./components/ArticleMediaObject.tsx";
import {gql, useQuery} from "@apollo/client";
import {Article} from "./types.ts";

const Wrapper = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
}));

const query = gql`
    query ArticleList($limit: Int) {
        articleList(limit: $limit) {
            nodes {
                id
                title
                content
                createdAt
            }
        }
    }
`;

type ArticleListVariables = {
    limit: number;
}

function useArticleList(variables: ArticleListVariables) {
    return useQuery<{ articleList: { nodes: Article[] } }>(query, {
        variables
    });
}

export function App() {
    const {data, loading} = useArticleList({
        limit: 10,
    });

    let content = null;
    if (loading) {
        content = <CircularProgress/>;
    } else if (data) {
        content = <ArticleMediaList>
            {data.articleList.nodes.map((article) => {
                return <ArticleMediaObject key={article.id} {...article}/>
            })}
        </ArticleMediaList>;
    }
    return (
        <Wrapper>
            {content}
        </Wrapper>
    )
}


const ArticleMediaList = styled("div")(({theme}) => ({
    display: 'grid',
    gap: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)'
    },
}))
