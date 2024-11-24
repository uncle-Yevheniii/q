import { useParams } from "react-router-dom";
import { Alert, Box } from "@mui/material";

import { useRequestHero } from "../hooks";
import { CharacterCard } from "../components";

export default function HeroLayout() {
  const { heroID } = useParams();

  const { isLoading, errorMsg, dataCharacter } = useRequestHero(heroID);

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
      {!errorMsg ? (
        <CharacterCard
          loading={isLoading}
          name={dataCharacter.name}
          imgHref={dataCharacter.image}
          gender={dataCharacter.gender}
          status={dataCharacter.status}
          species={dataCharacter.species}
        />
      ) : (
        <Alert variant="outlined" severity="error">
          Error loading data. Please try again later.
        </Alert>
      )}
    </Box>
  );
}
