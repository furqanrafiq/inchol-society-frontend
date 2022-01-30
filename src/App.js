import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';
import Member from './views/Member';
import AllMembers from './views/Member/AllMembers';
import AddMember from './views/Member/AddMember';
import UpdateMember from './views/Member/UpdateMember';
import MemberDashboard from './views/Member/MemberDashboard';
import AllPlots from './views/Plot/AllPlots';
import AddPlots from './views/Plot/AddPlots';
import UpdatePlot from './views/Plot/UpdatePlot';
import Ledgers from './views/Ledgers';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Member />}>
          <Route path="member-dashboard" element={<MemberDashboard />} />
          <Route path="all-members" element={<AllMembers />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="add-plot-member/:plotId/:fileNo" element={<AddMember />} />
          <Route path="update-member/:memberNo" element={<UpdateMember />} />
          <Route path="all-plots" element={<AllPlots />} />
          <Route path="add-plot" element={<AddPlots />} />
          <Route path="update-plot" element={<UpdatePlot />} />
          <Route path="ledger" element={<Ledgers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
