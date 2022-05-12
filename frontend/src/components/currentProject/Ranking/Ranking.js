import { useState } from "react";
import HeaderTracker from "../../HeaderTracker/HeaderTracker"

const Ranking = (props) => {

  const [disable, setDisable] = useState(false);


  const runScarper = (x)=> {
    setDisable(true)
    console.log(disable);

    fetch("http://localhost:5001/runningscraper", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(x),
       
      }).then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        alert(data.message)
    });
  };

if(!props.currentProject){
    return null
}
    return (
        <div>
            <header>
                <HeaderTracker currentProject={props.currentProject}/>
           </header>
           <div className="ranking_container">
                <div className="ranking_scraper_summary">Ranking scarper summary
                    <div className="ranking_dropdown">
                        <button 
                            className="rank_btn"
                            onClick={ () => runScarper(props.currentProject)}
                        >
                            RUN Ranking Scraper
                        </button>
                        <p>competitors</p>
                        <p>keywords</p>
                        <p>pending ranking</p>
                    </div>
                </div>
                <div className="ranking_scraper_getstat">In-the-works getSTAT integration (do NOT use unless instructed to)
                    <div className="ranking_dropdown">
                        <p>uploaded to getSTAT</p>
                        <p>keywords to STAT</p>
                        <p>getStat project setup</p>
                        <p>statID = </p>
                    </div>
                </div>
           </div>
            <div className="ranking_container_result">
                <table>
                    <thead>
                        <tr>
                            <th>Keywords</th>
                            <th>Compared1</th>
                            <th>Compared2</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr key={props.currentProject.id}>
                            <td>{props.currentProject.project_name}</td>
                            <td>{props.currentProject.language}</td>
                            <td>{props.currentProject.creation_date}</td>
                        </tr>
            
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ranking;