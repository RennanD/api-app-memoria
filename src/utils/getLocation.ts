import cepPromise from 'cep-promise';

interface Location {
  city: string;
  region: string;
}

export default async function getLocation(ziocode: string): Promise<Location> {
  const location = await cepPromise(ziocode);

  return {
    city: location.city,
    region: location.state,
  };
}
