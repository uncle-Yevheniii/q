import axios from "axios";

export default async function allFetchCharacters(id: string) {
  if (id === null || undefined) return;

  const url = `https://rickandmortyapi.com/api/character/${id}`;

  const res = await axios.get(url);
  return res.data;
}
