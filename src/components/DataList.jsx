import React, { useEffect, useState } from 'react'
import { deleteData, fetchData } from '../services/firebaseService';

export default function DataList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const items = await fetchData();
            setData(items);
        };
        getData();

    }, []);

    const handleDelete = async (id) => {
        await deleteData(id);
        setData(data.filter(item => item.id !== id))
    }
  return (
    <ul>
{data.map((item) => (
    <li key={item.id}>
        {item.user} - {item.name}
        <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
))
}
    </ul>
  );
}
