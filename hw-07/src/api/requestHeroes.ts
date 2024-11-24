import axios from "axios";

export default async function requestHeroes(p: number) {
  const url = `https://rickandmortyapi.com/api/character?page=${p}`;

  const res = await axios.get(url);
  return res.data;
}
