import React, {useEffect} from 'react'
import { plane, house, heart, star, asset1, asset2,  asset3, asset4, asset5 } from '../Utils/img';
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "Split expenses with friends. :: Splitwise";
  }, []);
  return (
  <div className="middle-content">

    {/* Animation section start */}
    <main className="container">
      
      <div className="bg-wall flex">

        {/* Left Context */}
        <div className="text-side flex flex-col">
          <h1>
            Less stress when sharing expenses
            <br />
            <span className="text-trips animate-text"></span>
          </h1>

          {/* Left-Icons */}
          <ul className="text-icon flex">

            {/* Left-Plane-Icon */}
            <li>
              <Link to="#">
                <svg className="icon trip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 35" width={50} height={50}>
                  <path d="M7.844 0L1.961 3.5l11.766 7 3.922 2.333L9.805 17.5 3.922 14 0 16.333l3.922 2.334 1.961 1.166L3.922 21l1.961 1.167V24.5l1.961-1.167v7L11.766 28v-7l7.844-4.667V35l3.922-2.333 1.96-1.167v-7l1.962-1.167V21l-1.961 1.167v-2.334l1.96-1.166v-2.334l-1.96 1.167v-4.667l5.883-3.5L35.298 7V4.667L33.337 3.5l-9.805 5.833L19.61 7l1.961-1.167-1.961-1.166-1.961 1.166-1.961-1.166 1.96-1.167-1.96-1.167L13.727 3.5z"></path>
                </svg>
                </Link>
            </li>

            {/* Left-House-Icon */}
            <li>
              <Link to="#">
                <svg className="icon housemates-icon" xmlns="http://www.w3.org/2000/svg" viewBox="1 0 36 37" width={52} height={52}>
                  <path d="M27.736 15.229V31.02H20.56V22.6h-7.177v8.423H6.207V15.228l7.176-4.211 3.588-2.106 10.765 6.317zm-.03-6.335l5.412 3.176v2.106H29.53l-12.559-7.37-12.558 7.37H.824V12.07l16.147-9.475 7.177 4.211V.49h3.557v8.405z"></path>
                </svg>
              </Link>
            </li>

            {/* Left-Heart-Icon */}
            <li>
              <Link to="#">
                <svg className="icon partner-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 26" width={47} height={47} >
                  <path d="M15.163 4.311L7.653-.043.143 4.311v15.237l15.02 8.707 15.02-8.707V4.311l-7.51-4.354z"></path>
                </svg>
              </Link>
            </li>

            {/* Left-Star-Icon */}
            <li>
              <Link to="#">
                <svg className="icon anyone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 27" width={45} height={45} >
                  <path d="M11.673.979v9.055L3.519 5.506.461 10.6l8.154 4.528-8.154 4.527L3.52 24.75l8.154-4.528v9.056h6.115V20.22l8.154 4.528L29 19.655l-8.154-4.527L29 10.6l-3.058-5.094-8.154 4.528V.979z"></path>
                </svg>
              </Link>
            </li>

          </ul>

          <div className="desc">
            <p className='desc-p'>Keep track of your shared expenses and balances  with housemates, trips, groups, friends, and family.</p>

            {/* Signup button between text */}
            <Link to="/signup" className="btn signUp signUp-btn animate-btn">Sign up</Link>
            <p className="app-download-redirect flex align-items-center">
              Free for &nbsp;
    
              {/* Apple Icon */}
              <a href="https://apps.apple.com/us/app/splitwise/id458023433" className='inline-flex align-items-center' target="_blank" rel="noreferrer">
                <svg  xmlns="http://www.w3.org/2000/svg" width="13" height="15">
                  <path d="M10.628 7.968c.03 2.268 2.064 3.033 2.064 3.062-.03.057-.324 1.077-1.091 2.126-.649.936-1.327 1.815-2.389 1.843-1.032 0-1.386-.595-2.566-.595-1.21 0-1.563.567-2.566.595-1.003.029-1.77-.992-2.448-1.9C.305 11.23-.728 7.827.659 5.53a3.877 3.877 0 0 1 3.215-1.871c1.032-.029 1.976.652 2.595.652.62 0 1.77-.794 2.979-.68.501 0 1.947.17 2.86 1.474-.058.056-1.71.964-1.68 2.864zM8.68 2.41c-.56.624-1.475 1.106-2.33 1.05-.118-.851.325-1.759.826-2.326C7.737.51 8.71.028 9.477 0c.118.879-.265 1.758-.796 2.41z"></path>
                </svg>
                <span>&nbsp;iPhone</span>
              </a>
              ,&nbsp;

              {/* Android Icon */}
              <a href="https://play.google.com/store/apps/details?id=com.Splitwise.SplitwiseMobile" className='inline-flex align-items-center' target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16">
                  <path d="M2.68 12a.67.67 0 0 0 .67.667h.671V15c0 .553.449 1 1.005 1 .556 0 1.005-.447 1.005-1v-2.333h1.34V15c0 .553.45 1 1.006 1s1.005-.447 1.005-1v-2.333h.67c.369 0 .67-.3.67-.667V5.334h-8.04V12zM1.006 5.334C.45 5.334 0 5.78 0 6.334V11a1 1 0 0 0 1.005 1 1 1 0 0 0 1.005-1V6.334c0-.553-.449-1-1.005-1zm11.393 0c-.556 0-1.005.447-1.005 1V11a1 1 0 0 0 1.005 1 1 1 0 0 0 1.005-1V6.334c0-.553-.449-1-1.005-1zM9.068 1.44l.874-.87a.33.33 0 0 0 0-.47.335.335 0 0 0-.473 0l-.991.983a4.012 4.012 0 0 0-3.562.003L3.92.097a.335.335 0 0 0-.472 0 .33.33 0 0 0 0 .47l.878.874A3.998 3.998 0 0 0 2.68 4.667h8.042a3.98 3.98 0 0 0-1.656-3.226zm-.691 1.892c.185 0 .335-.15.335-.333a.334.334 0 0 0-.335-.333.334.334 0 0 0-.335.333c0 .184.15.333.335.333zm-3.35 0c.184 0 .334-.15.334-.333a.334.334 0 0 0-.335-.333.334.334 0 0 0-.335.333c0 .184.15.333.335.333z"></path>
                </svg>
                <span>&nbsp;Android</span>
              </a>
              , and web.
            </p>
          </div>

        </div>

        {/* Right Context */}
        <div className="image-side flex justify-center align-items-center">

          {/* Right-Plane-Icon  */}
          <img src= { plane } className="image-icon trip-image right-plane" alt="" />

          {/* Right-House-Icon */}
          <img src= { house } className="image-icon housemates-image right-house" alt="" />

          {/* Right-Heart-Icon */}
          <img src= { heart } className="image-icon partner-image right-heart " alt="" />          

          {/* Right-Star-Icon */}
          <img src= { star } className="image-icon anyone-image right-star " alt="" />    

        </div>

      </div>

    </main>
    {/* Animation section end */}

    {/* Assets section start */}
    <div className="assets">

      {/* Asset 1 */}
      <div className="asset asset1 bg-wall">
      <h1>Track balances</h1>
      <p>Keep track of shared expenses, balances, and who owes who. </p>
      <img src= { asset1 } alt="" />
      </div>

      {/* Asset 2 */}
      <div className="asset asset2 bg-wall">
        <h1>Organise expenses</h1>
        <p>Split expenses with any group: trips, housemates, friends, and family. </p>
      <img src= { asset2 } alt="" />
      </div>

      {/* Asset 3 */}
      <div className="asset asset3 bg-wall">
        <h1>Add expenses easily</h1>
        <p>Quickly add expenses on the go before you forget who paid.  </p>
      <img src= { asset3 } alt="" />
      </div>

      {/* Asset 4 */}
      <div className="asset asset4 bg-wall">
        <h1>Pay friends back</h1>
        <p className='stretch'>Settle up with a friend and record any cash or online payment.  </p>
      <img src= { asset4 } alt="" />
      </div>

      {/* Asset 5 */}
      <div className="asset5 bg-wall flex justify-between align-items-center">
        <div className="asset-left flex flex-col align-items-center">
          <h1>Get even more with the PRO</h1>
          <p>Get even more organised with receipt scanning, charts and graphs, currency conversion, and more!</p>
          <Link to="/signup" className="btn signUp signUp-asset">Sign up</Link>
        </div>
        <div className="asset-right">
            <img src= { asset5 } alt="" />
        </div>
      </div>
    </div>
    {/* Assets section end */}

    {/* Feature section start */}
    <div className="nine-yards">
      <h1>The whole nine yards</h1>
      <ul>
        <div className="row">
          <div className="col-3">
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Add groups and friends</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Split expenses, record debts</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Equal or unequal splits</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Split by % or shares</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Calculate total balances</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Suggested repayments</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Simplify debts</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Recurring expenses</span>
              </div>
            </li>
          </div>

          <div className="col-3">
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Offline mode</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Cloud sync</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Spending totals</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Categorize expenses</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Easy CSV exports</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>7+ languages</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>100+ curencies</span>
              </div>
            </li>
            <li>
              <div>
                <i className="core-icon"></i>
                <span>Payment integrations</span>
              </div>
            </li>
          </div>

          <div className="col-3">
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>A totally ad-free experience</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Currency conversion</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Receipt Scanning</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Itemization</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Charts and graphs</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Expense search</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Save default splits</span>
              </div>
            </li>
            <li>
              <div>
                <i className="pro-icon"></i>
                <span>Early access to new features</span>
              </div>
            </li>
          </div>
        </div>

        
      </ul>
      <div className="features flex align-items-center justify-center">
        <i className="core-icon"></i>
        <span>Core features</span>
        <i className="pro-icon"></i>
        <span>Pro features</span>
      </div>
    </div>
    {/* Feature section end */}

    {/* Review section start */}
    <div className="reviews">
      {/* card 1 */}
      <a href="https://www.ft.com/content/8ccd6f0e-18bb-11e9-b93e-f4351a53f1c3" target="_blank" rel="noreferrer">
        <div className="card card-height">
          <p className="card-body">
          “Fundamental” for tracking finances. As good as WhatsApp for containing awkwardness.
          </p>
          <p className="card-title-lower-left">
            Financial Times
          </p>
        </div>
      </a>

      {/* card 2 */}
      <div className="card card-height">
        <p className="card-body">
        Life hack for group trips. Amazing tool to use when traveling with friends! Makes life so easy!!
        </p>
        <p className="card-title-lower-left">
          Ahah S, iOS
        </p>
      </div>

      {/* card 3 */}
      <a href="https://www.nytimes.com/2018/08/28/smarter-living/money-finance-apps-tools.html" target="_blank" rel="noreferrer">
        <div className="card card-height">
          <p className="card-body">
            Makes it easy to split everything from your dinner bill to rent.
          </p>
          <p className="card-title-lower-left">
            NY Times
          </p>
        </div>
      </a>

      {/* card 4 */}
      <div className="card card-height">
        <p className="card-body">
          So amazing to have this app manage balances and help keep money out of relationships. love it!
        </p>
        <p className="card-title-lower-left">
          Haseena C, Android
        </p>
      </div>

      {/* card 5 */}
      <a href="https://www.businessinsider.in/tech/i-never-fight-with-roommates-over-bills-because-of-this-genius-expense-splitting-app/articleshow/57619621.cms" target="_blank" rel="noreferrer">
        <div className="card card-height">
          <p className="card-body">
            I never fight with roommates over bills because of this genius expense-splitting app
          </p>
          <p className="card-title-lower-left">
            Business Insider
          </p>
        </div>
      </a>
      
      {/* card 6 */}
      <div className="card card-height">
        <p className="card-body">
          I use it everyday. I use it for trips, roommates, loans. I love splitwise.
        </p>
        <p className="card-title-lower-left">
          Trickseyus, iOS
        </p>
      </div>
    </div>
    {/* Review section end */}

  </div>
  )
}
