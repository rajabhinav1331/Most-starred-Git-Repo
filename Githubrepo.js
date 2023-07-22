import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/Githubrepo.css";
import {Link} from 'react-router-dom'


const Githubrepo = () => {
  const [repodata, setRepodata] = useState([]);
  const [time, setTime] = useState("1 week");
  const [page, setpage] = useState(1);
  const loadingref = useRef(null);
  const [repocount, Setrepocount] = useState(0);

  useEffect(() => {
    fetchdata();
  }, [time]);

  // fetch git hub data using axios
  const fetchdata = async () => {
    try {
      const date = new Date();
      let setdate;
      if (time === "1 week") {
        setdate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (time === "2 weeks") {
        setdate = new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000);
      } else if (time === "1 Month") {
        setdate = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      const newdate = setdate.toISOString().slice(0, 10);
      const fetchurl = `https://api.github.com/search/repositories?q=created:>${newdate}&sort=stars&order=desc`;

      const response = await axios.get(fetchurl);
      const newRepositories = response.data.items;

      setRepodata((prevRepos) =>
        page === 1 ? newRepositories : [...prevRepos, ...newRepositories]
      );
      Setrepocount(response.data.total_count);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // Reset the page number when the time range changes
    setpage();
  }, [time]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setpage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });

    if (loadingref.current) {
      observer.observe(loadingref.current);
    }

    return () => observer.disconnect();
  }, [page]);

  return (
    <>
      <div id='btn-div'>
        <button onClick={() => setTime("1 week")}>Last 7 days</button>
        <button onClick={() => setTime("2 weeks")}>Last 14 days</button>
        <button onClick={() => setTime("1 Month")}>Last 30 days</button>
      </div>

      <div className="repocounter">Total-Repo:
    <br />
      {repocount}</div>

      <div className="container">
        {repodata.map((repo) => (
          <div key={repo.id} className="display-card">
            <p id="owner">
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
              <br />
              <br />
              Owner:{repo.owner.login}
            </p>
            <h2>{repo.name}</h2>
            <p id="description">
              Description:
              <br />
              {repo.description}
            </p>
            <p id="stars">Stars:{repo.stargazers_count}</p>
            <p>Issue:{repo.open_issue_count}</p>
             
            <Link to={`/commit-activity/${repo.owner.login}/${repo.name}`}>View Commit Activity</Link>
          </div>
        ))}
      </div>
      <div className="loading" ref={loadingref}></div>
    </>
  );
};

export default Githubrepo;
