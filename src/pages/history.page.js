import NavBar from "../components/nav-bar";
import ConversionHistory from "../components/conversion-history";

const HistoryPage = () => (
  <>
    <NavBar />

    <main>
      <div className="album py-5 bg-light">
        <div className="container">
          <h1> Conversion History </h1>
          <div className="row gx-3 gy-2 mt-3">
            <div className="card col-12">
              <ConversionHistory />
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

export default HistoryPage;
