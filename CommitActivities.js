import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';


const CommitActivities = () => {

    const { owner, repoName } = useParams();
    // const [commitActivityData, setCommitActivityData] = useState({});

    useEffect(()=>{
    
         const fetchactivity = async ()=>{
            try {
        const date = new Date();
        const startDate = new Date(date.getTime() - 365 * 24 * 60 * 60 * 1000);
        const formattedStartDate = startDate.toISOString().slice(0, 10);

        const url = `https://api.github.com/repos/${owner}/${repoName}/stats/commit_activity`;
        const response = await axios.get(url);
        const commitActivity = response.data;
        console.log('commitActivity:', commitActivity);

       

      
            } catch (error) {
                 console.log(error);
            }
         }


         fetchactivity();
    },[owner,repoName])
  return (
    <div>
      <h1>Commit Activity for {owner}/{repoName}</h1>
      <h2>Graph Here</h2>
     
      <Link to='/'><button>Repo Home</button></Link>
     
    </div>
  )
}

export default CommitActivities