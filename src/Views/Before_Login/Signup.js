import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoOnly } from '../Utils/img';
import UserContext from '../../context/user/UserContext';

export default function Signup() {
  const navigate = useNavigate(); //Navigator
  
  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  // const [credentials, setCredentials] = useState({name: "", email: "", password: "", currency: "INR"});
  
  // Using functionalities from user context
  const {error, setError, signUpUser} = useContext(UserContext);

  // To hide and show currency field
  // const toggleCurrency = () => {
  //   const currency = document.getElementById('currency');
  //   currency.style.display = 'block';
  // };

  // To show form fields on keyup
  const toggleFormContent = () => {
   const email = document.getElementById('email');
   const password = document.getElementById('password');
  //  const dontUseUSD = document.getElementById('dontUseUSD');
   email.style.display = 'block';
   password.style.display = 'block';
  //  dontUseUSD.style.display = 'block';   
  };

  // To change field values
const onchange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value});
};

// Signup function to register user on form submit
  const handleSignup = async (e)=> {
    e.preventDefault();
 
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    };

    // Signup using Context API in user Context;
    const signUpStatus = await signUpUser(data);

    if(signUpStatus) {
      navigate('/dashboard');
    } else {
      toggleFormContent();
      // setCredentials({name: "", email: "", password: "", currency: "INR"});
      // setCredentials({name: "", email: "", password: ""});
    }
  
  };
  // Updating the title using useEffect() hook
  useEffect(() => {
    document.title = "Sign up :: Splitwise";
    setError([]);
  }, [setError]);

  return (
    <div className='signup-container flex justify-center'>
        <Link to='/'><img src={ logoOnly } className="signup-image" /></Link>
      <div className="sigup-content">
        <div className="signup-form justify-center">
          <h2>INTRODUCE YOURSELF</h2>
          {error.length < 1  || !error ?
            "" : 
            <div className="signup-error">
            The following errors occured:
            <ul>
              {/* {error} */}
              {error.map((err, i) => {
                return <li key = { i }>{err}</li>
              })}
            </ul>
          </div>
          }
          <form onSubmit={handleSignup}>
              <div id='name'>
                <label htmlFor="name" className="signup-label-form">Hi there! My name is</label>
                <br />
                <input type="text" className="signup-form-control signup-name" name="name" id="name-field" onKeyUp={ toggleFormContent } value={credentials.name} onChange={onchange} />
              </div>
              <div id='email'>
                <label htmlFor="email" className="signup-label-form">Here's my <strong>email address: </strong></label>
                <br />
                <input type="text" className="signup-form-control" name="email" id="email-field" value={credentials.email} onChange={onchange} />
              </div>
              <div id='password'>
                <label htmlFor="password" className="signup-label-form">And here's my <strong>password:</strong></label>
                <br />
                <input type="password" className="signup-form-control" name="password" id="password-field" value={credentials.password} onChange={onchange} />
              </div>
              {/* Currency field */}
              {/* <div id='currency'>
                <label htmlFor="currency" className="signup-label-form">And here's the <strong>currency</strong> that I use:</label>
                <br />
                <select name="currency" id="" value={credentials.currency} className="signup-form-select"  onChange={onchange}>
                  <option value="AFN">AFN (Afs)</option>
                  <option value="AED">AED (DH)</option>
                  <option value="ALL">ALL (L)</option>
                  <option value="AMD">AMD (AMD)</option>
                  <option value="ANG">ANG (NAf)</option>
                  <option value="AOA">AOA (Kz)</option>
                  <option value="ARS">ARS ($)</option>
                  <option value="AUD">AUD ($)</option>
                  <option value="AWG">AWG (Afl.)</option>
                  <option value="AZN">AZN (m.)</option>
                  <option value="BAM">BAM (KM)</option>
                  <option value="BBD">BBD ($)</option>
                  <option value="BDT">BDT (Tk)</option>
                  <option value="BGN">BGN (BGN)</option>
                  <option value="BHD">BHD (BD)</option>
                  <option value="BIF">BIF (FBu)</option>
                  <option value="BND">BND (B$)</option>
                  <option value="BOB">BOB (Bs.)</option>
                  <option value="BRL">BRL (R$)</option>
                  <option value="BTC">BTC (฿)</option>
                  <option value="BTN">BTN (Nu.)</option>
                  <option value="BWP">BWP (P)</option>
                  <option value="BYN">BYN (Br)</option>
                  <option value="BYR">BYR (BYR)</option>
                  <option value="BZD">BZD (BZ$)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                  <option value="CHF">CHF (Fr.)</option>
                  <option value="CLP">CLP ($)</option>
                  <option value="CMG">CMG (CMg)</option>
                  <option value="CNY">CNY (¥)</option>
                  <option value="COP">COP ($)</option>
                  <option value="CRC">CRC (₡)</option>
                  <option value="CUC">CUC (CUC$)</option>
                  <option value="CUP">CUP ($)</option>
                  <option value="CVE">CVE ($)</option>
                  <option value="CZK">CZK (Kč)</option>
                  <option value="DJF">DJF (Fdj )</option>
                  <option value="DKK">DKK (kr)</option>
                  <option value="DOP">DOP ($)</option>
                  <option value="DZD">DZD (DA)</option>
                  <option value="EGP">EGP (E£)</option>
                  <option value="ETB">ETB (Br)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="FJD">FJD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="GEL">GEL (GEL)</option>
                  <option value="GHS">GHS (GH₵)</option>
                  <option value="GMD">GMD (D)</option>
                  <option value="GTQ">GTQ (Q)</option>
                  <option value="GYD">GYD (G$)</option>
                  <option value="HKD">HKD ($)</option>
                  <option value="HNL">HNL (L)</option>
                  <option value="HRK">HRK (HRK)</option>
                  <option value="HTG">HTG (G)</option>
                  <option value="HUF">HUF (Ft)</option>
                  <option value="IDR">IDR (Rp )</option>
                  <option value="ILS">ILS (₪)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="IQD">IQD (IQD)</option>
                  <option value="IRR">IRR (IRR)</option>
                  <option value="ISK">ISK (kr)</option>
                  <option value="JMD">JMD (J$)</option>
                  <option value="JOD">JOD (JOD)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="KES">KES (KSh)</option>
                  <option value="KGS">KGS (KGS)</option>
                  <option value="KHR">KHR (៛)</option>
                  <option value="KMF">KMF (CF)</option>
                  <option value="KRW">KRW (₩)</option>
                  <option value="KWD">KWD (KWD)</option>
                  <option value="KYD">KYD (CI$)</option>
                  <option value="KZT">KZT (₸)</option>
                  <option value="LAK">LAK (₭)</option>
                  <option value="LBP">LBP (ل.ل)</option>
                  <option value="LKR">LKR (Rs. )</option>
                  <option value="LTL">LTL (Lt )</option>
                  <option value="LYD">LYD (LD)</option>
                  <option value="MAD">MAD (MAD)</option>
                  <option value="MDL">MDL (MDL)</option>
                  <option value="MGA">MGA (Ar)</option>
                  <option value="MKD">MKD (ден)</option>
                  <option value="MMK">MMK (K)</option>
                  <option value="MNT">MNT (₮)</option>
                  <option value="MOP">MOP (MOP$)</option>
                  <option value="MUR">MUR (₨)</option>
                  <option value="MVR">MVR (MVR)</option>
                  <option value="MWK">MWK (K)</option>
                  <option value="MXN">MXN ($)</option>
                  <option value="MYR">MYR (RM)</option>
                  <option value="MZN">MZN (MT)</option>
                  <option value="NAD">NAD ($)</option>
                  <option value="NGN">NGN (₦)</option>
                  <option value="NIO">NIO (C$)</option>
                  <option value="NOK">NOK (kr)</option>
                  <option value="NPR">NPR (Rs. )</option>
                  <option value="NZD">NZD ($)</option>
                  <option value="OMR">OMR (OMR)</option>
                  <option value="PAB">PAB (B/. )</option>
                  <option value="PEN">PEN (S/. )</option>
                  <option value="PGK">PGK (K)</option>
                  <option value="PHP">PHP (₱)</option>
                  <option value="PKR">PKR (Rs)</option>
                  <option value="PLN">PLN (PLN)</option>
                  <option value="PYG">PYG (₲)</option>
                  <option value="QAR">QAR (QR)</option>
                  <option value="RON">RON (RON)</option>
                  <option value="RSD">RSD (RSD)</option>
                  <option value="RUB">RUB (₽)</option>
                  <option value="RWF">RWF (FRw)</option>
                  <option value="SAR">SAR (SR)</option>
                  <option value="SBD">SBD (SI$)</option>
                  <option value="SCR">SCR (SR)</option>
                  <option value="SDG">SDG (SDG)</option>
                  <option value="SEK">SEK (kr)</option>
                  <option value="SGD">SGD ($)</option>
                  <option value="SLL">SLL (Le)</option>
                  <option value="SRD">SRD ($)</option>
                  <option value="STD">STD (Db)</option>
                  <option value="STN">STN (nDb)</option>
                  <option value="SYP">SYP (£S)</option>
                  <option value="SZL">SZL (E)</option>
                  <option value="THB">THB (฿)</option>
                  <option value="TJS">TJS (TJS)</option>
                  <option value="TMT">TMT (T)</option>
                  <option value="TND">TND (DT)</option>
                  <option value="TOP">TOP (T$)</option>
                  <option value="TRY">TRY (TL)</option>
                  <option value="TTD">TTD (TT$)</option>
                  <option value="TWD">TWD (NT$)</option>
                  <option value="TZS">TZS (TZS)</option>
                  <option value="UAH">UAH (₴)</option>
                  <option value="UGX">UGX (USh)</option>
                  <option  value="USD">USD ($)</option>
                  <option value="UYU">UYU ($)</option>
                  <option value="UZS">UZS (UZS)</option>
                  <option value="VEF">VEF (Bs)</option>
                  <option value="VND">VND (₫)</option>
                  <option value="VUV">VUV (Vt)</option>
                  <option value="WST">WST (WS$)</option>
                  <option value="XAF">XAF (CFA)</option>
                  <option value="XCD">XCD (EC$)</option>
                  <option value="XOF">XOF (CFA)</option>
                  <option value="XPF">XPF (F)</option>
                  <option value="YER">YER (YER)</option>
                  <option value="ZAR">ZAR (R)</option>
                  <option value="ZMW">ZMW (ZMW)</option>
                  <option value="ZWL">ZWL (Z$)</option>
                </select>
              </div> */}
                <button type='submit' className="btn signup-btn" >Sign me up!</button>
            </form>
            <div className="terms">
              <a href="#"> <p> By signing up, you accept the Splitwise Terms of Service. </p></a>
              {/* <p id="dontUseUSD" className='dontUseUSD'>Don't use INR for currency? <a href="#" id="toggleCurrencyBtn" onClick={ toggleCurrency }> Click here. </a></p> */}
            </div>
        </div>
      </div>
    </div>
  ) 
}
