import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Article } from "../types.ts";

export function ArticleMediaObject({
  title,
  content,
  createdAt,
  author,
}: Article) {
  return (
    <Card>
      <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
        {title}
      </Typography>
      <CardHeader
        avatar={<Avatar src={author.avatar} aria-label="author" />}
        title={author.name}
        subheader={new Date(createdAt).toLocaleString()}
      />
      <CardContent>{content}</CardContent>
    </Card>
  );
}
