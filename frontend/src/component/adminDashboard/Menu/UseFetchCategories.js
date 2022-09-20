import { useEffect, useState } from "react";
import useLocalStorage from "../../../util/useLocalStorage";


export function UseFetchCategories(url){
    const [jwt, setJwt] = useLocalStorage('', 'jwt');

    const [data, setData] = useState();
    useEffect(() => {
        fetch(url, {
            method:'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
    }})
          .then((res) => res.json())
          .then((data) => setData(data));
      }, [url]);
      return data;
}
