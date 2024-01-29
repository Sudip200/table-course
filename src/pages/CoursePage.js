import React, { useEffect } from 'react';
import {useState} from 'react';
import { useQuery } from 'react-query';
import { saveAs } from 'file-saver';

import Table from '../components/Table';
import Loader from '../components/Loader';
import TableLoader from '../components/TableLoader';
const CoursesPage = () => {
 //Query the list of courses
 const [ filterType,setFilterType] =useState('All');
 const [searchTerm,setSearhTerm] =useState('');
 const [isSplashed,setIsSplashed] =useState(true);
 useEffect(()=>{
    setTimeout(()=>{
      setIsSplashed(false);
    },3000)
  },[])



  const { data: coursesData, isLoading: isLoadingCourses } = useQuery(
    'courses',
    async () => {
      const response = await fetch('https://jsonblob.com/api/1196583438827511808');
      return response.json();
    }
  );
  //The first course in the list is selected by default
  const [selectedCourse, setSelectedCourse] = React.useState('202301');
//Query the list of users for the selected course
  const { data: usersData, isLoading: isLoadingUsers } = useQuery(
    ['users', selectedCourse],
    async () => {
      if (selectedCourse) {
        const response = await fetch(`https://jsonblob.com/api/1196587799003652096?course_id=${selectedCourse}`);
        return response.json();
      }
    },
    {
      enabled: !!selectedCourse,
    }
  );
 //Function to export the users list to CSV
  const handleExport = () => {
    // Combine users list into CSV
    const csvContent = 'Name,Email,Type \n'+usersData.users.map(user => `${user.name},${user.email},${user.type}`).join('\n');
    
    // Create a Blob and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'users.csv');
  };
  const filteredUsers = usersData?.users.filter(user=>{
    const typeMatches= filterType ==='All' || user.type === filterType;
    const searchMathes = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatches && searchMathes;
    }
  )    
  if (isSplashed) {
    return <Loader/>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Course Users</h1>
      <select
        className="p-2 border border-gray-300 rounded mr-2"
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        {coursesData?.all_courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_label}
          </option>
        ))}
      </select>
      <input className="p-2 border border-gray-300 rounded mr-2" type="text" placeholder="Search by name or email" onChange={(e) => setSearhTerm(e.target.value)} />
      <select className="p-2 border border-gray-300 rounded mr-2" onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All</option>
          <option value="FREE">Free</option>
          <option value="PAID">Paid</option>
        </select>
      <button
        className="p-2 bg-green-500 text-white rounded"
        onClick={handleExport}
        disabled={!usersData || usersData.users.length === 0}
      >
        Export
      </button>

      {isLoadingUsers ? (
        <TableLoader />
      ) : (
        <Table filteredUsers={filteredUsers} />
      )}
    </div>
  );
};

export default CoursesPage;
