import React, {useEffect, useState} from 'react';

import axios from 'axios';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const getInfo = async () => {
    const responce = await axios.get(url);
    setJobs(responce.data);
    setLoading(false);
  };

  useEffect(()=> {
    getInfo();
  }, []);

  if (loading){
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    );
  };

  const {company, dates, duties, title} = jobs[value];
  return(
    <section className='section'>
      <div className='title'> 
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        <div className='btn-container'>
            {jobs.map((item, index) => {
              return <button  key={index} 
                              onClick={()=> setValue(index)}
                              className={`job-btn ${index === value ? 'active-btn' : ''}`}>
                        {item.company}
                      </button>
            })}
        </div>
        <article className='job-info'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {duties.map((duty, index) => {
                return <div key={index} className='job-desc'><p>{duty}</p></div>
            } )}
        </article>
      </div>
    </section>
  )
}

export default App;
