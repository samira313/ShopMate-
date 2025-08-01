import React, { useEffect, useState } from 'react'
import { fetchData } from '../services/firebaseService';

export default function DataList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const items = await fetchData();
            setData(items);
        };
        getData();

    }, [])
  return (
    <ul>
{data.map((item) => (
    <li key={item.id}>
        {item.user} - {item.name}
    </li>
))
}
    </ul>
  );
}
