import { useEffect, useState } from "react";

export const options = {
    method:'GET'
}
export function UseFetchCategories(url, options){
    
    const [data, setData] = useState();
    useEffect(() => {
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => setData(data));
      }, [url]);
      return data;
}
