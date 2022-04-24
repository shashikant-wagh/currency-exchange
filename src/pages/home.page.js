import NavBar from "../components/nav-bar";
import HomeProvider from "../provider/home.provider";
import ExchangeForm from "../components/exchange-form";
import ExchangeReport from "../components/exchange-report";
import ExchangeDetails from "../components/exchange-details";

const HomePage = () => {
  return (
    <>
      <NavBar />

      <main>
        <div className="album py-5 bg-light">
          <div className="container">
            <div>
              {/* we are using HomeProvider as we consdiering whole page as a single form */}
              <HomeProvider>
                <ExchangeForm />

                <ExchangeDetails />
                <hr className="text-muted" />

                <div className="mt-5">
                  <p className="section-title">Exchange History</p>

                  <div className="mt-3">
                    <ExchangeReport />
                  </div>
                </div>
              </HomeProvider>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
