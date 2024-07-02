import { useEffect, useState } from "react";

function ThirdPartyCookieConsent() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    checkConsent();
  }, []);

  const checkConsent = () => {
    const consent = localStorage.getItem("third-party-cookie-consent");
    if (!consent) return;
    setIsVisible(false);
  };

  const handleConsent = () => {
    localStorage.setItem("third-party-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-container">
      <div className="cookie-consent-message">
        <p>
          Our website utilizes third-party cookies to facilitate the login and
          signup processes. To ensure these features function correctly, please
          enable third-party cookies in your browser settings. If you encounter
          issues with logging in or signing up, allowing third-party cookies for
          this site may resolve the problem.
        </p>
        <button onClick={handleConsent} className="consent-button">
          I Understand
        </button>
      </div>
    </div>
  );
}

export default ThirdPartyCookieConsent;
