import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const Favourites = () => {
 const [items, setItems] = useState([]);
 const navigate = useNavigate();
 const getTimeAgo = (date) => {
   if (!date) return "Unknown time ago";

   const now = new Date();
   const past = new Date(date);

   if (isNaN(past)) return "Invalid date";

   const diffInSeconds = Math.floor((now - past) / 1000);

   if (diffInSeconds < 60) {
     return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
   }

   const diffInMinutes = Math.floor(diffInSeconds / 60);
   if (diffInMinutes < 60) {
     return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
   }

   const diffInHours = Math.floor(diffInMinutes / 60);
   if (diffInHours < 24) {
     return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
   }

   const diffInDays = Math.floor(diffInHours / 24);
   if (diffInDays < 30) {
     return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
   }

   const diffInMonths = Math.floor(diffInDays / 30);
   if (diffInMonths < 12) {
     return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
   }

   const diffInYears = Math.floor(diffInMonths / 12);
   return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
 };
 useEffect(() => {
   const fetchData = async () => {
     console.log("Hello");

     try {
       const res = await axios.get(
         "http://localhost:8080/api/project/all-projects",
         { withCredentials: true }
       );
       console.log(res);

       const arr = res.data.projects.map((project) => ({
         ...project,
         lastUpdated: new Date(project.lastUpdated),
         timeAgo: getTimeAgo(project.lastUpdated),
       }));

       setItems(arr);
     } catch (err) {
       if (err.response.data.error === "login") {
         alert("Signin First");
         navigate("/signin");
       }
       console.log(err.response);
     }
   };

   fetchData();
 }, []);

 return (
   <div className="flex flex-wrap gap-10">
     {items
       .sort((item1, item2) => {
         if (item2.lastUpdated > item1.lastUpdated) {
           return 1;
         } else if (item2.lastUpdated < item1.lastUpdated) {
           return -1;
         } else {
           return 0;
         }
       })
       .filter((item) => item.isFavourite)
       .map((item, index) => (
         <Card item={item} key={index} />
       ))}
   </div>
 );
}

export default Favourites;