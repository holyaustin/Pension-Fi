
import { Navbar, Welcome, Footer, Services, Invest, AboutCom } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-r from-blue-800 to-black">
      <Navbar />
      <Welcome />
    </div>
    <AboutCom />
    <Invest />
    <Services />
    <Footer />
  </div>
);

export default App;
