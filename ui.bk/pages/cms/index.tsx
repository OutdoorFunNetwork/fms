import axios from 'axios';
import { NextPage } from 'next';
import { useEffect } from 'react';

const Dashboard: NextPage = () => {
  useEffect(() => {
    const loadData = async () => await axios.get(`${process.env.NEXT_PUBLIC_API_PREFIX}/`, {
      withCredentials: true,
    });

    loadData();

    return () => {
      console.log('later skater');
    }
  }, []);

  return <h1>Hello dashboard</h1>;
};

export default Dashboard;