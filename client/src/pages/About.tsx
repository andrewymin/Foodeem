import { useLayoutEffect } from "react";

function About() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="about">
      <div className="content">
        <h1>About Us</h1>
        <h2 className="title">Finding Great Recipes</h2>
        <p>
          Welcome to Foodiem! We are passionate about bringing the joy of
          cooking to your kitchen with an extensive collection of delicious
          recipes. Whether you're cooking for yourself or hosting a dinner
          party, our recipes will help you create dishes that everyone will
          love. Join us in celebrating the art of cooking, and discover new
          flavors and techniques to elevate your culinary skills. Happy cooking!
        </p>
      </div>
    </section>
  );
}

export default About;
