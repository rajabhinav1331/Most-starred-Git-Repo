import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Githubrepo from './pages/Githubrepo';
import CommitActivities from './pages/CommitActivities';

function App() {
  return (
    <div className='App'>
      <h1 className='main-heading'>Most Starred Git-repo</h1>
    {/* Create Routes using react router dom npm */}
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Githubrepo/>}/>
    <Route path="/commit-activity/:owner/:repoName" element={<CommitActivities/>}/>
    
   </Routes>
   </BrowserRouter>
    </div>
   
  )
}


export default App;
