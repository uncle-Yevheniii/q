import { useState, useEffect } from "react";

export default function useRequestHeroes(paginationModel) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [dataCharacter, setDataCharacter] = useState([]);
  const [infoCharacter, setInfoCharacter] = useState({});

  useEffect(() => {
    (async function fetchData() {
      try {
        setIsLoading(true);
        setErrorMsg(false);
        const res = await allFetchCharacters(paginationModel.page + 1);

        const charactersData = res.results.map((character) => ({
          id: character.id,
          name: character.name,
          status: character.status,
        }));

        setDataCharacter(charactersData);
        setInfoCharacter(res.info);
      } catch (error) {
        setErrorMsg(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [paginationModel]);

  return {
    isLoading,
    errorMsg,
    dataCharacter,
    infoCharacter,
  };
}

const allFetchCharacters = async (p) => {
  const url = `https://rickandmortyapi.com/api/character?page=${p}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Something went wrong!");
  return res.json();
};
