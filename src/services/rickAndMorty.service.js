import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacterById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/character/${id}`);
    return {
      id: data.id,
      name: data.name,
      image: data.image,
      species: data.species,
      status: data.status,
      gender: data.gender,
    };
  } catch (err) {
    console.error("Error obteniendo personaje:", err.message);
    return null;
  }
};

export const getLocationById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/location/${id}`);
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      dimension: data.dimension,
    };
  } catch (err) {
    console.error("Error obteniendo ubicación:", err.message);
    return null;
  }
};