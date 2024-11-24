import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

export default function CharacterCard({
  imgHref,
  name,
  gender,
  status,
  species,
  loading,
}) {
  return (
    <>
      {!loading ? (
        <Card sx={{ height: "400px", width: "300px" }}>
          {!loading ? (
            <CardMedia
              component="img"
              alt={name}
              image={imgHref}
              height={300}
              width={300}
            />
          ) : (
            <Skeleton variant="rounded" width={300} height={300} />
          )}
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              children={name}
            />
            <Typography
              variant="inherit"
              sx={{ color: "text.secondary", display: "inline", mr: 1 }}
              children={gender}
            />
            <Typography
              variant="inherit"
              sx={{ color: "text.secondary", display: "inline", mr: 1 }}
              children={status}
            />
            <Typography
              variant="inherit"
              sx={{ color: "text.secondary", display: "inline" }}
              children={species}
            />
          </CardContent>
        </Card>
      ) : (
        <Skeleton variant="rounded" width={300} height={400} />
      )}
    </>
  );
}
