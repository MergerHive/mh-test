import { Route, Routes } from 'react-router-dom';
import Layout from './common/Layout';
import PersistLogin from './features/login/PersistLogin';
import RequireAuth from './features/login/RequireAuth';
import Navbar from './components/navbar/Navbar';
import { ROLES } from './common/roles'
import BusinessProfile from './pages/CreateProfilePage/BusinessProfile';
import DashBoard from './pages/Dashboard/DashBoard';
import Landingpage from './pages/LandingPage/Landingpage';
import PreviewBusinessProfile from './pages/PreviewProfile/PreviewBusinessProfile';
import BusinessSearchPage from './pages/SearchPage/BusinessSearchPage';
import MHLoadingOverlay from './components/LoadingComponent/MHLoadingOverlay';
import { useSelector } from 'react-redux'
import EditBusinessProfile from './pages/EditProfile/EditBusinessProfile';
import DisplayBusinessProfile from './pages/DisplayProfile/DisplayBusinessProfile';
import EditInvestorProfile from './pages/InvestorProfilePage/EditInvestorProfile';
import CreateInvestorProfile from './pages/InvestorProfilePage/CreateInvestorProfile';
import PreviewInvestorProfile from './pages/InvestorProfilePage/PreviewInvestorProfile';
import InvestorSearchPage from './pages/InvestorProfilePage/InvestorSearchPage';
import DisplayInvestorProfile from './pages/InvestorProfilePage/DisplayInvestorProfile';
import CreateFranchiseProfile from './pages/FranchiseProfile/CreateFranchiseProfile';
import PreviewFranchiseProfile from './pages/FranchiseProfile/PreviewFranchiseProfile';
import EditFranchiseProfile from './pages/FranchiseProfile/EditFranchiseProfile';
import FranchiseSearchPage from './pages/FranchiseProfile/FranchiseSearchPage';
import DisplayFranchiseProfile from './pages/FranchiseProfile/DisplayFranchiseProfile';

function App() {
  const isLoading = useSelector(state => state.config.isLoading)
  return (
    <div className='w-full'>
      {isLoading && <MHLoadingOverlay />}
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Landingpage />} />
            <Route path="business-for-sale">
              <Route path="/business-for-sale" element={<BusinessSearchPage />} />
              <Route path="businessProfile/:profileID" element={<DisplayBusinessProfile />} />
            </Route>
            <Route path="investors">
              <Route path="/investors" element={<InvestorSearchPage />} />
              <Route path="investorProfile/:profileID" element={<DisplayInvestorProfile />} />
            </Route>
            <Route path="franchises">
              <Route path="/franchises" element={<FranchiseSearchPage />} />
              <Route path="franchiseProfile/:profileID" element={<DisplayFranchiseProfile />} />
            </Route>
            {/* Protected Routes */}
            {/* User */}
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="create-business-profile" element={<BusinessProfile />} />
              <Route path="investor-profile/:userID" element={<CreateInvestorProfile />} />
              <Route path="create-franchise-profile" element={<CreateFranchiseProfile />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="preview-profile">
                <Route path="businessProfile/:profileID" element={<PreviewBusinessProfile />} />
                <Route path="investorProfile/:userID" element={<PreviewInvestorProfile />} />
                <Route path="franchiseProfile/:profileID" element={<PreviewFranchiseProfile />} />
              </Route>
              <Route path="edit-profile">
                <Route path="businessProfile/:profileID" element={<EditBusinessProfile />} />
                <Route path="investorProfile/:userID" element={<EditInvestorProfile />} />
                <Route path="franchiseProfile/:profileID" element={<EditFranchiseProfile />} />
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
