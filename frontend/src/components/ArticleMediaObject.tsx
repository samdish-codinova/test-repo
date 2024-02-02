import {Card, CardContent, CardHeader} from "@mui/material";
import {Article} from "../types.ts";


export function ArticleMediaObject({title, content, createdAt}: Article) {
    return <Card>
        <CardHeader
            title={title}
            subheader={createdAt}
        />
        <CardContent>
            {content}
        </CardContent>
    </Card>
}
