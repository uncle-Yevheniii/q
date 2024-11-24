import { useState, useEffect } from "react";

export default function useRequestHero(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [dataCharacter, setDataCharacter] = useState({});

  useEffect(() => {
    (async function fetchData() {
      try {
        setIsLoading(true);
        setErrorMsg(false);
        const res = await allFetchCharacters(id);

        const charactersData = {
          id: res.id,
          image: res.image,
          name: res.name,
          gender: res.gender,
          status: res.status,
          species: res.species,
        };

        setDataCharacter(charactersData);
      } catch (error) {
        setErrorMsg(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return {
    isLoading,
    errorMsg,
    dataCharacter,
  };
}

const allFetchCharacters = async (id) => {
  if (id === null || undefined) return;

  const url = `https://rickandmortyapi.com/api/character/${id}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Something went wrong!");
  return res.json();
};
