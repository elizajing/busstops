export default async function fetchData(url) {
    const response = await fetch(url);

      if(!response.ok){
        throw new Error('Data could not be fetched!');
      } else {
        return response.json();
      }
}
