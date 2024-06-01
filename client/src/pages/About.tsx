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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus,
          possimus accusantium commodi assumenda recusandae unde veniam
          consectetur praesentium! Aperiam rerum consequuntur, quidem harum
          adipisci nostrum eaque totam aspernatur. Ducimus, earum?
        </p>
      </div>
    </section>
  );
}

export default About;
