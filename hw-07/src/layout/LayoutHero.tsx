import { useRequest } from "ahooks";
import { Alert, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { requestHero } from "../api";
import { CharacterCard } from "../components";

export default function HeroLayout() {
  const { heroID } = useParams();

  const { data, error, loading } = useRequest(() => requestHero(heroID), {
    refreshDeps: [heroID],
  });

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        height: "100%",
        width: "350px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!error ? (
        <CharacterCard
          loading={loading}
          name={data?.name}
          imgHref={data?.image}
          gender={data?.gender}
          status={data?.status}
          species={data?.species}
        />
      ) : (
        <Alert variant="outlined" severity="error">
          Error loading data. Please try again later.
        </Alert>
      )}
    </Box>
  );
}
