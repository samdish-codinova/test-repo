import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function ArticleMediaObjectSkeleton() {
  return (
    <Card>
      <Typography variant="h5" component="div" sx={{ px: 2, pt: 1 }}>
        <Skeleton animation="wave" height={45} />
      </Typography>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={20}
            width="30%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={15} width="40%" />}
      />
      <CardContent>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </CardContent>
    </Card>
  );
}
